import { css } from '@emotion/css';
import { BaseButton, useButtonStyles } from '@spark-web/button';
import { useFieldContext } from '@spark-web/field';
import { CalendarIcon } from '@spark-web/icon';
import type { TextInputProps } from '@spark-web/text-input';
import { InputAdornment, TextInput } from '@spark-web/text-input';
import type { MouseEventHandler, RefObject } from 'react';
import { forwardRef, useMemo } from 'react';

import { formatHumanReadableDate, parseDate } from './utils';

export type DateInputProps = Omit<
  TextInputProps,
  'children' | 'inputMode' | 'pattern' | 'type'
> & {
  buttonRef: RefObject<HTMLButtonElement>;
  buttonOnClick: MouseEventHandler<HTMLButtonElement>;
};

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  function DateInput(
    { buttonRef, buttonOnClick, value, ...consumerProps },
    forwardedRef
  ) {
    const [boxProps, buttonStyles] = useIconButtonStyles();

    const [{ disabled }] = useFieldContext();
    const buttonLabel = useMemo(() => {
      if (typeof value !== 'string') {
        return 'Choose date';
      }
      const parsed = parseDate(value);
      if (!parsed) {
        return 'Choose date';
      }
      return `Change Date, ${formatHumanReadableDate(parsed)}`;
    }, [value]);

    return (
      <TextInput {...consumerProps} ref={forwardedRef} value={value}>
        <InputAdornment placement="end">
          <BaseButton
            {...boxProps}
            aria-label={buttonLabel}
            onClick={buttonOnClick}
            ref={buttonRef}
            disabled={disabled}
            className={css(buttonStyles)}
            // The input is not keyboard navigable when disabled and so we are
            // also removing the button from the tab index to make it less
            // confusing to keyboard and assistive technology users.
            tabIndex={disabled ? -1 : undefined}
          >
            <CalendarIcon tone={disabled ? 'disabled' : 'neutral'} />
          </BaseButton>
        </InputAdornment>
      </TextInput>
    );
  }
);

function useIconButtonStyles() {
  const [, buttonStyles] = useButtonStyles({
    iconOnly: false,
    prominence: 'none',
    size: 'medium',
    tone: 'neutral',
  });

  return [
    {
      alignItems: 'center',
      borderRadius: 'full',
      cursor: 'pointer',
      display: 'inline-flex',
      gap: 'small',
      height: 'small',
      justifyContent: 'center',
      paddingX: 'xsmall',
      position: 'relative',
      width: 'small',
    },
    buttonStyles,
  ] as const;
}
