import { Field } from '@spark-web/field';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { addDays, subDays } from 'date-fns';
import { useState } from 'react';

import { DatePicker } from './date-picker';

export default {
  title: 'Forms / DatePicker',
  component: DatePicker,
  subcomponents: { Field },
} as ComponentMeta<typeof DatePicker>;

const Basic: ComponentStory<typeof DatePicker> = args => {
  const [value, setValue] = useState<Date>();
  return (
    <Field label="Set date">
      <DatePicker {...args} value={value} onChange={setValue} />
    </Field>
  );
};
Basic.bind({});
Basic.args = {};

export const MinMaxDates = Basic.bind({});
MinMaxDates.args = {
  minDate: subDays(new Date(), 7),
  maxDate: addDays(new Date(), 7),
};

export const InitialMonth = Basic.bind({});
InitialMonth.args = {
  initialMonth: new Date('1999-12-01'),
};

export const Disabled: ComponentStory<typeof Field> = args => {
  const [value, setValue] = useState<Date | undefined>(new Date());
  return (
    <Field {...args}>
      <DatePicker
        value={value}
        onChange={setValue}
        minDate={addDays(new Date(), 7)}
      />
    </Field>
  );
};
Disabled.bind({});
Disabled.args = {
  label: 'This input is disabled',
  disabled: true,
};

export const WithCriticalMessage: ComponentStory<typeof Field> = args => {
  const [value, setValue] = useState<Date | undefined>(new Date());
  return (
    <Field {...args}>
      <DatePicker
        value={value}
        onChange={setValue}
        minDate={addDays(new Date(), 7)}
      />
    </Field>
  );
};
WithCriticalMessage.bind({});
WithCriticalMessage.args = {
  label: 'Set date',
  message: 'Date must be in the future.',
  tone: 'critical',
};

export const WithPositiveMessage: ComponentStory<typeof Field> = args => {
  const [value, setValue] = useState<Date | undefined>(new Date());
  return (
    <Field {...args}>
      <DatePicker value={value} onChange={setValue} />
    </Field>
  );
};
WithPositiveMessage.bind({});
WithPositiveMessage.args = {
  label: 'Set date',
  message: 'Everything looks good. Nice work.',
  tone: 'positive',
};
