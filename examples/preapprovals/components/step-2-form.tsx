import { Button } from '@spark-web/button';
import { Field } from '@spark-web/field';
import { Fieldset } from '@spark-web/fieldset';
import { Select } from '@spark-web/select';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import type { FormEvent, ReactNode } from 'react';

import { RecurringPaymentInput } from './recurring-payment-input';
import { SegmentedControl } from './segmented-control';

export const Step2Form = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <Stack
      as="form"
      gap="xxsmall"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Section heading="Household details">
        <Field label="Marital status">
          <Select
            options={[
              { label: 'Single', value: 'single' },
              { label: 'Married', value: 'married' },
            ]}
          />
        </Field>
        <Field label="Dependants">
          <SegmentedControl
            name="dependants"
            options={[
              { label: '0', value: '0' },
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3+', value: '3+' },
            ]}
          />
        </Field>
      </Section>
      <Section heading="Income">
        <Field label="Base net income">
          <RecurringPaymentInput />
        </Field>
        <Field label="Other household income">
          <RecurringPaymentInput />
        </Field>
      </Section>
      <Section heading="Expenses">
        <Field label="Home mortgage repayment">
          <RecurringPaymentInput />
        </Field>
        <Field label="Other loan commitments">
          <RecurringPaymentInput />
        </Field>
        <Field label="Household credit card limit(s)">
          <RecurringPaymentInput />
        </Field>
        <Field label="Household living costs">
          <RecurringPaymentInput />
        </Field>
        <Button type="submit">Calculate limit</Button>
      </Section>
    </Stack>
  );
};

const Section = ({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) => (
  <Stack
    background="secondaryLow"
    paddingX="large"
    paddingY="xlarge"
    gap="xlarge"
  >
    <Text
      as="h3"
      transform="uppercase"
      tone="primary"
      weight="semibold"
      size="small"
    >
      {heading}
    </Text>
    <Fieldset gap="large">{children}</Fieldset>
  </Stack>
);
