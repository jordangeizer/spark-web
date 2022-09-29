import { Heading, Stack, Text } from '@spark-web/design-system';
import type { ReactNode } from 'react';

import { DocsContent } from '../../components/content';

// Force static page building because we have `getInitialProps` in `_app`
export const getStaticProps = () => ({ props: {} });

export default function TypographyPage() {
  return (
    <DocsContent
      pageTitle="Typography"
      includeNavigation
      toc={typographicStyles}
    >
      <Stack gap="xlarge" dividers>
        <Stack gap="xlarge">
          <Heading level="1">Typography</Heading>
          <Text size="large" tone="muted">
            List of our typographic styles for reference.
          </Text>
        </Stack>
        <Stack gap="xlarge">
          {typographicStyles.map(type => type.component)}
        </Stack>
      </Stack>
    </DocsContent>
  );
}

const headingLevels = ['1', '2', '3', '4'] as const;
const textSizes = ['large', 'standard', 'small', 'xsmall'] as const;
const heading = 'Heading';
const text = 'Text';
const typographicStyles = [
  {
    id: heading.toLowerCase(),
    items: [],
    level: 2,
    slug: heading.toLowerCase(),
    title: heading,
    component: (
      <Wrapper key={heading} heading={heading} id={heading.toLowerCase()}>
        {headingLevels.map(headingLevel => (
          <Stack key={headingLevel} background="infoLight">
            <Heading level={headingLevel}>Heading level {headingLevel}</Heading>
          </Stack>
        ))}
      </Wrapper>
    ),
  },
  {
    id: text.toLowerCase(),
    items: [],
    level: 2,
    slug: text.toLowerCase(),
    title: text,
    component: (
      <Wrapper key={text} heading={text} id={text.toLowerCase()}>
        {textSizes.map(textSize => (
          <Stack key={textSize} background="infoLight">
            <Text size={textSize} weight="regular">
              Text {textSize} regular
            </Text>
          </Stack>
        ))}
      </Wrapper>
    ),
  },
];

function Wrapper({
  children,
  heading,
  id,
}: {
  children: ReactNode;
  heading: string;
  id: string;
}) {
  return (
    <Stack gap="large">
      <Heading id={id} level="2">
        {heading}
      </Heading>
      {children}
    </Stack>
  );
}
