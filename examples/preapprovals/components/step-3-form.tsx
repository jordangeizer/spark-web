import { css } from '@emotion/css';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from '@spark-web/alert';
import { Box } from '@spark-web/box';
import { Button } from '@spark-web/button';
import { Checkbox } from '@spark-web/checkbox';
import { Field } from '@spark-web/field';
import { Heading } from '@spark-web/heading';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { InputAdornment, TextInput } from '@spark-web/text-input';
import { useTheme } from '@spark-web/theme';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { formFieldError } from '../utils';
import { Slant } from './slant';

const schema = z.object({
  amount: z.preprocess(
    val => (val === '' ? undefined : Number(val)),
    z
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      })
      .gt(0, 'Amount must be greater than zero')
  ),
  confirmation: z
    .boolean()
    .refine(val => val === true, 'Confirmation is required'),
});

export type Step3FormSchema = z.infer<typeof schema>;

export const Step3Form = ({
  initialValues,
  onSubmit,
}: {
  initialValues?: Step3FormSchema;
  onSubmit: (data: Step3FormSchema) => Promise<void>;
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const form = useForm<Step3FormSchema>({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });

  return (
    <Stack
      as="form"
      gap="large"
      paddingX="large"
      paddingY="xlarge"
      background="secondaryLow"
      onSubmit={form.handleSubmit(async data => {
        setError(undefined);
        setLoading(true);
        await onSubmit(data).catch(err => {
          setError(err.message);
          setLoading(false);
        });
      })}
    >
      <Field
        label="How much would you like to be approved for?"
        {...formFieldError(form, 'amount')}
      >
        <TextInput {...form.register('amount')}>
          <InputAdornment placement="start">
            <Text>$</Text>
          </InputAdornment>
        </TextInput>
      </Field>
      <Box
        className={css({
          marginLeft: -theme.spacing.large,
          marginRight: -theme.spacing.large,
        })}
      >
        <Slant>
          <Stack
            gap="xlarge"
            marginX="large"
            padding="xlarge"
            background="primary"
            align="center"
          >
            <Text size="large" align="center">
              Your maximum repayment amount will be
            </Text>
            <Heading as="span" level="1" align="center">
              $581.23^
            </Heading>
            <Text align="center">per fornight (including fees*)</Text>
          </Stack>
        </Slant>
      </Box>
      <Field
        label="Please confirm that you can afford this fortnightly repayment"
        {...formFieldError(form, 'confirmation')}
      >
        <Box paddingY="medium">
          <Checkbox {...form.register('confirmation')}>
            Yes, I can afford $581.23/fortnight
          </Checkbox>
        </Box>
      </Field>
      {error && (
        <Alert tone="critical" heading="Error">
          {error}
        </Alert>
      )}
      <Button type="submit" loading={loading}>
        Apply now
      </Button>
    </Stack>
  );
};
