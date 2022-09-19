---
title: Text List
storybookPath: data-display-textlist--default
isExperimentalPackage: false
---

List semantics are handled automatically, including the use of ordered lists
where appropriate.

```jsx live
<Columns gap="large">
  <TextList>
    <Text>Bullet</Text>
    <Text>Bullet</Text>
    <Text>Bullet</Text>
  </TextList>
  <TextList type="number">
    <Text>Number</Text>
    <Text>Number</Text>
    <Text>Number</Text>
  </TextList>
  <TextList icon={<CheckCircleIcon size="xxsmall" />}>
    <Text>Icon</Text>
    <Text>Icon</Text>
    <Text>Icon</Text>
  </TextList>
</Columns>
```

## Examples

### Color, size and gap

Lists support the same sizes and colors as [Text](/package/text), and the same
gap as [Stack](/package/stack).

```jsx live
<Columns gap="large">
  <TextList tone="muted" size="large" gap="large">
    <Text>Large</Text>
    <Text>Large</Text>
    <Text>Large</Text>
  </TextList>
  <TextList tone="muted" size="standard" gap="medium">
    <Text>Standard</Text>
    <Text>Standard</Text>
    <Text>Standard</Text>
  </TextList>
  <TextList tone="muted" size="small" gap="small">
    <Text>Small</Text>
    <Text>Small</Text>
    <Text>Small</Text>
  </TextList>
</Columns>
```

### Rich content

Use the [Stack](/package/stack) as a list item to display multiple lines of
text.

```jsx live
<TextList gap="large">
  <Stack gap="medium">
    <Text weight="semibold">This is a paragraph.</Text>
    <Text>This is another paragraph.</Text>
  </Stack>
  <Stack gap="medium">
    <Text weight="semibold">This is a paragraph.</Text>
    <Text>This is another paragraph.</Text>
  </Stack>
</TextList>
```

### Nested lists

Lists of varying types can be nested within each other.

```jsx live
<TextList gap="large" type="number">
  <Stack gap="medium">
    <Text>Number list</Text>
    <TextList>
      <Text>Bullet list</Text>
      <Text>Bullet list</Text>
      <Text>Bullet list</Text>
    </TextList>
  </Stack>
  <Stack gap="medium">
    <Text>Number list</Text>
    <TextList>
      <Text>Bullet list</Text>
      <Text>Bullet list</Text>
      <Text>Bullet list</Text>
    </TextList>
  </Stack>
</TextList>
```

## Props

<PropsTable displayName="TextList" />

The `TextList` component also passes extra props into the component's nested
[`Stack`](/package/stack) component.

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
[stack-props]: /package/stack
[text-props]: /package/text
