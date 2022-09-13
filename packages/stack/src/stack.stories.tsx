import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Placeholder } from '../../../docs/components/example-helpers';
import type { StackProps } from './stack';
import { Stack } from './stack';

export default {
  title: 'Page & Layout / Stack',
  component: Stack,
} as ComponentMeta<typeof Stack>;

const StackStory: ComponentStory<typeof Stack> = (args: StackProps) => (
  <Stack {...args} />
);

export const Default = StackStory.bind({});

Default.args = {
  gap: 'large',
  children: (
    <>
      <Placeholder height={40} />
      <Placeholder height={40} />
      <Placeholder height={40} />
    </>
  ),
} as StackProps;
