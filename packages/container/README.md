---
title: Container
storybookPath: page-layout-container--default
isExperimentalPackage: false
---

The container centers and constrains the maximum width of the content it wraps.

```jsx live
<Container size="small">
  <Placeholder height={64} />
</Container>
```

## Examples

### Size

Use the `size` prop to adjust the maximum width of the container.

```jsx live
<Stack gap="large">
  <Container size="xsmall">
    <Placeholder label="xsmall" height={64} />
  </Container>
  <Container size="small">
    <Placeholder label="small" height={64} />
  </Container>
  <Container size="medium">
    <Placeholder label="medium" height={64} />
  </Container>
  <Container size="large">
    <Placeholder label="large" height={64} />
  </Container>
</Stack>
```

## Props

<PropsTable displayName="Container" />

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
[brighte-theme]:
  https://github.com/brighte-labs/spark-web/blob/e503bea4f7668d187ec7a78f99c5ed374417588b/packages/theme/src/makeTheme.ts#L158
