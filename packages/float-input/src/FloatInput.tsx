import type { TextInputProps } from '@spark-web/text-input';
import { TextInput } from '@spark-web/text-input';
import { forwardRef } from 'react';

import type { UseFloatInputProps } from './useFloatInput';
import { useFloatInput } from './useFloatInput';

export type FloatInputProps = UseFloatInputProps &
  Omit<TextInputProps, 'onChange' | 'value' | 'type' | 'mode' | 'children'>;

export const FloatInput = forwardRef<HTMLInputElement, FloatInputProps>(
  (
    { fractionDigits, onBlur, onFocus, onChange, value, data, placeholder },
    forwardedRef
  ) => {
    let inputs: UseFloatInputProps = {
      fractionDigits,
      onBlur,
      onFocus,
    };

    if (onChange !== undefined && value !== undefined) {
      inputs = { ...inputs, onChange, value };
    }

    const {
      onBlur: floatOnBlur,
      onChange: floatOnChange,
      onFocus: floatOnFocus,
      value: floatValue,
    } = useFloatInput(inputs);

    return (
      <TextInput
        ref={forwardedRef}
        data={data}
        placeholder={placeholder}
        type="text"
        inputMode="decimal"
        onBlur={floatOnBlur}
        onChange={floatOnChange}
        onFocus={floatOnFocus}
        value={floatValue}
      />
    );
  }
);

FloatInput.displayName = 'FloatInput';
