---
title: Heading
storybookPath: typography-heading--default
isExperimentalPackage: false
---

Constrained, purposeful heading styles as a component.

```jsx live
const headingLevels = ['1', '2', '3', '4'];

return (
  <Columns collapseBelow="tablet" gap="xlarge">
    <Stack gap="large">
      {headingLevels.map(headingLevel => (
        <Heading key={headingLevel} level={headingLevel} tone="neutral">
          Heading level {headingLevel}
        </Heading>
      ))}
    </Stack>
    <Stack gap="large">
      {headingLevels.map(headingLevel => (
        <Heading key={headingLevel} level={headingLevel} tone="primary">
          Heading level {headingLevel}
        </Heading>
      ))}
    </Stack>
  </Columns>
);
```

## Example

### Alignment

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

### Truncation

Truncate text to a single line using the `truncate` prop. Useful for displaying
user-generated content that may not fit within your layout.

```jsx live
<Stack gap="large" style={{ width: 200 }}>
  <Heading level="3" truncate>
    The quick brown fox jumps over the lazy
  </Heading>
</Stack>
```

### Contrast

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

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
