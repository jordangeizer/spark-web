---
title: Accordion
storybookPath: data-display-accordion--single
isExperimentalPackage: true
---

Accordions are a set of vertically stacked headings which can be toggled to
reveal some associated section of content.

## Example

```jsx live
<Accordion type="single" collapsible>
  <AccordionItem value="item-1" label="What is this?" level="4">
    <Text>This is an example accordion</Text>
  </AccordionItem>
  <AccordionItem value="item-2" label="Should I click this?" level="4">
    <Text>Yes</Text>
  </AccordionItem>
  <AccordionItem value="item-3" label="What is in it for me?" level="4">
    <Text>A nice accordion</Text>
  </AccordionItem>
</Accordion>
```

## Props

### Accordion

The root of the accordion block containing all parts of the accordion.

<PropsTable displayName="Accordion" />

Additional `div` props are passed to the primitive
[radix accordion root](https://www.radix-ui.com/docs/primitives/components/accordion#root)
component and are not listed.

### AccordionItem

An accordion item section containing heading and collapsible content.

<PropsTable displayName="AccordionItem" />

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
