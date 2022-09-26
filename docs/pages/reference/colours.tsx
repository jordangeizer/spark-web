import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { Columns } from '@spark-web/columns';
import { Heading } from '@spark-web/heading';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { isLight, useTheme } from '@spark-web/theme';

import { DocsContent } from '../../components/content';
import { InlineCode } from '../../components/example-helpers';

// Force static page building because we have `getInitialProps` in `_app`
export const getStaticProps = () => ({ props: {} });

export default function ColoursPage() {
  const theme = useTheme();
  const colors = [
    {
      title: 'Foreground',
      description: 'Foreground tones are used for text and icons.',
      id: 'foreground',
      slug: 'foreground',
      level: 2,
      items: [],
      colors: theme.color.foreground,
    },
    {
      title: 'Background',
      description:
        'Background tones are used for all of our background colours (anything from a button up to the entire page.)',
      id: 'background',
      slug: 'background',
      level: 2,
      items: [],
      colors: theme.color.background,
    },
    {
      title: 'Background Interactions',
      description:
        'Background interactions are colours used for indicating hover or active states.',
      id: 'background-interactions',
      slug: 'background-interactions',
      level: 2,
      items: [],
      colors: theme.backgroundInteractions,
    },
    {
      title: 'Border',
      description:
        'Border tones are used for border colours and for the Divider component. These colours tend to have more contrast with the background tones so they stand out.',
      id: 'border',
      slug: 'border',
      level: 2,
      items: [],
      colors: theme.border.color,
    },
    {
      title: 'Status',
      description:
        'Status tones are used to highlight the semantic meaning of a component. A good example of this is the IndicatorDot in our Badge component.',
      id: 'status',
      slug: 'status',
      level: 2,
      items: [],
      colors: theme.color.status,
    },
  ];

  return (
    <DocsContent pageTitle="Colours" includeNavigation toc={colors}>
      <Stack gap="xlarge" dividers>
        <Stack gap="xlarge">
          <Heading level="1">Colours</Heading>
          <Text size="large" tone="muted">
            List of our colour tokens for reference.
          </Text>
        </Stack>

        <Stack gap="large">
          {colors.map(({ colors, slug, title, description }) => (
            <Stack key={slug} gap="xlarge">
              <Heading id={slug} level="2">
                {title}
              </Heading>
              <Text size="large" tone="muted">
                {description}
              </Text>
              <Columns
                gap="large"
                template={[1, 1, 1, 1]}
                collapseBelow="desktop"
              >
                {Object.entries(colors).map(([key, value]) => (
                  <Stack gap="small" key={key}>
                    <Text
                      overflowStrategy="truncate"
                      size="small"
                      weight="semibold"
                    >
                      {key}
                    </Text>
                    <Swatch backgroundColor={value} />
                    <Text weight="semibold">
                      <InlineCode>{value}</InlineCode>
                    </Text>
                    <Spacer />
                  </Stack>
                ))}
              </Columns>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </DocsContent>
  );
}

function Swatch({ backgroundColor }: { backgroundColor: string }) {
  const theme = useTheme();
  const foregroundColor = isLight(backgroundColor)
    ? theme.color.foreground.neutral
    : theme.color.foreground.neutralInverted;

  return (
    <Box
      height="large"
      className={css({
        background: backgroundColor,
        color: foregroundColor,
        minWidth: theme.sizing.large,
      })}
    />
  );
}

function Spacer() {
  return <Box aria-hidden="true" height="xxsmall" />;
}
