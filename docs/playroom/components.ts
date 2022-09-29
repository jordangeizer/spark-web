export * from '../cache/spark-components';

export function Render({ children }: { children: () => JSX.Element }) {
  return children();
}
