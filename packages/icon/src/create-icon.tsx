import { css } from '@emotion/css';
import type { ForegroundTone } from '@spark-web/text';
import { useForegroundTone } from '@spark-web/text';
import type { BrighteTheme } from '@spark-web/theme';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import { buildDataAttributes } from '@spark-web/utils/internal';
import type { ReactNode } from 'react';
import { forwardRef, useMemo } from 'react';

type SizeType = Exclude<keyof BrighteTheme['sizing'], 'full' | 'none'>;

export type IconProps = {
  /** Sets data attributes for the element. */
  data?: DataAttributeMap;
  /** The size of the icon. */
  size?: SizeType;
  /** The tone of the icon. */
  tone?: ForegroundTone;
};

export const createIcon = (children: ReactNode, name: string) => {
  const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({ data, size: sizeKey = 'small', tone = 'neutral' }, forwardedRef) => {
      const theme = useTheme();
      const stroke = useForegroundTone(tone);
      const size = theme.sizing[sizeKey];
      const styles = useMemo(
        () =>
          theme.utils.resolveResponsiveProps({
            fill: 'none',
            height: size,
            stroke,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2,
            verticalAlign: 'text-bottom', // removes whitespace inside buttons
            width: size,
          }),
        [size, stroke, theme.utils]
      );

      return (
        <svg
          {...(data ? buildDataAttributes(data) : undefined)}
          ref={forwardedRef}
          aria-hidden="true"
          focusable="false"
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={css(styles)}
        >
          {children}
        </svg>
      );
    }
  );

  Icon.displayName = name;

  return Icon;
};
