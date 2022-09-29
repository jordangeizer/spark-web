import { css } from '@emotion/css';
import { useTheme } from '@spark-web/theme';
import type { ReactNode } from 'react';

export type StrongProps = {
  children: ReactNode;
};

export const Strong = ({ children }: StrongProps) => {
  const theme = useTheme();
  const styles = { fontWeight: theme.typography.fontWeight.semibold };
  return <strong className={css(styles)}>{children}</strong>;
};
