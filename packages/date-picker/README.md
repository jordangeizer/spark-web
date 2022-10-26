---
title: DatePicker
storybookPath: forms-date-picker
isExperimentalPackage: true
---

The `DatePicker` component allows users to either manually enter a date in
`dd/MM/yyyy` format or use the calendar button to render a month view that users
can pick from. Clicking on a date will fill in the input for that date in the
correct format.

## Example

```jsx live
const [value, setValue] = React.useState();

return (
  <Field label="Select date">
    <DatePicker value={value} onChange={setValue} />
  </Field>
);
```

## Props

<PropsTable displayName="DatePicker" />

The component passes props into its underlying [TextInput](/package/text-input)
component and are not listed here.
