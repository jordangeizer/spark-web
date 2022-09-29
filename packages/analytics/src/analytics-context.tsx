import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

import type { AnalyticsEventData } from './analytics-listener-context';

export const AnalyticsContextContext = createContext<AnalyticsEventData>({});

export type AnalyticsContextProps = {
  children: ReactNode;
  data: AnalyticsEventData;
};

export function AnalyticsContext({ data, children }: AnalyticsContextProps) {
  const parentContext = useContext(AnalyticsContextContext) || {};
  const childContext = { ...parentContext, ...data };

  return (
    <AnalyticsContextContext.Provider value={childContext}>
      {children}
    </AnalyticsContextContext.Provider>
  );
}
