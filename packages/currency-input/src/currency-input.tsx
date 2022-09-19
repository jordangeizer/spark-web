import { useFieldContext } from '@spark-web/field';
import type {
  FloatInputProps,
  UseFloatInputProps,
} from '@spark-web/float-input';
import { FloatInput } from '@spark-web/float-input';
import { Text } from '@spark-web/text';
import { InputAdornment } from '@spark-web/text-input';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import { forwardRef } from 'react';

import type { CurrencyType } from './currency-symbol-map';
import { currencySymbolMap } from './currency-symbol-map';

/** NOTE: The "start" adornment is filled, so we can only accept a single child element. */
export type CurrencyInputProps = {
  /** Specifies what currency symbol you want as a starting adornment to the component. */
  currencyType?: CurrencyType;
  /** Sets data attributes on the component. */
  data?: DataAttributeMap;
} & Omit<FloatInputProps, 'fractionDigits'>;

/** A component for inputting numbers into the app via a keyboard. Enforces 2 fraction digits. */
export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ currencyType, data, onChange, value, onBlur, onFocus }, forwardedRef) => {
    const [{ disabled }] = useFieldContext();

    let floatInputProps: UseFloatInputProps = { onBlur, onFocus };
    if (onChange !== undefined && value !== undefined) {
      floatInputProps = { ...floatInputProps, onChange, value };
    }

    return (
      <FloatInput
        data={data}
        ref={forwardedRef}
        fractionDigits={2}
        {...floatInputProps}
      >
        <InputAdornment placement="start">
          <Text tone={disabled ? 'disabled' : 'placeholder'}>
            {currencySymbolMap[currencyType ?? 'AUD']}
          </Text>
        </InputAdornment>
      </FloatInput>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';
