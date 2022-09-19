---
title: Badge
isExperimentalPackage: true
---

A badge is a decorative indicator used to either call attention to an item or
for communicating non-actionable, supplemental information.

## Example

```jsx live
<Badge tone="info">Label</Badge>
```

### Tones

```jsx live
const tones = ['accent', 'caution', 'critical', 'info', 'neutral'];

return (
  <Inline gap="small">
    {tones.map(tone => (
      <Badge key={tone} tone={tone}>
        {tone}
      </Badge>
    ))}
  </Inline>
);
```

## Props

### Badge

<PropsTable displayName="Badge" />

### IndicatorDot

<PropsTable displayName="IndicatorDot" />

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
