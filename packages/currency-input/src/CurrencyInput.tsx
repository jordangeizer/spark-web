import { useFieldContext } from '@spark-web/field';
import type { FloatInputProps, UseFloatInputProps } from '@spark-web/float-input';
import { FloatInput } from '@spark-web/float-input';
import { Text } from '@spark-web/text';
import type { AdornmentChild } from '@spark-web/text-input';
import { InputAdornment } from '@spark-web/text-input';
import { forwardRef } from 'react';

import type { CurrencyType } from './currencySymbolMap';
import { currencySymbolMap } from './currencySymbolMap';

/** NOTE: The "start" adornment is filled, so we can only accept a single child element. */
export type CurrencyInputProps = { children?: AdornmentChild, currencyType?: CurrencyType } & Omit<
  FloatInputProps, 'fractionDigits'
>;

/** A component for inputting numbers into the app via a keyboard. Enforces 2 fraction digits. */
export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(({ children, currencyType, ...props }, ref) => {
  const { disabled } = useFieldContext();

  const {
    onChange,
    value,
    ...rest
  } = props;

  let floatInputProps: UseFloatInputProps = rest;
  if (onChange !== undefined && value !== undefined) {
    floatInputProps = { ...floatInputProps, onChange, value };
  }

  return (
    <FloatInput ref={ref} fractionDigits={2} {...floatInputProps}>
      <InputAdornment placement="start">
        <Text tone={disabled ? 'disabled' : 'placeholder'}>{currencySymbolMap[currencyType ?? 'AUD']}</Text>
      </InputAdornment>
      {children}
    </FloatInput>
  );
});

CurrencyInput.displayName = 'CurrencyInput';