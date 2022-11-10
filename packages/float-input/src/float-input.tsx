import type { TextInputProps } from '@spark-web/text-input';
import { TextInput } from '@spark-web/text-input';
import { forwardRef } from 'react';

import type { UseFloatInputProps } from './use-float-input';
import { useFloatInput } from './use-float-input';

export type FloatInputProps = UseFloatInputProps &
  Omit<TextInputProps, 'onChange' | 'value' | 'type' | 'inputMode'>;

export const FloatInput = forwardRef<HTMLInputElement, FloatInputProps>(
  (
    {
      fractionDigits,
      onBlur,
      onFocus,
      onChange,
      value,
      data,
      placeholder,
      children,
      ...inputProps
    },
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
        {...inputProps}
        ref={forwardedRef}
        data={data}
        placeholder={placeholder}
        type="text"
        inputMode="decimal"
        onBlur={floatOnBlur}
        onChange={floatOnChange}
        onFocus={floatOnFocus}
        value={floatValue}
      >
        {children}
      </TextInput>
    );
  }
);

FloatInput.displayName = 'FloatInput';
