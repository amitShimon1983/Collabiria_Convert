import React, { useCallback, useState } from 'react';
import { List, AutoSizer, InfiniteLoader, Index, ScrollParams, ListRowProps } from 'react-virtualized';
import { CellMeasurerCache } from 'react-virtualized/dist/es/CellMeasurer';

export interface CustomRowRendererProps extends ListRowProps {
  item: any;
  rowHeight: any;
}

export interface GetMoreRowsResult {
  loading: boolean;
  error: Error | undefined;
  data: { records: any[]; hasNextPage: boolean; total: number };
}

export interface VirtualListProps {
  getMoreRows: (startIndex: number, pageSize: number) => Promise<GetMoreRowsResult>;
  minimumBatchSize?: number | undefined;
  threshold?: number | undefined;
  rowHeight: number | ((params: Index) => number);
  pageSize?: number;
  CustomRowRenderer: (props: CustomRowRendererProps) => JSX.Element;
  deferredMeasurementCache?: CellMeasurerCache | undefined;
  overscanRowCount?: number | undefined;
  onScroll?: ((params: ScrollParams) => any) | undefined;
  style?: React.CSSProperties | undefined;
  scrollToIndex?: number | undefined;
}

const SimpleVirtualList = ({
  rowHeight,
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
}: VirtualListProps) => {
  const [rowData, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number | undefined>();
  const [hasPage, setHasPage] = useState<boolean>(true);

  const loadMoreRows = useCallback(
    async ({ startIndex }) => {
      if (!loading) {
        setLoading(true);
        const { data } = await getMoreRows(startIndex, pageSize);
        if (data) {
          const { records, hasNextPage, total } = data;
          setData([...rowData, ...records]);
          setHasPage(hasNextPage);
          setTotal(total);
        } else {
          setTotal(0);
        }
        setLoading(false);
      }
      return true;
    },
    [loading]
  );

  const isRowLoaded = ({ index }: Index) => {
    return rowData.length ? rowData.length > index : false;
  };

  const rowCount = rowData.length ? (hasPage ? rowData.length + pageSize : rowData.length) : pageSize;

  if (total === 0) {
    return <div>no records</div>;
  }

  return (
    <InfiniteLoader
      minimumBatchSize={minimumBatchSize}
      threshold={threshold}
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
    >
      {({ onRowsRendered }) => (
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              onRowsRendered={onRowsRendered}
              rowHeight={rowHeight}
              rowRenderer={({ index, ...rest }: ListRowProps) => (
                <CustomRowRenderer {...rest} index={index} item={rowData[index]} rowHeight={rowHeight} />
              )}
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

export default SimpleVirtualList;
