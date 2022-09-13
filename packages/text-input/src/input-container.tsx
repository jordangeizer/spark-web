import { css } from '@emotion/css';
import type { BoxProps } from '@spark-web/box';
import { Box } from '@spark-web/box';
import { useFieldContext } from '@spark-web/field';
import type { ReactElement } from 'react';

import type { InputAdornmentProps } from './input-adornment';

export type InputContainerProps = {
  /** Slot to start render adornment. */
  startAdornment?: ReactElement<InputAdornmentProps> | null;
  /** Slot to end render adornment. */
  endAdornment?: ReactElement<InputAdornmentProps> | null;
} & Omit<BoxProps, 'background' | 'position'>;

export const InputContainer = ({
  children,
  startAdornment,
  endAdornment,
  ...boxProps
}: InputContainerProps) => {
  const [{ disabled, invalid }] = useFieldContext();

  return (
    <Box
      borderRadius="small"
      position="relative"
      background={disabled ? 'inputDisabled' : 'input'}
      {...boxProps}
    >
      {startAdornment}
      {children}
      <FocusIndicator invalid={invalid} />
      {endAdornment}
    </Box>
  );
};

const FocusIndicator = ({ invalid }: { invalid: boolean }) => {
  return (
    <Box
      aria-hidden="true"
      as="span"
      data={{ 'focus-indicator': 'true' }}
      // Styles
      border={invalid ? 'critical' : 'field'}
      borderRadius="small"
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      top={0}
      className={css({ pointerEvents: 'none' })}
    />
  );
};
