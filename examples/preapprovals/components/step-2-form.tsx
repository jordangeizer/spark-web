import { css } from '@emotion/css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFocusRing } from '@spark-web/a11y';
import { Alert } from '@spark-web/alert';
import { Box } from '@spark-web/box';
import { Button } from '@spark-web/button';
import { Field } from '@spark-web/field';
import { Fieldset } from '@spark-web/fieldset';
import { ChevronDownIcon } from '@spark-web/icon';
import { Select } from '@spark-web/select';
import { Stack } from '@spark-web/stack';
import { Text, useText } from '@spark-web/text';
import { InputAdornment, TextInput } from '@spark-web/text-input';
import { useTheme } from '@spark-web/theme';
import type { ReactNode } from 'react';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { formFieldError } from '../utils';
import { SegmentedControl, SegmentedControlOption } from './segmented-control';

const maritalStatusOptions = [
  { label: 'Single', value: 'single' },
  { label: 'Married', value: 'married' },
];

const dependantsOptions = [
  { label: '0', value: '0' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3+', value: '3+' },
];

const recurringPaymentFrequencyOptions = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Fornightly', value: 'fornightly' },
  { label: 'Monthly', value: 'monthly' },
];

const schema = z.object({
  maritalStatus: z.enum(['single', 'married']),
  dependants: z.preprocess(
    val => (val === null ? undefined : val),
    z.enum(['0', '1', '2', '3+'], { required_error: 'Dependants is required' })
  ),
  baseNetIncome: z.preprocess(
    val => (val === '' ? undefined : Number(val)),
    z
      .number({
        required_error: 'Base net income is required',
        invalid_type_error: 'Base net income must be a number',
      })
      .gte(0, 'Base net income must be greater than or equal to zero')
  ),
  baseNetIncomeFrequency: z.enum(['weekly', 'fornightly', 'monthly']),
  otherHouseholdIncome: z.preprocess(
    val => (val === '' ? undefined : Number(val)),
    z
      .number({
        required_error: 'Other household income is required',
        invalid_type_error: 'Other household income must be a number',
      })
      .gte(0, 'Other household income must be greater than or equal to zero')
  ),
  otherHouseholdIncomeFrequency: z.enum(['weekly', 'fornightly', 'monthly']),
  homeMortgageRepayment: z.preprocess(
    val => (val === '' ? undefined : Number(val)),
    z
      .number({
        required_error: 'Home mortgage repayment is required',
        invalid_type_error: 'Home mortgage repayment must be a number',
      })
      .gte(0, 'Home mortgage repayment must be greater than or equal to zero')
  ),
  homeMortgageRepaymentFrequency: z.enum(['weekly', 'fornightly', 'monthly']),
  otherLoanCommitments: z.preprocess(
    val => (val === '' ? undefined : Number(val)),
    z
      .number({
        required_error: 'Other loan commitments is required',
        invalid_type_error: 'Other loan commitments must be a number',
      })
      .gte(0, 'Other loan commitments must be greater than or equal to zero')
  ),
  otherLoanCommitmentsFrequency: z.enum(['weekly', 'fornightly', 'monthly']),
  householdCreditCardLimits: z.preprocess(
    val => (val === '' ? undefined : Number(val)),
    z
      .number({
        required_error: 'Household credit card limit(s) is required',
        invalid_type_error: 'Household credit card limit(s) must be a number',
      })
      .gte(
        0,
        'Household credit card limit(s) must be greater than or equal to zero'
      )
  ),
  householdCreditCardLimitsFrequency: z.enum([
    'weekly',
    'fornightly',
    'monthly',
  ]),
  householdLivingCosts: z.preprocess(
    val => (val === '' ? undefined : Number(val)),
    z
      .number({
        required_error: 'Household living costs is required',
        invalid_type_error: 'Household living costs must be a number',
      })
      .gte(0, 'Household living costs must be greater than or equal to zero')
  ),
  householdLivingCostsFrequency: z.enum(['weekly', 'fornightly', 'monthly']),
});

export type Step2FormSchema = z.infer<typeof schema>;

export const Step2Form = ({
  initialValues,
  onSubmit,
}: {
  initialValues?: Step2FormSchema;
  onSubmit: (data: Step2FormSchema) => Promise<void>;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const form = useForm<Step2FormSchema>({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });

  return (
    <Stack
      as="form"
      gap="xxsmall"
      onSubmit={form.handleSubmit(async data => {
        setError(undefined);
        setLoading(true);
        await onSubmit(data).catch(err => {
          setError(err.message);
          setLoading(false);
        });
      })}
    >
      <Section heading="Household details">
        <Field
          label="Marital status"
          {...formFieldError(form, 'maritalStatus')}
        >
          <Select
            options={maritalStatusOptions}
            {...form.register('maritalStatus')}
          />
        </Field>
        <Field label="Dependants" {...formFieldError(form, 'dependants')}>
          <SegmentedControl>
            {dependantsOptions.map(option => (
              <SegmentedControlOption
                key={option.label}
                {...option}
                {...form.register('dependants')}
              />
            ))}
          </SegmentedControl>
        </Field>
      </Section>
      <Section heading="Income">
        <Field
          label="Base net income"
          {...(formFieldError(form, 'baseNetIncome') ||
            formFieldError(form, 'baseNetIncomeFrequency'))}
        >
          <TextInput {...form.register('baseNetIncome')}>
            <InputAdornment placement="start">
              <Text>$</Text>
            </InputAdornment>
            <InputAdornment placement="end">
              <RecurringPaymentFrequencySelect
                options={recurringPaymentFrequencyOptions}
                {...form.register('baseNetIncomeFrequency')}
              />
            </InputAdornment>
          </TextInput>
        </Field>
        <Field
          label="Other household income"
          {...(formFieldError(form, 'otherHouseholdIncome') ||
            formFieldError(form, 'otherHouseholdIncomeFrequency'))}
        >
          <TextInput {...form.register('otherHouseholdIncome')}>
            <InputAdornment placement="start">
              <Text>$</Text>
            </InputAdornment>
            <InputAdornment placement="end">
              <RecurringPaymentFrequencySelect
                options={recurringPaymentFrequencyOptions}
                {...form.register('otherHouseholdIncomeFrequency')}
              />
            </InputAdornment>
          </TextInput>
        </Field>
      </Section>
      <Section heading="Expenses">
        <Field
          label="Home mortgage repayment"
          {...(formFieldError(form, 'homeMortgageRepayment') ||
            formFieldError(form, 'homeMortgageRepaymentFrequency'))}
        >
          <TextInput {...form.register('homeMortgageRepayment')}>
            <InputAdornment placement="start">
              <Text>$</Text>
            </InputAdornment>
            <InputAdornment placement="end">
              <RecurringPaymentFrequencySelect
                options={recurringPaymentFrequencyOptions}
                {...form.register('homeMortgageRepaymentFrequency')}
              />
            </InputAdornment>
          </TextInput>
        </Field>
        <Field
          label="Other loan commitments"
          {...(formFieldError(form, 'otherLoanCommitments') ||
            formFieldError(form, 'otherLoanCommitmentsFrequency'))}
        >
          <TextInput {...form.register('otherLoanCommitments')}>
            <InputAdornment placement="start">
              <Text>$</Text>
            </InputAdornment>
            <InputAdornment placement="end">
              <RecurringPaymentFrequencySelect
                options={recurringPaymentFrequencyOptions}
                {...form.register('otherLoanCommitmentsFrequency')}
              />
            </InputAdornment>
          </TextInput>
        </Field>
        <Field
          label="Household credit card limit(s)"
          {...(formFieldError(form, 'householdCreditCardLimits') ||
            formFieldError(form, 'householdCreditCardLimitsFrequency'))}
        >
          <TextInput {...form.register('householdCreditCardLimits')}>
            <InputAdornment placement="start">
              <Text>$</Text>
            </InputAdornment>
            <InputAdornment placement="end">
              <RecurringPaymentFrequencySelect
                options={recurringPaymentFrequencyOptions}
                {...form.register('householdCreditCardLimitsFrequency')}
              />
            </InputAdornment>
          </TextInput>
        </Field>
        <Field
          label="Household living costs"
          {...(formFieldError(form, 'householdLivingCosts') ||
            formFieldError(form, 'householdLivingCostsFrequency'))}
        >
          <TextInput {...form.register('householdLivingCosts')}>
            <InputAdornment placement="start">
              <Text>$</Text>
            </InputAdornment>
            <InputAdornment placement="end">
              <RecurringPaymentFrequencySelect
                options={recurringPaymentFrequencyOptions}
                {...form.register('householdLivingCostsFrequency')}
              />
            </InputAdornment>
          </TextInput>
        </Field>
        {error && (
          <Alert tone="critical" heading="Error">
            {error}
          </Alert>
        )}
        <Button type="submit" loading={loading}>
          Calculate limit
        </Button>
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

const RecurringPaymentFrequencySelect = forwardRef<
  HTMLSelectElement,
  { options: { label: string; value: string }[] }
>(function RecurringPaymentFrequencySelect({ options }, ref) {
  const theme = useTheme();
  const focusStyles = useFocusRing({ always: true });
  const textStyles = useText({
    size: 'small',
    tone: 'neutral',
    weight: 'regular',
    baseline: false,
  });

  return (
    <Box position="absolute" right={0}>
      <Box
        position="absolute"
        top={0}
        bottom={0}
        right={0}
        display="flex"
        alignItems="center"
        padding="medium"
        className={css({ pointerEvents: 'none' })}
      >
        <ChevronDownIcon size="xxsmall" tone="placeholder" />
      </Box>
      <Box
        as="select"
        ref={ref}
        borderRadius="small"
        height="medium"
        paddingRight="xxlarge"
        className={css([
          {
            appearance: 'none',
            border: '1px solid transparent',
            background: 'none',
            outline: 'none',
            textAlign: 'right',

            ':focus': {
              borderColor: theme.border.color.fieldAccent,
              ...focusStyles,
            },
          },
          ...textStyles,
        ])}
      >
        {options.map(({ label, value }) => (
          <Box as="option" key={label} value={value}>
            {label}
          </Box>
        ))}
      </Box>
    </Box>
  );
});
