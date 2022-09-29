import type {
  BoxProps,
  BrighteTheme,
  ContainerProps,
  DividerProps,
  HeadingProps,
  RowProps,
  StackProps,
  TextProps,
} from '@spark-web/design-system';
import {
  Box,
  Columns,
  Container,
  Divider,
  Emoji,
  Heading,
  Inline,
  Row,
  Stack,
  Text,
  TextLink,
  useTheme,
} from '@spark-web/design-system';
import dedent from 'dedent';
import type { ReactNode } from 'react';
import { createElement } from 'react';

import { DocsContent } from '../../components/content';
import { InlineCode } from '../../components/example-helpers';
import { CodeBlock } from '../../components/mdx-components/code-block';

// Force static page building because we have `getInitialProps` in `_app`
export const getStaticProps = async () => ({
  props: {},
});

export default function TokensPage() {
  const theme = useTheme();
  const themeTokens = [
    {
      title: 'Animations',
      id: 'animation',
      slug: 'animation',
      docs: Animations,
      items: [
        {
          title: 'Animation Duration',
          id: 'animation-duration',
          slug: 'animation-duration',
          docs: AnimationDuration,
          items: [],
          level: 3,
        },
        {
          title: 'Animation Easing',
          id: 'animation-easing',
          slug: 'animation-easing',
          docs: AnimationEasing,
          items: [],
          level: 3,
        },
      ],
      level: 2,
    },
    {
      title: 'Breakpoints',
      id: 'breakpoint',
      slug: 'breakpoint',
      docs: Breakpoints,
      level: 2,
      items: [],
    },
    {
      title: 'Border',
      id: 'border',
      slug: 'border',
      docs: Border,
      level: 2,
      items: [
        {
          title: 'Border Radii',
          id: 'border-radius',
          slug: 'border-radius',
          docs: BorderRadius,
          items: [],
          level: 3,
        },
        {
          title: 'Border Widths',
          id: 'border-width',
          slug: 'border-width',
          docs: BorderWidth,
          items: [],
          level: 3,
        },
        {
          title: 'Border Colors',
          id: 'border-color',
          slug: 'border-color',
          docs: BorderColors,
          items: [],
          level: 3,
        },
      ],
    },
    {
      title: 'Colors',
      id: 'colors',
      slug: 'colors',
      docs: Colors,
      items: [
        {
          title: 'Foreground',
          id: 'foreground',
          slug: 'foreground',
          docs: ForegroundTones,
          items: [],
          level: 3,
        },
        {
          title: 'Background',
          id: 'background',
          slug: 'background',
          docs: BackgroundTones,
          items: [],
          level: 3,
        },
        {
          title: 'Status',
          id: 'status',
          slug: 'status',
          docs: StatusTones,
          items: [],
          level: 3,
        },
      ],
      level: 2,
    },
    {
      title: 'Background Interactions',
      id: 'background-interactions',
      slug: 'background-interactions',
      docs: BackgroundInteractions,
      items: [],
      level: 2,
    },
    {
      title: 'Background Lightness',
      id: 'background-lightness',
      slug: 'background-lightness',
      docs: BackgroundLightness,
      items: [],
      level: 2,
    },
    {
      title: 'Content Widths',
      id: 'content-width',
      slug: 'content-width',
      docs: ContentWidths,
      items: [],
      level: 2,
    },
    {
      title: 'Elevation',
      id: 'elevation',
      slug: 'elevation',
      docs: Elevation,
      items: [],
      level: 2,
    },
    {
      title: 'Shadow',
      id: 'shadow',
      slug: 'shadow',
      docs: Shadow,
      items: [],
      level: 2,
    },
    {
      title: 'Spacing',
      id: 'spacing',
      slug: 'spacing',
      docs: Spacing,
      items: [],
      level: 2,
    },
    {
      title: 'Sizing',
      id: 'sizing',
      slug: 'sizing',
      docs: Sizing,
      items: [],
      level: 2,
    },
    {
      title: 'Typography',
      id: 'typography',
      slug: 'typography',
      docs: Typography,
      items: [
        {
          title: 'Font Family',
          id: 'font-family',
          slug: 'font-family',
          docs: FontFamily,
          items: [],
          level: 3,
        },
        {
          title: 'Font Weight',
          id: 'font-weight',
          slug: 'font-weight',
          docs: FontWeight,
          items: [],
          level: 3,
        },
        {
          title: 'Heading',
          id: 'heading',
          slug: 'heading',
          docs: HeadingTokens,
          items: [],
          level: 3,
        },
        {
          title: 'Text',
          id: 'text',
          slug: 'text',
          docs: TextTokens,
          items: [],
          level: 2,
        },
      ],
      level: 2,
    },
    {
      title: 'Utils',
      id: 'utils',
      slug: 'utils',
      docs: Utils,
      items: [],
      level: 2,
    },
    {
      title: 'All Tokens',
      id: 'all-tokens',
      slug: 'all-tokens',
      docs: AllTokens,
      items: [],
      level: 2,
    },
  ];

  return (
    <DocsContent pageTitle="Tokens" includeNavigation toc={themeTokens}>
      <Stack gap="xlarge" dividers>
        <Stack gap="xlarge">
          <Heading level="1">Tokens</Heading>
          <Lead>List of our theme tokens for reference.</Lead>
        </Stack>
        {themeTokens.map(token => {
          return (
            <Stack key={token.id} gap="xlarge">
              {createElement(token.docs, {
                id: token.id,
                headingLevel: '2',
                title: token.title,
                theme,
              })}
              {token.items.map(item =>
                createElement(item.docs, {
                  id: item.id,
                  headingLevel: '3',
                  title: item.title,
                  theme,
                })
              )}
            </Stack>
          );
        })}
      </Stack>
    </DocsContent>
  );
}

type DocProps = {
  id: string;
  headingLevel?: '2' | '3';
  title: string;
  theme: BrighteTheme;
};

function DocsWrapper({
  id,
  headingLevel = '2',
  title,
  children = null,
}: DocProps & { children?: ReactNode }) {
  return (
    <Stack gap="xlarge">
      <Heading id={id} level={headingLevel}>
        {title}
      </Heading>
      {children}
    </Stack>
  );
}

function Animations(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        The animation key in our theme is used to define our durations and
        easings. These are used for things like smoothly transitioning the
        background colour of a button on hover/press.
      </Lead>
    </DocsWrapper>
  );
}

function AnimationDuration(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        The number of milliseconds the animation should take to complete.
      </Lead>
      <Inline gap="large">
        {Object.entries(props.theme.animation).map(([key, value]) => (
          <Row key={key} gap="medium">
            <Text as="h3" weight="semibold">
              {key}
            </Text>
            <Text>{value.duration}</Text>
          </Row>
        ))}
      </Inline>
    </DocsWrapper>
  );
}

function AnimationEasing(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        The{' '}
        <TextLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function">
          easing function
        </TextLink>{' '}
        that should be used for the animation.
      </Lead>
      <Inline gap="large">
        {Object.entries(props.theme.animation).map(([key, value]) => (
          <Row key={key} gap="medium">
            <Text as="h3" weight="semibold">
              {key}
            </Text>
            <Text>{value.easing}</Text>
          </Row>
        ))}
      </Inline>
    </DocsWrapper>
  );
}

function Breakpoints(props: DocProps) {
  const items = [1, 2, 3];

  return (
    <DocsWrapper {...props}>
      <Lead>
        Breakpoint tokens are used for media queries so that we can create
        responsive designs. These tokens are surfaced by our layout primitives
        such as <TextLink href="/package/box">Box</TextLink>,{' '}
        <TextLink href="/package/columns">Columns</TextLink>,{' '}
        <TextLink href="/package/hidden">Hidden</TextLink>,{' '}
        <TextLink href="/package/inline">Inline</TextLink>,{' '}
        <TextLink href="/package/row">Row</TextLink>, and{' '}
        <TextLink href="/package/stack">Stack</TextLink>.
      </Lead>
      <Columns collapseBelow="tablet" gap="large" template={[1, 1, 1, 1]}>
        {Object.entries(props.theme.breakpoint).map(([key, value]) => (
          <Row key={key} gap="medium">
            <Text as="h3" weight="semibold">
              {key}
            </Text>
            <Text>{value}</Text>
          </Row>
        ))}
      </Columns>
      <Box
        background="primaryLow"
        display="inline-flex"
        flexDirection={{
          mobile: 'row',
          tablet: 'column',
          desktop: 'rowReverse',
        }}
        gap={{ mobile: 'small', tablet: 'medium', desktop: 'large' }}
        padding={{ mobile: 'small', tablet: 'medium', desktop: 'large' }}
      >
        {items.map(item => (
          <Row
            key={item}
            align="center"
            alignY="center"
            background="primary"
            height={{ mobile: 'small', tablet: 'medium', desktop: 'large' }}
            width={{ mobile: 'small', tablet: 'medium', desktop: 'large' }}
          >
            <Text weight="semibold">{item}</Text>
          </Row>
        ))}
      </Box>
      <CodeBlock
        code={dedent`
          const items = [1, 2, 3];

          return (
            <Box
              background="primaryLow"
              display="inline-flex"
              flexDirection={{
                mobile: 'row',
                tablet: 'column',
                desktop: 'rowReverse',
              }}
              gap={{ mobile: 'small', tablet: 'medium', desktop: 'large' }}
              padding={{ mobile: 'small', tablet: 'medium', desktop: 'large' }}
            >
              {items.map(item => (
                <Row
                  key={item}
                  align="center"
                  alignY="center"
                  background="primary"
                  height={{ mobile: 'small', tablet: 'medium', desktop: 'large' }}
                  width={{ mobile: 'small', tablet: 'medium', desktop: 'large' }}
                >
                  <Text weight="semibold">{item}</Text>
                </Row>
              ))}
            </Box>
          );
        `}
      />
      <Text>
        Resize your browser to see the layout change between different
        breakpoints.
      </Text>
    </DocsWrapper>
  );
}

function Border(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        The border key contains all the tokens related to styling borders as
        well as the <TextLink href="/package/divider">Divider</TextLink>.
      </Lead>
    </DocsWrapper>
  );
}

function BorderRadius(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Stack gap="large" background="primaryLow" padding="large">
        {Object.entries(props.theme.border.radius).map(([key, value]) => (
          <Row
            key={key}
            borderRadius={key as RowProps['borderRadius']}
            height="large"
            background="primary"
            align="center"
            alignY="center"
          >
            <Text weight="semibold">
              {key}: {value}
            </Text>
          </Row>
        ))}
      </Stack>
      <CodeBlock
        code={dedent`
        const theme = useTheme();

        return (
          <Stack gap="large" background="primaryLow" padding="large">
            {Object.entries(theme.border.radius).map(([key, value]) => (
              <Row
                key={key}
                borderRadius={key}
                height="large"
                background="primary"
                align="center"
                alignY="center"
              >
                <Text weight="semibold">
                  {key}: {value}
                </Text>
              </Row>
            ))}
          </Stack>
        );
      `}
      />
    </DocsWrapper>
  );
}

function BorderWidth(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Stack gap="large">
        {Object.entries(props.theme.border.width).map(([key, value]) => (
          <Stack key={key} gap="large" padding="large" background="primaryLow">
            <Row
              border="primary"
              borderWidth={key as keyof RowProps['borderWidth']}
              height="large"
              align="center"
              alignY="center"
            >
              <Text weight="semibold">
                {key}: {value}
              </Text>
            </Row>
            <Divider
              width={key as keyof DividerProps['width']}
              color="primary"
            />
          </Stack>
        ))}
      </Stack>
      <CodeBlock
        code={dedent`
        const theme = useTheme();

        return (
          <Stack gap="large">
            {Object.entries(theme.border.width).map(([key, value]) => (
              <Stack key={key} gap="large" padding="large" background="primaryLow">
                <Row
                  border="primary"
                  borderWidth={key}
                  height="large"
                  align="center"
                  alignY="center"
                >
                  <Text weight="semibold">
                    {key}: {value}
                  </Text>
                </Row>
                <Divider
                  width={key}
                  color="primary"
                />
              </Stack>
            ))}
          </Stack>
        );
      `}
      />
    </DocsWrapper>
  );
}

function BorderColors(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Columns
        gap="large"
        padding="large"
        template={[1, 1]}
        collapseBelow="tablet"
      >
        {Object.entries(props.theme.border.color).map(([key, value]) => (
          <Row
            key={key}
            border={key as keyof RowProps['border']}
            height="large"
            align="center"
            alignY="center"
          >
            <Text weight="semibold">
              {key}: {value}
            </Text>
          </Row>
        ))}
      </Columns>
      <CodeBlock
        code={dedent`
        const theme = useTheme();

        return (
          <Stack gap="large" background="primaryLow" padding="large">
            {Object.entries(props.theme.border.width).map(([key, value]) => (
              <Row
                key={key}
                border="primary"
                borderWidth={key}
                height="large"
                align="center"
                alignY="center"
              >
                <Text weight="semibold">
                  {key}: {value}
                </Text>
              </Row>
            ))}
          </Stack>
        );
      `}
      />
    </DocsWrapper>
  );
}

function Colors(props: DocProps) {
  return <DocsWrapper {...props} />;
}

function ForegroundTones(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        See{' '}
        <TextLink href="/reference/colours#foreground">
          foreground section
        </TextLink>{' '}
        on the colours page for more information.
      </Lead>
    </DocsWrapper>
  );
}

function BackgroundTones(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        See{' '}
        <TextLink href="/reference/colours#background">
          background section
        </TextLink>{' '}
        on the colours page for more information.
      </Lead>
    </DocsWrapper>
  );
}

function StatusTones(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        See <TextLink href="/reference/status">status section</TextLink> on the
        colours page for more information.
      </Lead>
    </DocsWrapper>
  );
}

function BackgroundInteractions(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        See{' '}
        <TextLink href="/reference/colours#background-interactions">
          BackgroundInteractions section
        </TextLink>{' '}
        of colours page for more information.
      </Lead>
    </DocsWrapper>
  );
}

function BackgroundLightness(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        Determines if a background colour is "light" or "dark". Used to
        intelligently choose accessible foreground colours.
      </Lead>
      <Columns
        gap="large"
        padding="large"
        template={[1, 1]}
        collapseBelow="tablet"
      >
        {Object.entries(props.theme.backgroundLightness).map(([key, value]) => (
          <Row
            key={key}
            background={key as RowProps['background']}
            height="large"
            align="center"
            alignY="center"
          >
            <Text weight="semibold">
              {key}: {value}
            </Text>
          </Row>
        ))}
      </Columns>
      <CodeBlock
        code={dedent`
        const theme = useTheme();

        return (
          <Columns
            gap="large"
            padding="large"
            template={[1, 1]}
            collapseBelow="tablet"
          >
            {Object.entries(theme.backgroundLightness).map(([key, value]) => (
              <Row
                key={key}
                background={key}
                height="large"
                align="center"
                alignY="center"
              >
                <Text weight="semibold">
                  {key}: {value}
                </Text>
              </Row>
            ))}
          </Columns>
        );
      `}
      />
    </DocsWrapper>
  );
}

function ContentWidths(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        Content widths are used for constraining the maximum width of section.
        These tokens are surfaced by the{' '}
        <TextLink href="/package/container">Container</TextLink> component.
      </Lead>
      <Stack gap="large" background="primaryLow" padding="large">
        {Object.entries(props.theme.contentWidth).map(([key, value]) => {
          return (
            <Container key={key} size={key as ContainerProps['size']}>
              <Row
                height="large"
                background="primary"
                align="center"
                alignY="center"
                gap="large"
              >
                <Text weight="semibold">
                  {key}: {value}
                </Text>
              </Row>
            </Container>
          );
        })}
      </Stack>
      <CodeBlock
        code={dedent`
        const theme = useTheme();

        return (
          <Stack gap="large" background="primaryLow" padding="large">
            {Object.entries(theme.contentWidth).map(([key, value]) => {
              return (
                <Container key={key} size={key as ContainerProps['size']}>
                  <Row
                    height="large"
                    background="primary"
                    align="center"
                    alignY="center"
                    gap="large"
                  >
                    <Text weight="semibold">
                      {key}: {value}
                    </Text>
                  </Row>
                </Container>
              );
            })}
          </Stack>
        );
        `}
      />
      <Text>
        The example above shows you what all of the container widths are. The
        content of this pages is constrained by one of these containers you
        can't actually see the larger widths, but you get the idea{' '}
        <Emoji label="winking face" symbol="😉" />
      </Text>
    </DocsWrapper>
  );
}

function Elevation(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        Used for controlling the stack order of elements. Exposed by the
        <InlineCode>zIndex</InlineCode> prop on Box and components that extend
        it.
      </Lead>
      <Stack alignSelf="center" paddingTop="large">
        {Object.entries(props.theme.elevation)
          .reverse()
          .map(([key, value]) => (
            <Row
              key={key}
              alignY="center"
              gap="large"
              position="relative"
              zIndex={key as keyof RowProps['zIndex']}
              style={{ marginTop: -props.theme.spacing.large }}
            >
              <Row
                height="large"
                width="large"
                background="primaryLow"
                border="primary"
                borderWidth="large"
                borderRadius="full"
                align="center"
                alignY="center"
              >
                <Text weight="semibold">{value}</Text>
              </Row>
              <Text weight="semibold">{key}</Text>
            </Row>
          ))}
      </Stack>
      <CodeBlock
        code={dedent`
          <Stack alignSelf="center" paddingTop="large">
            {Object.entries(theme.elevation)
              .reverse()
              .map(([key, value]) => (
                <Row
                  key={key}
                  alignY="center"
                  gap="large"
                  position="relative"
                  zIndex={key}
                  style={{ marginTop: -props.theme.spacing.large }}
                >
                  <Row
                    height="large"
                    width="large"
                    background="primaryLow"
                    border="primary"
                    borderWidth="large"
                    borderRadius="full"
                    align="center"
                    alignY="center"
                  >
                    <Text weight="semibold">{value}</Text>
                  </Row>
                  <Text weight="semibold">{key}</Text>
                </Row>
              ))}
          </Stack>
        `}
      />
    </DocsWrapper>
  );
}

function Shadow(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        Controls the box-shadow of elements to simulate elevation. Shadow tokens
        are very subtle and should be used sparingly.
      </Lead>
      <Columns gap="large" template={[1, 1, 1]} collapseBelow="tablet">
        {Object.entries(props.theme.shadow).map(([key, value]) => {
          return (
            <Stack
              key={key}
              gap="large"
              padding="large"
              border="standard"
              borderRadius="medium"
            >
              <Stack gap="medium">
                <Text weight="semibold">{key}:</Text>
                <Text>{value}</Text>
              </Stack>
              <Stack
                gap={key as StackProps['gap']}
                align="center"
                padding="large"
              >
                <Row
                  height="large"
                  width="large"
                  shadow={key as keyof RowProps['shadow']}
                />
              </Stack>
            </Stack>
          );
        })}
      </Columns>
      <CodeBlock
        code={dedent`
          const theme = useTheme();

          return (
            <Columns gap="large" template={[1, 1, 1]} collapseBelow="tablet">
              {Object.entries(theme.shadow).map(([key, value]) => {
                return (
                  <Stack
                    key={key}
                    gap="large"
                    padding="large"
                    border="standard"
                    borderRadius="medium"
                  >
                    <Stack gap="medium">
                      <Text weight="semibold">{key}:</Text>
                      <Text>{value}</Text>
                    </Stack>
                    <Stack
                      gap={key}
                      align="center"
                      padding="large"
                    >
                      <Row
                        height="large"
                        width="large"
                        shadow={key}
                      />
                    </Stack>
                  </Stack>
                );
              })}
            </Columns>
          );
        `}
      />
    </DocsWrapper>
  );
}

function Spacing(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        Spacing tokens are used to distribute space between elements. Exposed by
        <InlineCode>gap</InlineCode>, <InlineCode>margin</InlineCode>, and
        <InlineCode>padding</InlineCode> props on Box and components that extend
        it.
      </Lead>
      <Columns gap="large" template={[1, 1]} collapseBelow="tablet">
        {Object.entries(props.theme.spacing).map(([key, value]) => {
          if (key === 'none') return;
          return (
            <Stack key={key} gap="medium">
              <Heading level="3">
                {key}: {value}
              </Heading>
              <Stack
                gap={key as StackProps['gap']}
                background="primaryLow"
                padding="large"
              >
                <Box height="medium" background="primary" />
                <Box height="medium" background="primary" />
                <Box height="medium" background="primary" />
              </Stack>
            </Stack>
          );
        })}
      </Columns>
      <CodeBlock
        code={dedent`
          const theme = useTheme();

          return (
            <Columns gap="large" template={[1, 1]} collapseBelow="tablet">
              {Object.entries(theme.spacing).map(([key, value]) => {
                if (key === 'none') return;
                return (
                  <Stack key={key} gap="medium">
                    <Heading level="3">
                      {key}: {value}
                    </Heading>
                    <Stack
                      gap={key}
                      background="primaryLow"
                      padding="large"
                    >
                      <Box height="medium" background="primary" />
                      <Box height="medium" background="primary" />
                      <Box height="medium" background="primary" />
                    </Stack>
                  </Stack>
                );
              })}
            </Columns>
          );
        `}
      />
    </DocsWrapper>
  );
}

function Sizing(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        Sizing tokens are used to size elements such as icons, inputs and
        buttons. Maps to the <InlineCode>height</InlineCode> and{' '}
        <InlineCode>width</InlineCode> props on Box and components that extend
        it.
      </Lead>
      <Columns gap="large" template={[1, 1]} collapseBelow="tablet">
        {Object.entries(props.theme.sizing).map(([key, value]) => {
          return (
            <Stack
              key={key}
              gap="medium"
              background="primaryMuted"
              padding="large"
            >
              <Text weight="semibold">
                {key}: {value}
              </Text>
              <Box
                height="medium"
                background="primary"
                width={key as keyof BoxProps['width']}
              />
            </Stack>
          );
        })}
      </Columns>
      <CodeBlock
        code={dedent`
        const theme = useTheme();

        return (
          <Columns gap="large" template={[1, 1]} collapseBelow="tablet">
            {Object.entries(theme.sizing).map(([key, value]) => {
              return (
                <Stack
                  key={key}
                  gap="medium"
                  background="primaryMuted"
                  padding="large"
                >
                  <Text weight="semibold">
                    {key}: {value}
                  </Text>
                  <Box
                    height="medium"
                    background="primary"
                    width={key}
                  />
                </Stack>
              );
            })}
          </Columns>
        );
        `}
      />
    </DocsWrapper>
  );
}

function Typography(props: DocProps) {
  return <DocsWrapper {...props} />;
}

function FontFamily(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        The <InlineCode>fontFamily</InlineCode> key defines font-stack (under
        the "name" key), as well as the font metrics for{' '}
        <TextLink href="https://seek-oss.github.io/capsize/">Capsize</TextLink>{' '}
        to calculate leading trim. Both of the font families ("sans" and
        "display") have the same values. They have been separated so that the
        theme can be overridden to if necessary.
      </Lead>
      <Columns gap="large" template={[1, 1]} collapseBelow="tablet">
        {Object.entries(props.theme.typography.fontFamily).map(
          ([key, value]) => (
            <Stack key={key} gap="large">
              <Text weight="semibold">{key}:</Text>
              <Text>{value.name}</Text>
              <CodeBlock code={JSON.stringify(value.fontMetrics, null, 2)} />
            </Stack>
          )
        )}
      </Columns>
    </DocsWrapper>
  );
}

function FontWeight(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        See <TextLink href="/reference/typography">typography page</TextLink>{' '}
        for more information.
      </Lead>
      <Columns gap="large" template={[1, 1]} collapseBelow="tablet">
        {Object.entries(props.theme.typography.fontWeight).map(
          ([key, value]) => (
            <Stack key={key} gap="large">
              <Text weight={key as keyof TextProps['weight']}>
                {key}: {value}
              </Text>
            </Stack>
          )
        )}
      </Columns>
    </DocsWrapper>
  );
}

function HeadingTokens(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        Heading elements can have responsive sizes. By overriding the
        <InlineCode>fontSize</InlineCode> and <InlineCode>rows</InlineCode>{' '}
        (where "rows" is the number of 4px rows the Heading element should take
        up on a grid) the font sizes can be made to change between the{' '}
        <TextLink href="#breakpoint">mobile and tablet breakpoints</TextLink>.
        The <InlineCode>lineHeight</InlineCode>,
        <InlineCode>capHeight</InlineCode> and <InlineCode>trims</InlineCode>{' '}
        tokens are generated by{' '}
        <TextLink href="https://github.com/seek-oss/capsize#precomputevalues">
          Capsize's precomputeValues
        </TextLink>
        .
      </Lead>
      <Stack gap="large">
        {Object.entries(props.theme.typography.heading.level).map(
          ([key, value]) => (
            <Stack key={key} gap="large">
              <Stack padding="large" background="primaryLow">
                <Heading level={key as HeadingProps['level']}>
                  Heading level: {key}
                </Heading>
              </Stack>
              <Columns gap="large" collapseBelow="tablet">
                <Stack gap="large">
                  <Text weight="semibold">Mobile</Text>
                  <CodeBlock code={JSON.stringify(value.mobile, null, 2)} />
                </Stack>
                <Stack gap="large">
                  <Text weight="semibold">Tablet</Text>
                  <CodeBlock code={JSON.stringify(value.tablet, null, 2)} />
                </Stack>
              </Columns>
            </Stack>
          )
        )}
      </Stack>
    </DocsWrapper>
  );
}

function TextTokens(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        Text elements can have responsive sizes. By overriding the
        <InlineCode>fontSize</InlineCode> and <InlineCode>rows</InlineCode>{' '}
        (where "rows" is the number of 4px rows the Text element should take up
        on a grid) the font sizes can be made to change between the{' '}
        <TextLink href="#breakpoint">mobile and tablet breakpoints</TextLink>.
        The <InlineCode>lineHeight</InlineCode>,
        <InlineCode>capHeight</InlineCode> and <InlineCode>trims</InlineCode>{' '}
        tokens are generated by{' '}
        <TextLink href="https://github.com/seek-oss/capsize#precomputevalues">
          Capsize's precomputeValues
        </TextLink>
        .
      </Lead>
      <Stack gap="large">
        {Object.entries(props.theme.typography.text).map(([key, value]) => (
          <Stack key={key} gap="large">
            <Stack padding="large" background="primaryLow">
              <Text size={key as TextProps['size']} weight="semibold">
                Heading level: {key}
              </Text>
            </Stack>
            <Columns gap="large" collapseBelow="tablet">
              <Stack gap="large">
                <Text weight="semibold">Mobile</Text>
                <CodeBlock code={JSON.stringify(value.mobile, null, 2)} />
              </Stack>
              <Stack gap="large">
                <Text weight="semibold">Tablet</Text>
                <CodeBlock code={JSON.stringify(value.tablet, null, 2)} />
              </Stack>
            </Columns>
          </Stack>
        ))}
      </Stack>
    </DocsWrapper>
  );
}

function Utils(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>
        Along with theme tokens, the theme object also comes with a host of
        useful utilities. These are documented in the{' '}
        <TextLink href="/package/theme">theme package</TextLink> docs.
      </Lead>
    </DocsWrapper>
  );
}

function AllTokens(props: DocProps) {
  return (
    <DocsWrapper {...props}>
      <Lead>Here is the complete list of our tokens for easy reference:</Lead>
      <Stack>
        <CodeBlock code={JSON.stringify(props.theme, null, 2)} />
      </Stack>
    </DocsWrapper>
  );
}

function Lead({ children }: { children: ReactNode }) {
  return (
    <Text size="large" tone="muted">
      {children}
    </Text>
  );
}
