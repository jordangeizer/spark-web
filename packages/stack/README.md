---
title: Stack
storybookPath: page-layout-stack--default
isExperimentalPackage: false
---

Used to distribute children vertically, with even spacing between each child.

```jsx live
<Stack gap="large">
  <Placeholder />
  <Placeholder />
  <Placeholder />
</Stack>
```

## Examples

### Gap

The spacing between children can be adjusted using the `gap` prop.

```jsx live
<Columns gap="xxlarge">
  <Stack gap="small">
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Stack>
  <Stack gap="medium">
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Stack>
  <Stack gap="large">
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Stack>
  <Stack gap="xlarge">
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Stack>
</Columns>
```

### Horizontal alignment

Items can be aligned horizontally using the `align` prop.

```jsx live
<Stack gap="medium" dividers>
  <Stack gap="small" align="left">
    <Placeholder />
    <Placeholder label="left" width={128} />
    <Placeholder />
  </Stack>
  <Stack gap="small" align="center">
    <Placeholder />
    <Placeholder label="center" width={128} />
    <Placeholder />
  </Stack>
  <Stack gap="small" align="right">
    <Placeholder />
    <Placeholder label="right" width={128} />
    <Placeholder />
  </Stack>
</Stack>
```

### Dividers

Use the `dividers` property to render a [Divider](/package/divider) between each
element in the Stack.

```jsx live
<Stack gap="medium" dividers>
  <Text>First item</Text>
  <Text>Second item</Text>
  <Text>Third item</Text>
</Stack>
```

### Nesting

Nest Stack components to create more complex white space rules.

```jsx live
<Stack gap="xlarge">
  <Heading level="4">Heading</Heading>
  <Stack gap="small">
    <Text>Line 1</Text>
    <Text>Line 2</Text>
    <Text>Line 3</Text>
  </Stack>
  <Stack gap="small">
    <Text>Line 1</Text>
    <Text>Line 2</Text>
    <Text>Line 3</Text>
  </Stack>
</Stack>
```

## Props

<PropsTable displayName="Stack" />

`Stack` props also include [`Box`](/package/box) props and are not listed here
(excludes `display`, `className`, `alignItems`, `flexDirection`,
`justifyContent` and `flexWrap`).

Extra props are also passed into the underlying [`Box`](/package/box) component.

[align]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/stack/src/Stack.tsx#L24
[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
