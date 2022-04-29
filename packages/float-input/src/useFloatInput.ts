import numeral from 'numeral';
import type {
  AllHTMLAttributes,
  FocusEventHandler,
  FormEventHandler,
} from 'react';
import { useCallback, useState } from 'react';

/** Ensure only valid values are passed to the consumer */
const isValid = (text: string) => {
  let valid = /^\s*\$?-?[\d,]+(\.\d+)?\s*$/;
  return valid.test(text) && !isNaN(parse(text));
};

/** Strip invalid characters */
const normalise = (text: string) => {
  return text.trim().replace(/^\$/, '').replace(/,/g, '');
};

/** Safe parse */
const parse = (text: string) => {
  return parseFloat(normalise(text));
};

/** Resolve leading decimal issues */
const padLeadingDecimal = (text: string) => {
  if (text.startsWith('.')) {
    return `0${text}`;
  } else if (text.startsWith('-.')) {
    return `-0${text.substring(1)}`;
  }

  return text;
};

/** Prepare the formatter */
const useFormat = (fractionDigits?: number) => {
  return useCallback(
    (val?: number | string) => {
      if (typeof val === 'undefined') {
        return '';
      }

      if (typeof val === 'string' && !isValid(val)) {
        return val;
      }

      const pattern = fractionDigits
        ? `0,0.${'0'.repeat(fractionDigits)}`
        : '0,0.[00000000]';
      return numeral(val).format(pattern);
    },
    [fractionDigits]
  );
};

type FloatInputHandlers = {
  onChange: FormEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onFocus: FocusEventHandler<HTMLInputElement>;
  value: string | number;
};

type ControlledFloatInputProps = {
  onChange: (value: number | string) => void;
  value: number | string;
};

type UncontrolledFloatInputProps = {
  onChange?: never;
  value?: never;
};

export type UseFloatInputProps = {
  fractionDigits?: number;
} & Pick<AllHTMLAttributes<HTMLInputElement>, 'onBlur' | 'onFocus'> &
  (ControlledFloatInputProps | UncontrolledFloatInputProps);

export const useFloatInput = ({
  fractionDigits,
  onBlur: consumerBlur,
  onFocus: consumerFocus,
  onChange: controlledOnChange,
  value: controlledValue,
}: UseFloatInputProps): FloatInputHandlers => {
  if (Number.isNaN(controlledValue)) {
    throw new Error('NaN cannot be provided to numeric inputs.');
  }

  const format = useFormat(fractionDigits);

  const isControlled =
    controlledValue !== undefined && controlledOnChange !== undefined;
  const [internalValue, setInternalValue] = useState(() =>
    format(controlledValue)
  );

  const uncontrolledHandlers: FloatInputHandlers = {
    onChange: useCallback(e => {
      const paddedText = padLeadingDecimal(e.currentTarget.value);
      setInternalValue(normalise(paddedText));
    }, []),
    onBlur: useFocusHandler(consumerBlur, () => {
      setInternalValue(format(internalValue));
    }),
    onFocus: useFocusHandler(consumerFocus, () => {
      setInternalValue(currentValue => normalise(currentValue));
    }),
    value: internalValue,
  };

  const controlledHandlers: FloatInputHandlers = {
    onChange: useCallback(
      e => {
        if (!isControlled) return;
        const paddedText = padLeadingDecimal(e.currentTarget.value);
        if (!e.currentTarget.value) {
          controlledOnChange('');
        } else if (isValid(paddedText)) {
          controlledOnChange(parse(paddedText));
        } else {
          controlledOnChange(normalise(paddedText));
        }
        setInternalValue(normalise(paddedText));
      },
      [controlledOnChange, isControlled]
    ),
    onBlur: useFocusHandler(consumerBlur, () => {
      if (!isControlled) return;
      if (typeof controlledValue === 'number' && fractionDigits) {
        controlledOnChange(parse(controlledValue.toFixed(fractionDigits)));
      } else {
        controlledOnChange(controlledValue ?? '');
      }
      setInternalValue(format(internalValue));
    }),
    onFocus: useFocusHandler(consumerFocus, () => {
      setInternalValue(currentValue => normalise(currentValue));
    }),
    value: internalValue,
  };

  return isControlled ? controlledHandlers : uncontrolledHandlers;
};

const useFocusHandler = (
  consumerHandler: FocusEventHandler<HTMLInputElement> | undefined,
  ourHandler: FocusEventHandler<HTMLInputElement>
): FocusEventHandler<HTMLInputElement> => {
  return useCallback(
    event => {
      if (typeof consumerHandler === 'function') {
        consumerHandler(event);
      }

      if (!event?.defaultPrevented) {
        ourHandler(event);
      }
    },
    [consumerHandler, ourHandler]
  );
};
