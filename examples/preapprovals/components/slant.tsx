import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import type { ReactNode } from 'react';

export const Slant = ({ children }: { children: ReactNode }) => (
  <Box position="relative">
    <Box
      position="absolute"
      background="secondaryLow"
      className={css({
        inset: 0,
        clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
      })}
    />
    <Box
      position="absolute"
      background="secondary"
      className={css({
        inset: 0,
        clipPath: 'polygon(0 30%, 100% 0, 100% 70%, 0 100%)',
      })}
      marginY="large"
    />
    <Box position="relative">{children}</Box>
  </Box>
);
