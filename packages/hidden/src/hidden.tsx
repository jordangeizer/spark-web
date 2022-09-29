import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { useHeadingContext } from '@spark-web/heading';
import { useTextContext } from '@spark-web/text';
import type { ResponsiveRangeProps } from '@spark-web/theme';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import { buildDataAttributes } from '@spark-web/utils/internal';
import { forwardRefWithAs } from '@spark-web/utils/ts';
import type { ReactNode } from 'react';

export type HiddenProps = {
  /** Children elements to be conditionally rendered. */
  children: ReactNode;
  /** Sets data attributes for the element. */
  data?: DataAttributeMap;
  /** Sets whether element should be rendered in-line or on a new line. */
  inline?: boolean;
  /**
   * Sets on what type of device element should be hidden.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_types
   */
  on?: 'screen' | 'print';
} & ResponsiveRangeProps;

/** Conditionally display content for different screen sizes. */
export const Hidden = forwardRefWithAs<'div', HiddenProps>(
  ({ above, as, below, children, data, inline: inlineProp, on }, ref) => {
    const theme = useTheme();
    const [hiddenOnMobile, hiddenOnTablet, hiddenOnDesktop, hiddenOnWide] =
      theme.utils.responsiveRange({ above, below });

    const hiddenOnScreen = on === 'screen';
    const conditionalStyles = on
      ? { [`@media ${on}`]: { display: 'none !important' } }
      : null;

    const inText = Boolean(useTextContext());
    const inHeading = Boolean(useHeadingContext());
    const inline = inlineProp ?? (inText || inHeading);
    const display = inline ? 'inline' : 'block';

    return (
      <Box
        as={as || (inline ? 'span' : 'div')}
        ref={ref}
        className={css([
          hiddenOnScreen
            ? null
            : theme.utils.resolveResponsiveProps({
                display: theme.utils.optimizeResponsiveArray([
                  hiddenOnMobile ? 'none' : display,
                  hiddenOnTablet ? 'none' : display,
                  hiddenOnDesktop ? 'none' : display,
                  hiddenOnWide ? 'none' : display,
                ]),
              }),
          conditionalStyles,
        ])}
        {...(data ? buildDataAttributes(data) : undefined)}
      >
        {children}
      </Box>
    );
  }
);
