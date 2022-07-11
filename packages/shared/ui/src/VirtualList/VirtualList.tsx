import { Spinner } from 'office-ui-fabric-react';
import React, { useCallback, useEffect, useState } from 'react';
import { List, AutoSizer, InfiniteLoader, Index, IndexRange, ScrollParams, ListRowProps } from 'react-virtualized';
import { CellMeasurerCacheInterface } from 'react-virtualized/dist/es/CellMeasurer';

export interface CustomRowRendererProps extends ListRowProps {
  item: any;
}

export interface VirtualListProps {
  getMoreRows: (params: IndexRange) => Promise<{ records: any[]; hasMorePage: boolean }>;
  minimumBatchSize?: number | undefined;
  threshold?: number | undefined;
  rowHeight: number | ((params: Index) => number);
  pageSize?: number;
  CustomRowRenderer: (props: CustomRowRendererProps) => JSX.Element;
  deferredMeasurementCache?: CellMeasurerCacheInterface | undefined;
  overscanRowCount?: number | undefined;
  onScroll?: ((params: ScrollParams) => any) | undefined;
  style?: React.CSSProperties | undefined;
  scrollToIndex?: number | undefined;
  calculateRowHeight?: any;
  initilaizedData?: any;
  initilizeHasPage?: boolean;
}

const VirtualList = ({
  rowHeight,
  initilaizedData,
  CustomRowRenderer,
  deferredMeasurementCache,
  overscanRowCount,
  onScroll,
  style,
  scrollToIndex,
  minimumBatchSize,
  threshold,
  getMoreRows,
  pageSize = 50,
  initilizeHasPage,
  calculateRowHeight,
}: VirtualListProps) => {
  const [data, setData] = useState<any[]>([]);
  const [hasPage, setHasPage] = useState<boolean>(true);

  useEffect(() => {
    if (initilaizedData) {
      setData(initilaizedData);
    }
    setHasPage(initilizeHasPage || false);
  }, [initilaizedData]);

  const [loading, setLoading] = useState<boolean>(false);

  const loadMore = async ({ startIndex, stopIndex }) => {
    if (!loading) {
      setLoading(true);
      const { records, hasMorePage } = await getMoreRows({ startIndex, stopIndex });
      setData([...data, ...records]);
      setLoading(false);
      setHasPage(hasMorePage);
    }
  };

  const isRowLoaded = ({ index }: Index) => {
    return typeof index === 'number' && index < data.length;
  };

  const rowCount = hasPage ? data.length + 1 : data.length;
  return (
    <InfiniteLoader
      minimumBatchSize={minimumBatchSize}
      threshold={threshold}
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMore}
      rowCount={rowCount}
    >
      {({ onRowsRendered }) => (
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={calculateRowHeight || height}
              onRowsRendered={onRowsRendered}
              rowHeight={rowHeight}
              rowRenderer={({ index, ...rest }: ListRowProps) => {
                return isRowLoaded({ index }) ? (
                  <CustomRowRenderer {...rest} index={index} item={data[index]} key={index + 'VirtualList'} />
                ) : (
                  <Spinner key={index + 'VirtualList'} label="loading..." />
                );
              }}
              deferredMeasurementCache={deferredMeasurementCache}
              rowCount={rowCount}
              overscanRowCount={overscanRowCount}
              scrollToAlignment="start"
              onScroll={onScroll}
              tabIndex={-1}
              style={style}
              scrollToIndex={scrollToIndex}
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
};

export default VirtualList;
