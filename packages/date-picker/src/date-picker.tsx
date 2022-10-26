import { Stack } from '@spark-web/stack';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import type { ChangeEvent, KeyboardEvent } from 'react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { SelectSingleEventHandler } from 'react-day-picker';
import { usePopper } from 'react-popper';

import { CalendarSingle } from './calendar';
import type { DateInputProps } from './date-picker-input';
import { DateInput } from './date-picker-input';
import { useClickOutside, useTernaryState } from './hooks';
import { constrainDate, formatDate, parseDate } from './utils';

/**
 * DatePicker
 *
 * The DatePicker component allows users to either manually enter a date
 * in `dd/MM/yyyy` format or use the calendar button to render a month view
 * that users can pick from. Clicking on a date will fill in the input for
 * that date in the correct format.
 *
 * @see https://spark.brighte.com.au/package/date-picker
 */

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  function DatePicker(
    { data, initialMonth, maxDate, minDate, onChange, value, ...consumerProps },
    forwardedRef
  ) {
    const [isCalendarOpen, openCalendar, closeCalendar] =
      useTernaryState(false);

    // Popper state
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [refEl, setRefEl] = useState<HTMLDivElement | null>(null);
    const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(refEl, popperEl, {
      placement: 'bottom-start',
      modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
    });

    const onSelect = useCallback<SelectSingleEventHandler>(
      (_, selectedDay, modifiers) => {
        // If the day is disabled, do nothing
        if (modifiers.disabled) {
          return;
        }
        // Update the input field with the selected day
        setInputValue(formatDate(selectedDay));
        // Trigger the callback
        onChange(selectedDay);
        // Close the calendar and focus the calendar icon
        closeCalendar();
      },
      [onChange, closeCalendar]
    );

    const [inputValue, setInputValue] = useState(
      value ? formatDate(value) : ''
    );

    const onInputChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setInputValue(inputValue);
        const parsedDate = parseDate(inputValue);
        const constrainedDate = constrainDate(parsedDate, minDate, maxDate);
        onChange(constrainedDate);
      },
      [maxDate, minDate, onChange]
    );

    // Update the text inputs when the value updates
    useEffect(() => {
      if (value) {
        setInputValue(formatDate(value));
      }
    }, [value]);

    // Close the calendar when the user clicks outside
    const clickOutsideRef = useRef(popperEl);
    clickOutsideRef.current = popperEl;

    const handleClickOutside = useCallback(() => {
      if (isCalendarOpen) {
        closeCalendar();
      }
    }, [isCalendarOpen, closeCalendar]);

    useClickOutside(clickOutsideRef, handleClickOutside);

    // Close the calendar when the user presses escape
    const handleEscape = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (isCalendarOpen && event.code === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
          // Close the calendar and focus the calendar icon
          closeCalendar();
        }
      },
      [isCalendarOpen, closeCalendar]
    );

    const disabledCalendarDays = useMemo(() => {
      if (!(minDate || maxDate)) {
        return;
      }
      return [
        minDate ? { before: minDate } : undefined,
        maxDate ? { after: maxDate } : undefined,
      ].filter((x): x is NonNullable<typeof x> => Boolean(x));
    }, [minDate, maxDate]);

    return (
      <Stack ref={setRefEl} onKeyDown={handleEscape} data={data} width="full">
        <DateInput
          {...consumerProps}
          buttonOnClick={openCalendar}
          buttonRef={triggerRef}
          onChange={onInputChange}
          ref={forwardedRef}
          value={inputValue}
        />
        {isCalendarOpen && (
          <div
            {...attributes.popper}
            ref={setPopperEl}
            style={{ ...styles.popper, zIndex: 1 }}
          >
            <CalendarSingle
              defaultMonth={value || initialMonth}
              disabled={disabledCalendarDays}
              initialFocus
              numberOfMonths={1}
              onSelect={onSelect}
              selected={value}
            />
          </div>
        )}
      </Stack>
    );
  }
);

type DatePickerInputProps = Omit<
  DateInputProps,
  'buttonOnClick' | 'buttonRef' | 'children' | 'onChange' | 'value'
>;

type DatePickerCalendarProps = {
  /** If set, any days before this date will not be selectable. */
  minDate?: Date;
  /** If set, any days after this date will not be selectable. */
  maxDate?: Date;
  /** The calendar month to initially show, if no value is set. */
  initialMonth?: Date;
};

type DatePickerBaseProps = {
  /** Map of data attributes. */
  data?: DataAttributeMap;
  /** The value of the field. */
  value: Date | undefined;
  /** Function to be fired following a change event. */
  onChange: (day: Date | undefined) => void;
};

export type DatePickerProps = DatePickerInputProps &
  DatePickerCalendarProps &
  DatePickerBaseProps;
