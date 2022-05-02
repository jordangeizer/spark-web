---
title: Text Input
storybookPath: forms-textinput--default
---

Text input provides a way for inputting text. The component must be nested
within a [`Field`](/package/field). See [`Field`](/package/field) for more
details.

```jsx live
<Field label="Label">
  <TextInput />
</Field>
```

## Props

| Prop         | Type                                                                      | Default | Description                                                                                  |
| ------------ | ------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------- |
| data?        | [DataAttributeMap][data-attribute-map]                                    |         | Sets data attributes for the component.                                                      |
| type?        | 'text' \| 'password' \| 'email' \| 'search' \| 'number' \| 'tel' \| 'url' | 'text'  | Sets the type attribute for the component.                                                   |
| onBlur?      | React.FocusEventHandler\<HTMLInputElement>                                |         | Callback function when input field component loses focuses.                                  |
| onFocus?     | React.FocusEventHandler\<HTMLInputElement>                                |         | Callback function when the input field component is in focus.                                |
| onChange?    | React.FormEventHandler\<HTMLInputElement>                                 |         | Callback function when value of the input field has been changed.                            |
| placeholder? | string                                                                    |         | Specifies a short hint that describes the expected value (type of value) of the input field. |
| value?       | string \| number \| readonly string[]                                     |         | Specifies the value of the input field.                                                      |

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
