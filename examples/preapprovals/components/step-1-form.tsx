import { Button } from '@spark-web/button';
import { Field } from '@spark-web/field';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { TextInput } from '@spark-web/text-input';
import type { FormEvent } from 'react';

export const Step1Form = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <Stack
      as="form"
      gap="large"
      paddingX="large"
      paddingY="xlarge"
      background="secondaryLow"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Field label="Name">
        <TextInput />
      </Field>
      <Field label="Mobile">
        <TextInput />
      </Field>
      <Field label="Email">
        <TextInput />
      </Field>
      <Button type="submit">Continue</Button>
      <Text size="xsmall">
        {
          "By clicking 'Continue' you understand that Brighte may collect, use and disclose your personal information for the purposes set out in Brighte's Privacy Policy."
        }
      </Text>
    </Stack>
  );
};
