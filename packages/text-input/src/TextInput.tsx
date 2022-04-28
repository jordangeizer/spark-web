import { css } from '@emotion/css';
import { useFocusRing } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import type { FieldContextType } from '@spark-web/field';
import { useFieldContext } from '@spark-web/field';
import { useText } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import { buildDataAttributes } from '@spark-web/utils/internal';
import type { AllHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import type { AdornmentsAsChildren } from './childrenToAdornments';
import { childrenToAdornments } from './childrenToAdornments';

type validTypes =
  | 'text'
  | 'password'
  | 'email'
  | 'search'
  | 'number'
  | 'tel'
  | 'url';
type validModes =
  | 'none'
  | 'text'
  | 'tel'
  | 'url'
  | 'email'
  | 'numeric'
  | 'decimal'
  | 'search';

type NativeInputProps = Pick<
  AllHTMLAttributes<HTMLInputElement>,
  'onBlur' | 'onFocus' | 'onChange' | 'placeholder' | 'value'
>;

export type TextInputProps = {
  /** Map of data attributes. */
  data?: DataAttributeMap;
  /**
   * How an input behaves varies considerably depending on the value of its type
   * attribute. If this attribute is not specified, the default type "text".
   */
  type?: validTypes;
  mode?: validModes;
  /**
   * Adorn the input with ornamental element(s) to aid user input, or
   * interactive element(s) to augment user input. Each child **must** be
   * wrapped with the `InputAdornment` component to ensure proper layout,
   * otherwise it will not be rendered.
   */
  children?: AdornmentsAsChildren;
} & NativeInputProps;

/** Organize and emphasize information quickly and effectively in a list of text elements. */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ children, data, ...consumerProps }, forwardedRef) => {
    const { disabled, invalid, ...a11yProps } = useFieldContext();
    const theme = useTheme();
    const focusRingStyles = useFocusRing({ always: true });
    const textStyles = useText({
      baseline: false,
      tone: disabled ? 'disabled' : 'neutral',
      size: 'standard',
      weight: 'regular',
    });

    const [typographyStyles, responsiveStyles] = textStyles;
    const { startAdornment, endAdornment } = childrenToAdornments(children);
    const hasAdornments = Boolean(children);

    return hasAdornments ? (
      <Box
        className={css({
          ':focus-within': {
            ...focusRingStyles,
            borderColor: theme.border.color.fieldAccent,
          },
        })}
        background={disabled ? 'inputDisabled' : 'input'}
        border={invalid ? 'critical' : 'field'}
        borderRadius="small"
        height="medium"
        alignItems="center"
        flexDirection="row"
        display="inline-flex"
        marginY="none"
      >
        {startAdornment}
        <Box
          as="input"
          disabled={disabled}
          ref={forwardedRef}
          width="full"
          className={css({
            ...typographyStyles,
            ...responsiveStyles,
            ':focus': {
              outline: 'none',
            },
            ':enabled': {
              '&:hover': {
                borderColor: theme.border.color.fieldHover,
              },
            },
          })}
          height="small"
          {...(data ? buildDataAttributes(data) : null)}
          {...a11yProps}
          {...consumerProps}
        />
        {endAdornment}
      </Box>
    ) : (
      <Box
        as="input"
        disabled={disabled}
        ref={forwardedRef}
        background={disabled ? 'inputDisabled' : 'input'}
        border={invalid ? 'critical' : 'field'}
        borderRadius="small"
        height="medium"
        paddingX="medium"
        className={css({
          ...typographyStyles,
          ...responsiveStyles,
          ':enabled': {
            '&:hover': {
              borderColor: theme.border.color.fieldHover,
            },
            '&:focus': {
              ...focusRingStyles,
              borderColor: theme.border.color.fieldAccent,
            },
          },
        })}
        {...(data ? buildDataAttributes(data) : null)}
        {...a11yProps}
        {...consumerProps}
      />
    );
  }
);
TextInput.displayName = 'TextInput';

// Styled components
// ------------------------------

export type UseInputProps = Pick<FieldContextType, 'disabled' | 'invalid'>;

export function useInput({ disabled }: UseInputProps) {
  const theme = useTheme();
  const focusRingStyles = useFocusRing({ always: true });
  const textStyles = useText({
    baseline: false,
    tone: disabled ? 'disabled' : 'neutral',
    size: 'standard',
    weight: 'regular',
  });

  const [typographyStyles, responsiveStyles] = textStyles;

  return {
    ...typographyStyles,
    ...responsiveStyles,
    ':enabled': {
      '&:hover': {
        borderColor: theme.border.color.fieldHover,
      },
      '&:focus': {
        ...focusRingStyles,
        borderColor: theme.border.color.fieldAccent,
      },
    },
  };
}
