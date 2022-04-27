import type { TextInputProps } from '@spark-web/text-input';
import { TextInput } from '@spark-web/text-input';
import { forwardRef } from 'react';

import type { UseFloatInputProps } from './useFloatInput';
import { useFloatInput } from './useFloatInput';

export type FloatInputProps = UseFloatInputProps &
  Omit<TextInputProps, 'onChange' | 'value'>;

export const FloatInput = forwardRef<HTMLInputElement, FloatInputProps>(
  (props, ref) => {
    const {
      fractionDigits,
      onBlur,
      onFocus,
      onChange,
      value,
      ...textInputProps
    } = props;
    let inputs: UseFloatInputProps = {
      fractionDigits,
      onBlur,
      onFocus,
    };

    if (onChange !== undefined && value !== undefined) {
      inputs = { ...inputs, onChange, value };
    }

    const floatInputProps = useFloatInput(inputs);

    return <TextInput ref={ref} {...textInputProps} {...floatInputProps} />;
  }
);

FloatInput.displayName = 'FloatInput';
