import { Text } from '@spark-web/text';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import type { AccordionProps } from './accordion';
import { Accordion, AccordionItem } from './accordion';

export default {
  title: 'Data Display / Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const AccordionStory: ComponentStory<typeof Accordion> = (
  args: AccordionProps
) => <Accordion {...args} />;

export const Single = AccordionStory.bind({});
export const Multiple = AccordionStory.bind({});

Single.args = {
  type: 'single',
  children: (
    <>
      <AccordionItem
        value="item-1"
        label="What is this?"
        level="4"
        background="primaryLow"
      >
        <Text>This is an example accordion</Text>
      </AccordionItem>
      <AccordionItem
        value="item-2"
        label="Should I click this?"
        level="4"
        background="cautionLow"
      >
        <Text>Yes</Text>
      </AccordionItem>
      <AccordionItem
        value="item-3"
        label="What is in it for me?"
        level="4"
        background="infoLow"
      >
        <Text>A nice accordion</Text>
      </AccordionItem>
    </>
  ),
} as AccordionProps;

Multiple.args = {
  type: 'multiple',
  children: (
    <>
      <AccordionItem value="item-1" label="What is this?" level="4">
        <Text>This is an example accordion</Text>
      </AccordionItem>
      <AccordionItem value="item-2" label="Should I click this?" level="4">
        <Text>Yes</Text>
      </AccordionItem>
      <AccordionItem value="item-3" label="What is in it for me?" level="4">
        <Text>A nice accordion</Text>
      </AccordionItem>
    </>
  ),
} as AccordionProps;
