---
title: Heading
storybookPath: typography-heading--default
isExperimentalPackage: false
---

Constrained, purposeful heading styles as a component.

## Level

Controls the size of the heading and maps to the appropriate heading element
(`h1`, `h2`, `h3` or `h4`). The rendered element can be overridden with the `as`
prop.

```jsx live
const headingLevels = ['1', '2', '3', '4'];

return (
  <Stack gap="large">
    {headingLevels.map(headingLevel => (
      <Heading key={headingLevel} as="h4" level={headingLevel} tone="neutral">
        Heading level {headingLevel}
      </Heading>
    ))}
  </Stack>
);
```

## Tone

Headings can be either "neutral" or "primary".

```jsx live
<Stack gap="large">
  <Heading level="1" tone="neutral">
    Heading neutral
  </Heading>
  <Heading level="1" tone="primary">
    Heading primary
  </Heading>
</Stack>
```

## Alignment

Text can be aligned with the `align` prop.

```jsx live
<Stack gap="small" dividers>
  <Heading level="3" align="left">
    Left (default)
  </Heading>
  <Heading level="3" align="center">
    Center
  </Heading>
  <Heading level="3" align="right">
    Right
  </Heading>
</Stack>
```

## Truncation

Truncate text to a single line using the `truncate` prop. Useful for displaying
user-generated content that may not fit within your layout.

```jsx live
<Stack gap="large" style={{ width: 200 }}>
  <Heading level="3" truncate>
    The quick brown fox jumps over the lazy
  </Heading>
</Stack>
```

## Contrast

To ensure headings have sufficient contrast, when on a dark background the
foreground colour is inverted.

```jsx live
<Box background="neutral" padding="large" borderRadius="small">
  <Heading level="3">This Heading is inverted to improve contrast.</Heading>
</Box>
```

## Props

<PropsTable displayName="Heading" />

Extra props are passed into the underlying [`Box`](/package/box) component.
