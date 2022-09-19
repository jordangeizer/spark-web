---
title: Accessibility
storybookPath: accessibility-visuallyhidden--default
isExperimentalPackage: false
---

The components in this library have been implemented with accessibility built
in. This package aims to provide helpers for other occasions.

## Emoji

Emojis can add playfulness to your interface, but require formatting to ensure
that they are accessible for all users.

The `Emoji` component wraps the provided symbol, defining it as an image. The
provided label will be announced by a screen reader. If no label is provided,
the emoji is assumed to be a decorative element with no semantic meaning and is
hidden from assistive technology.

```jsx live
<Inline gap="large">
  <Emoji symbol="🎉" label="Hooray!" />
  <Emoji symbol="🎉" />
</Inline>
```

## VisuallyHidden

Content which should be visually hidden, but remain accessible to assistive
technologies such as screen readers, can be implemented using the
`VisuallyHidden` component.

This can be useful in situations where additional visual information or cues
(such as meaning denoted through the use of icons or colour) need to also be
conveyed to non-visual users.

```jsx live
<Inline gap="xsmall" alignY="center">
  <ExclamationCircleIcon tone="critical" size="xsmall" />
  <Text weight="semibold" tone="critical" baseline={false}>
    <VisuallyHidden>Danger: </VisuallyHidden>
    This action is not reversible
  </Text>
</Inline>
```

### Props

### Emoji Props

<PropsTable displayName="Emoji" />

### VisuallyHidden Props

<PropsTable displayName="VisuallyHidden" />

Additional props are passed to the `span` element and are not listed.

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
