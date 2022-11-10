import { Field } from '@spark-web/field';
import { InformationCircleIcon } from '@spark-web/icon';
import { Inline } from '@spark-web/inline';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import type { CurrencyInputProps } from './currency-input';
import { CurrencyInput } from './currency-input';

export default {
  title: 'Forms / CurrencyInput',
  component: CurrencyInput,
} as ComponentMeta<typeof CurrencyInput>;

const TextInputStory: ComponentStory<typeof CurrencyInput> = (
  args: CurrencyInputProps
) => {
  return (
    <Stack gap="large">
      <Inline gap="xsmall" alignY="center">
        <InformationCircleIcon tone="info" size="xsmall" />
        <Text weight="semibold" tone="info" baseline={false}>
          {`Must be used inside of a <Field/>`}
        </Text>
      </Inline>
      <Field label="Currency input">
        <CurrencyInput {...args} />
      </Field>
    </Stack>
  );
};
export const Default = TextInputStory.bind({});

Default.args = {} as CurrencyInputProps;
