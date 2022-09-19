---
title: Spinner
storybookPath: feedback-overlays-spinner--default
isExperimentalPackage: true
---

Spinner indicates to users that their request is in progress. In most cases
[you should use the `loading` prop on a Button instead of using this component directly](/package/button#loading).

## Examples

### Tones

The appearance of Spinner can be customised with the tone prop.

Defaults to `primary`.

```jsx live
const tones = ['secondary', 'critical', 'positive', 'neutral'];

return (
  <Stack align="left" gap="large">
    <Inline gap="large">
      {tones.map(tone => (
        <Spinner key={tone} tone={tone} />
      ))}
    </Inline>
  </Stack>
);
```

```jsx live
const backgrounds = [
  // Light
  ['surface', 'positiveLight', 'infoLight', 'cautionLight', 'criticalLight'],
  // Dark
  ['muted', 'positive', 'info', 'caution', 'critical'],
];

return (
  <Stack gap="large">
    {backgrounds.map((backgroundLightness, index) => (
      <Inline key={index} gap="large">
        {backgroundLightness.map(background => (
          <Box
            key={background}
            background={background}
            shadow="medium"
            height="medium"
            width="medium"
            display="flex"
            flexShrink={0}
            alignItems="center"
            justifyContent="center"
          >
            <Spinner />
          </Box>
        ))}
      </Inline>
    ))}
  </Stack>
);
```

## Size

Spinners available in two size: `xxsmall` and `xsmall`.

Defaults to `xsmall`.

```jsx live
<Row gap="large">
  <Spinner size="xxsmall" />
  <Spinner size="xsmall" />
</Row>
```

## Props

### Spinner

<PropsTable displayName="Spinner" />

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
