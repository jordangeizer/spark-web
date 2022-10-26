import { ChevronLeftIcon, ChevronRightIcon } from '@spark-web/icon';
import type { CustomComponents, DayPickerSingleProps } from 'react-day-picker';
import { DayPicker } from 'react-day-picker';
import FocusLock from 'react-focus-lock';

import { CalendarContainer } from './calendar-container';

export type CalendarSingleProps = Omit<
  DayPickerSingleProps,
  'mode' | 'components'
>;

export function CalendarSingle(props: CalendarSingleProps) {
  return (
    <FocusLock autoFocus={false} returnFocus>
      <CalendarContainer>
        <DayPicker {...props} mode="single" components={calendarComponents} />
      </CalendarContainer>
    </FocusLock>
  );
}

const calendarComponents: CustomComponents = {
  IconRight: function IconRight() {
    return <ChevronRightIcon size="xsmall" />;
  },
  IconLeft: function IconLeft() {
    return <ChevronLeftIcon size="xsmall" />;
  },
};
