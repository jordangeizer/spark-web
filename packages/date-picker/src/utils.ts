import {
  format,
  isAfter,
  isBefore,
  isDate as fnsIsDate,
  isValid,
  parse,
} from 'date-fns';

/** Date format is not configurable. */
const dateFormat = 'dd/MM/yyyy';

/** Formats a date to 'dd/MM/yyyy'. */
export function formatDate(date: string | number | Date) {
  return format(new Date(date), dateFormat);
}

/** Formats a date object into a more human readable form. */
export function formatHumanReadableDate(date: Date) {
  return format(date, 'eeee MMMM do, yyyy');
}

/** Checks whether a value is a Date. */
export function isDate(value: unknown): value is Date {
  return fnsIsDate(value);
}

/**
 * Returns a date parsed from a string that is in 'dd/MM/yyyy' format.
 *
 * @see https://github.com/date-fns/date-fns/issues/942
 */
export function parseDate(value: string) {
  if (value.length !== dateFormat.length) {
    return undefined;
  }

  const parsedDate = parse(value, dateFormat, new Date());
  if (isDate(parsedDate) && isValid(parsedDate)) {
    return parsedDate;
  }

  return undefined;
}

/**
 * Constrains a date to be within a range:
 *
 * @see
 * [min](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date#min)
 * and [max](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date#max).
 */
export function constrainDate(
  date: Date | undefined,
  minDate: Date | undefined,
  maxDate: Date | undefined
) {
  if (!date) {
    return date;
  }
  if (minDate && isBefore(date, minDate)) {
    return minDate;
  }
  if (maxDate && isAfter(date, maxDate)) {
    return maxDate;
  }
  return date;
}
