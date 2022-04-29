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
  /**
   * Mode sets the appropriate virutal keyboard on the browser for the input field.
   */
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
    const { startAdornment, endAdornment } = childrenToAdornments(children);

    return (
      <Box
        background={disabled ? 'inputDisabled' : 'input'}
        border={invalid ? 'critical' : 'field'}
        borderRadius="small"
        display="inline-flex"
        alignItems="center"
        flexDirection="row"
        height="medium"
        marginY="none"
        className={css(useInputWrapper())}
      >
        {startAdornment}
        <Box
          as="input"
          ref={forwardedRef}
          disabled={disabled}
          // Styles
          flex={1}
          height="medium"
          paddingX="medium"
          paddingLeft={startAdornment ? 'none' : 'medium'}
          paddingRight={endAdornment ? 'none' : 'medium'}
          className={css(useInputNested({ disabled, invalid }))}
          {...(data ? buildDataAttributes(data) : null)}
          {...a11yProps}
          {...consumerProps}
        />
        {endAdornment}
      </Box>
    );
  }
);
TextInput.displayName = 'TextInput';

export type UseInputProps = Pick<FieldContextType, 'disabled' | 'invalid'>;

export const useInput = ({ disabled }: UseInputProps) => {
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
};

export const useInputWrapper = () => {
  const theme = useTheme();
  const focusRingStyles = useFocusRing({ always: true });

  return {
    ':focus-within': {
      ...focusRingStyles,
      borderColor: theme.border.color.fieldAccent,
    },
  };
};

export const useInputNested = ({ disabled }: UseInputProps) => {
  const textStyles = useText({
    baseline: false,
    tone: disabled ? 'disabled' : 'neutral',
    size: 'standard',
    weight: 'regular',
  });
  const [typographyStyles, responsiveStyles] = textStyles;
  const theme = useTheme();

  return {
    ...typographyStyles,
    ...responsiveStyles,
    ':focus': {
      // This removes the nested input outline visibility since
      // the wrapper will be outlined, but still visibly focusable
      // to windows high contrast mode users.
      // @see https://tailwindcss.com/docs/outline-style#removing-outlines
      outline: '2px solid transparent',
      outlineOffset: '2px'
    },
    ':enabled': {
      '&:hover': {
        borderColor: theme.border.color.fieldHover,
      },
    },
  };
};