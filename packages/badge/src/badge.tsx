import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import type { TextProps } from '@spark-web/text';
import { Text } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import type { ReactNode } from 'react';

////////////////////////////////////////////////////////////////////////////////

/**
 * Badge
 *
 * A decorative indicator used to either call attention to an item or for
 * communicating non-actionable, supplemental information.
 */
export function Badge({ children, data, tone = 'neutral' }: BadgeProps) {
  const textSize = 'xsmall';

  return (
    <Box
      data={data}
      // Styles
      display="inline-flex"
      alignItems="center"
      background="surface"
      border="standard"
      borderRadius="full"
      gap="xsmall"
      height="xsmall"
      paddingX="small"
    >
      <IndicatorContainer size={textSize}>
        <IndicatorDot tone={tone} />
      </IndicatorContainer>
      <Text overflowStrategy="nowrap" size={textSize}>
        {children}
      </Text>
    </Box>
  );
}

export type BadgeProps = {
  /** The label of the badge. */
  children: string | number;
  /** Sets data attributes on the component. */
  data?: DataAttributeMap;
  /** The tone of the badge. */
  tone?: BadgeTones;
};

////////////////////////////////////////////////////////////////////////////////

/**
 * IndicatorDot
 *
 * A small decorative indicator used to call attention to an item.
 */
export function IndicatorDot({ data, label, tone }: IndicatorDotProps) {
  const theme = useTheme();
  const dotSize = 8;

  return (
    <Box
      {...(label ? { 'aria-label': label } : { 'aria-hidden': 'true' })}
      data={data}
      borderRadius="full"
      className={css({
        height: dotSize,
        width: dotSize,
        background: theme.color.status[tone],
      })}
    />
  );
}

export type IndicatorDotProps = {
  /** Sets data attributes on the component. */
  data?: DataAttributeMap;
  /** When the intent isn't provided by text, you must supply an "aria-label" for assistive tech users. */
  label?: string;
  /** The tone of the indicator dot. */
  tone: BadgeTones;
};

////////////////////////////////////////////////////////////////////////////////

/**
 * IndicatorContainer
 *
 * Component that renders a div the same height as our text so that we can
 * perfectly align the content side-by-side.
 */
function IndicatorContainer({
  children,
  size = 'standard',
}: IndicatorContainerProps) {
  const theme = useTheme();
  const { mobile, tablet } = theme.typography.text[size];
  const responsiveHeight = theme.utils.responsiveStyles({
    mobile: { height: mobile.capHeight },
    tablet: { height: tablet.capHeight },
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      aria-hidden="true"
      cursor="default"
      flexShrink={0}
      className={css(responsiveHeight)}
    >
      {children}
    </Box>
  );
}

type IndicatorContainerProps = {
  /** Children elements to be rendered within the component. */
  children: ReactNode;
  /** Correlates to the size prop of our text component */
  size: TextProps['size'];
};

////////////////////////////////////////////////////////////////////////////////

/**
 * Shared Types
 */

/** The tone of the badge. */
type BadgeTones =
  | 'accent'
  | 'caution'
  | 'critical'
  | 'info'
  | 'neutral'
  | 'positive';
