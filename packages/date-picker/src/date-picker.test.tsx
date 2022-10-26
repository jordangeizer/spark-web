import '@testing-library/jest-dom/extend-expect';

import { Field } from '@spark-web/field';
import { render, screen } from '@testing-library/react';

// import userEvent from '@testing-library/user-event';
import type { DatePickerProps } from './date-picker';
import { DatePicker } from './date-picker';
import { parseDate } from './utils';

function useRenderDatePicker(props?: Partial<DatePickerProps>) {
  return render(
    <Field label="Set date">
      {/* @ts-expect-error: props is not strict enough here. */}
      <DatePicker {...props} />
    </Field>
  );
}

describe('DatePicker', () => {
  it('Should render a datepicker with a specified date', () => {
    useRenderDatePicker({
      value: parseDate('12/09/2022'),
    });
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('12/09/2022');
  });
});
