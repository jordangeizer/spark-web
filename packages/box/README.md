---
title: Box
storybookPath: page-layout-box--default
isExperimentalPackage: false
---

The Box component is our lowest-level primitive. The goal of the Box component
is to map props to our tokens so that consumers should be able to use these
props for all of their styling needs. Ideally, you shouldn't need to use the
`className` or `style` prop at all. Internally, all Spark Web components are
composed using the Box component.

Box is a polymorphic component (meaning it will render different elements
depending on what is provided to the `as` prop). If no `as` prop is provided,
Box will render a `div`.

We also spread in consumer props, so any valid HTML attributes are also valid
for Box. Due to some clever TypeScript we can even warn you when you use an
invalid combination of props.

```jsx
<Box as="input" href="https://spark.brighte.com.au" />
```

In the example above, you should see a "red squiggly" under the `href` element
with the following error:

```console
Type '{ as: "input"; href: string; }' is not assignable to type 'IntrinsicAttributes & { as?: "input" | undefined; ref?: Ref<HTMLInputElement> | undefined; } & Omit<Pick<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "key" | keyof InputHTMLAttributes<...>>, "as"> & { ...; } & UnresponsiveBoxProps & ResponsiveBoxProps'.
  Property 'href' does not exist on type 'IntrinsicAttributes & { as?: "input" | undefined; ref?: Ref<HTMLInputElement> | undefined; } & Omit<Pick<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "key" | keyof InputHTMLAttributes<...>>, "as"> & { ...; } & UnresponsiveBoxProps & ResponsiveBoxProps'. Did you mean 'ref'?
```

Unfortunately TypeScript errors can be pretty cryptic sometimes 🙃.

**Pro tip**: copying the error message and pasting it into
[TypeScript Error Translator](https://ts-error-translator.vercel.app/) can
sometimes help make these errors easier to understand.

A minimal CSS reset is also applied to each element rendered with Box. This
helps prevent styles from "leaking" out and effecting other elements (which
should make it easier to incrementally adopt Spark Web into existing projects).
If you provide a non-Spark component to the `as` prop instead of an element, it
is recommended that you also use the `asElement` prop so the appropriate styles
can be applied.

## Examples

### Responsive styles

Most of Box's props accept a string value (usually corresponding to a token), we
also accept an object for responsive styles.

```jsx live
const items = [1, 2, 3];

return (
  <Box
    background="primaryLow"
    display="inline-flex"
    flexDirection={{ mobile: 'row', tablet: 'column', desktop: 'rowReverse' }}
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
        <Text>{item}</Text>
      </Row>
    ))}
  </Box>
);
```

Resize your browser to see the example above change at different breakpoints.

### Backgrounds

Box stores the background in a provider. We can use this to work out what colour
to use by default for text elements.

```jsx live
const backgroundTones = [
  // Light
  ['surface', 'positiveLight', 'infoLight', 'cautionLight', 'criticalLight'],
  // Dark
  ['muted', 'positive', 'info', 'caution', 'critical'],
];

return (
  <Stack gap="large">
    {backgroundTones.map((backgrounds, index) => (
      <Columns
        key={index}
        collapseBelow="tablet"
        gap="large"
        template={[1, 1, 1]}
      >
        {backgrounds.map(background => (
          <Box
            key={background}
            shadow="medium"
            background={background}
            height="large"
            display="flex"
            flexShrink={0}
            alignItems="center"
            justifyContent="center"
          >
            <Text weight="semibold">{background}</Text>
          </Box>
        ))}
      </Columns>
    ))}
  </Stack>
);
```

Notice that the Text in the example above doesn't use the tone prop, the colour
is worked out using the BackgroundProvider in Box.

**Note:** this will only work if you use the `background` prop. If you try to
style the background colour in any other way the Text component will not know
what colour the background is and so cannot invert its colour to make sure that
its contents are readable.

```jsx
<Box style={{ background: 'midnightblue' }} padding="large">
  <Text>Good luck reading this!</Text>
</Box>
```

## Props

<PropsTable displayName="Box" />

By default, Box renders a `div` element. You can customise this via the `as`
prop. Extra props will also be forwarded to the underlying element.
