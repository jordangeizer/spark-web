import { SparkProvider } from '@spark-web/design-system';
import type { ReactNode } from 'react';

export default function FrameComponent({ children }: { children: ReactNode }) {
  return <SparkProvider>{children}</SparkProvider>;
}
