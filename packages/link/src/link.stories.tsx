import { Inline } from '@spark-web/inline';
import { Text } from '@spark-web/text';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import type { LinkProps } from './link';
import { Link } from './link';

export default {
  title: 'Navigation / Link',
  component: Link,
} as ComponentMeta<typeof Link>;

const LinkStory: ComponentStory<typeof Link> = (args: LinkProps) => (
  <Inline>
    <Link {...args} />
  </Inline>
);
export const Default = LinkStory.bind({});

Default.args = {
  href: 'https://brighte.com.au',
  children: <Text>I'm a link!</Text>,
} as LinkProps;
