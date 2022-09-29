export * from '../components/example-helpers';
export * from '@spark-web/design-system';

export function Render({ children }: { children: () => JSX.Element }) {
  return children();
}
