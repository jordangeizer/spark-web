---
title: Utilities
isExperimentalPackage: true
---

🚧 — Under construction

## forwardRefWithAs

A best effort attempt to provide strongly typed polymorphic components that (as
the name suggests) forwards the ref onto the underlying element.

Internally this is used for our layout primitives (`Box`, `Columns`,
`Container`, `Hidden`, `Inline`, `Row` and `Stack`), our link components
(`Link`, `ButtonLink` and `TextLink`), our typographic components (`Heading` and
`Text`) and finally `VisuallyHidden`.

```jsx
export const PolymorphicComponent = forwardRefWithAs<
  'div',
  PolymorphicComponentProps
>(({ as: Tag = 'div', ...consumerProps }, forwardedRef) => {
  return (
    <Tag
      {...consumerProps}
      ref={forwardedRef}
      // Custom props go here
    />
  );
});
```
