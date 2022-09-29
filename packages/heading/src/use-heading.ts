import type { ForegroundTone } from '@spark-web/text';
import { createTextStyles, useForegroundTone } from '@spark-web/text';
import type { BrighteTheme } from '@spark-web/theme';
import { useTheme } from '@spark-web/theme';

type HeadingLevel = keyof BrighteTheme['typography']['heading']['level'];

export type UseHeadingProps = {
  /** The horizontal alignment. */
  align?: 'left' | 'center' | 'right';
  /** The heading level. */
  level: HeadingLevel;
  /** The tone of the text. */
  tone?: ForegroundTone;
};

export function useHeading({
  align,
  level,
  tone = 'neutral',
}: UseHeadingProps) {
  const theme = useTheme();
  const color = useForegroundTone(tone);
  const { mobile, tablet } = theme.typography.heading.level[level];
  const responsiveStyles = theme.utils.responsiveStyles({
    mobile: createTextStyles(mobile),
    tablet: createTextStyles(tablet),
  });

  return [
    {
      color,
      fontFamily: theme.typography.fontFamily.display.name,
      fontWeight: theme.typography.fontWeight.semibold,
      textAlign: align,
    },
    responsiveStyles,
  ];
}
