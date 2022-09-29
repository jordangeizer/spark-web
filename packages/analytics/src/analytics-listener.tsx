import type { ReactNode } from 'react';
import { useContext } from 'react';

import type {
  AnalyticsEventData,
  AnalyticsEventHandler,
  AnalyticsEventName,
} from './analytics-listener-context';
import { AnalyticsListenerContext } from './analytics-listener-context';

export type AnalyticsListenerProps = {
  children: ReactNode;
  /** Callback that will be invoked with fired analytics events. */
  onEvent: AnalyticsEventHandler;
};

export function AnalyticsListener({
  children,
  onEvent,
}: AnalyticsListenerProps) {
  const parentContext = useContext<AnalyticsEventHandler>(
    AnalyticsListenerContext
  );
  const handleEvent = (
    eventName: AnalyticsEventName,
    eventData: AnalyticsEventData
  ): void => {
    onEvent(eventName, eventData);

    // Bubble up the event to another listener up in the tree
    if (parentContext) parentContext(eventName, eventData);
  };

  return (
    <AnalyticsListenerContext.Provider value={handleEvent}>
      {children}
    </AnalyticsListenerContext.Provider>
  );
}
