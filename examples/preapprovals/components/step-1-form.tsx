import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from '@spark-web/alert';
import { Button } from '@spark-web/button';
import { Field } from '@spark-web/field';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { TextInput } from '@spark-web/text-input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { formFieldError } from '../utils';

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  mobile: z
    .string()
    .trim()
    .min(1, 'Mobile is required')
    .refine(val => /^04\d{8}$/.test(val), 'Invalid mobile'),
  email: z.string().trim().min(1, 'Email is required').email('Invalid email'),
});

export type Step1FormSchema = z.infer<typeof schema>;

export const Step1Form = ({
  initialValues,
  onSubmit,
}: {
  initialValues?: Step1FormSchema;
  onSubmit: (data: Step1FormSchema) => Promise<void>;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const form = useForm<Step1FormSchema>({
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
      <Field label="Name" {...formFieldError(form, 'name')}>
        <TextInput {...form.register('name')} />
      </Field>
      <Field label="Mobile" {...formFieldError(form, 'mobile')}>
        <TextInput type="tel" {...form.register('mobile')} />
      </Field>
      <Field label="Email" {...formFieldError(form, 'email')}>
        <TextInput type="email" {...form.register('email')} />
      </Field>
      {error && (
        <Alert tone="critical" heading="Error">
          {error}
        </Alert>
      )}
      <Button type="submit" loading={loading}>
        Continue
      </Button>
      <Text size="xsmall">
        {
          "By clicking 'Continue' you understand that Brighte may collect, use and disclose your personal information for the purposes set out in Brighte's Privacy Policy."
        }
      </Text>
    </Stack>
  );
};
