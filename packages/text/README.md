---
title: Text
storybookPath: typography-text--default
isExperimentalPackage: false
---

Constrained, purposeful text styles as a component.

## Examples

```jsx live
const textSizes = ['large', 'standard', 'small', 'xsmall'];

return (
  <Columns collapseBelow="tablet" gap="xlarge">
    <Stack gap="large">
      {textSizes.map(textSize => (
        <Text key={textSize} size={textSize} weight="regular">
          Text {textSize} regular
        </Text>
      ))}
    </Stack>
    <Stack gap="large">
      {textSizes.map(textSize => (
        <Text key={textSize} size={textSize} weight="semibold">
          Text {textSize} regular
        </Text>
      ))}
    </Stack>
  </Columns>
);
```

### Align

Text can be aligned with the `align` prop.

```jsx live
<Stack gap="large" dividers>
  <Text align="left">Left (default)</Text>
  <Text align="center">Center</Text>
  <Text align="right">Right</Text>
</Stack>
```

### Overflow strategy

Use the `overflowStrategy` prop to manage how `Text` behaves with regard to
overflow.

```jsx live
const overflowStrategies = ['truncate', 'nowrap', 'breakword'];

return (
  <Stack gap="large" style={{ width: 200 }}>
    <Stack gap="small">
      <Text weight="semibold">Default</Text>
      <Text>The quick brown fox jumps over the lazy dog.</Text>
    </Stack>
    {overflowStrategies.map(overflowStrategy => (
      <Stack key={overflowStrategy} gap="small">
        <Text weight="semibold">{overflowStrategy}</Text>
        <Text overflowStrategy={overflowStrategy}>
          The quick brown fox jumps over the lazy dog.
        </Text>
      </Stack>
    ))}
  </Stack>
);
```

### Tone

The foreground colour of text can be set by applying a `tone`. In addition to
the foundation tones, “muted” provides a way to de-emphasise text.

```jsx live
const textTones = [
  'neutral', // Default
  'accent',
  'caution',
  'critical',
  'disabled',
  'fieldAccent',
  'info',
  'link',
  'muted',
  'placeholder',
  'positive',
  'primary',
  'primaryActive',
  'primaryHover',
  'secondary',
  'secondaryActive',
  'secondaryHover',
];

return (
  <Columns collapseBelow="tablet" gap="large" template={[1, 1]}>
    {textTones.map(tone => (
      <Text key={tone} tone={tone}>
        {tone}
      </Text>
    ))}
  </Columns>
);
```

### Weight

Text is available in two weight: `regular` and `semibold`.

```jsx live
<Inline gap="small">
  <Text weight="regular">Regular</Text>
  <Text weight="semibold">Semibold</Text>
</Inline>
```

### Contrast

To ensure text has sufficient contrast, when on a dark background the foreground
tones “neutral” and “muted” will be inverted.

```jsx live
<Inline gap="large">
  <Box background="neutral" padding="small" borderRadius="small">
    <Text>neutral</Text>
  </Box>
  <Box background="neutral" padding="small" borderRadius="small">
    <Text tone="muted">muted</Text>
  </Box>
</Inline>
```

## Props

<PropsTable displayName="Text" />

Extra props are also passed into the underlying [`Box`](/package/box) component.

[brighte-theme]:
  https://github.com/brighte-labs/spark-web/blob/e503bea4f7668d187ec7a78f99c5ed374417588b/packages/theme/src/makeTheme.ts#L158
[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
