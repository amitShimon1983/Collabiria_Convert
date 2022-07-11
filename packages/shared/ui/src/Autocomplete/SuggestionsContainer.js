import React, { forwardRef } from 'react';
import { FocusZone, Callout, DirectionalHint } from 'office-ui-fabric-react';

const SuggestionsContainer = forwardRef(({ hidden, onDismiss, children, width }, ref) => {
  return (
    <FocusZone disabled={true}>
      <Callout
        id="SuggestionContainer"
        ariaLabelledBy={'callout-suggestions'}
        gapSpace={2}
        coverTarget={false}
        preventDismissOnScroll={true}
        preventDismissOnResize={true}
        alignTargetEdge={true}
        directionalHint={DirectionalHint.bottomLeftEdge}
        onDismiss={onDismiss}
        hidden={hidden}
        calloutMaxHeight={320}
        calloutWidth={width}
        target={ref.current}
        shouldUpdateWhenHidden={false}
        isBeakVisible={false}
      >
        {children}
      </Callout>
    </FocusZone>
  );
});

export default SuggestionsContainer;
