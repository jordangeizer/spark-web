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
      id: 'foreground',
      colors: theme.color.foreground,
      items: [],
      level: 2,
      slug: 'foreground',
      title: 'Foreground',
    },
    {
      id: 'background',
      colors: theme.color.background,
      items: [],
      level: 2,
      slug: 'background',
      title: 'Background',
    },
    {
      id: 'border',
      colors: theme.border.color,
      items: [],
      level: 2,
      slug: 'border',
      title: 'Border',
    },
    {
      id: 'background-interactions',
      colors: theme.backgroundInteractions,
      items: [],
      level: 2,
      slug: 'background-interactions',
      title: 'Background Interactions',
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
          {colors.map(({ colors, slug, title }) => (
            <Stack key={slug} gap="xlarge">
              <Heading id={slug} level="2">
                {title}
              </Heading>
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
