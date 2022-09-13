import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import type { BrighteTheme } from '@spark-web/theme';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import { buildDataAttributes } from '@spark-web/utils/internal';
import { forwardRefWithAs } from '@spark-web/utils/ts';
import type { ReactNode } from 'react';

export type ContainerProps = {
  children: ReactNode;
  data?: DataAttributeMap;
  size?: keyof BrighteTheme['contentWidth'];
};

/** Provides a container that centers and constrains the maximum width of the content it wraps. */
export const Container = forwardRefWithAs<'div', ContainerProps>(
  ({ children, data, size = 'medium' }, ref) => {
    const { contentWidth } = useTheme();
    const maxWidth = contentWidth[size];

    return (
      <Box
        ref={ref}
        width="full"
        className={css({
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth,
        })}
        {...(data ? buildDataAttributes(data) : undefined)}
      >
        {children}
      </Box>
    );
  }
);
