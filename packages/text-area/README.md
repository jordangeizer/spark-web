---
title: Text Area
storybookPath: forms-textarea--default
isExperimentalPackage: false
---

Allows the user to input plain text spanning multiple lines.

## Usage

### Field

Each text area input must be accompanied by a Field with a label. Effective form
labeling helps inform users the context and information required of the text
area.

## Examples

### Controlled

```jsx live
const [textInput, setTextInput] = React.useState('');

return (
  <Stack gap="large">
    <Field label="Add some text">
      <TextArea
        value={textInput}
        onChange={event => setTextInput(event.target.value)}
      />
    </Field>
    {textInput && (
      <Text>
        You have inputted: “<Strong>{textInput}</Strong>”
      </Text>
    )}
  </Stack>
);
```

### Uncontrolled

```jsx live
const textAreaRef = React.useRef(null);
const [, setKey] = React.useState(0);

return (
  <Stack gap="large">
    <Field label="Add some text">
      <TextArea ref={textAreaRef} placeholder="Add some text" />
    </Field>
    <Button onClick={() => setKey(currentKey => currentKey + 1)}>Submit</Button>
    {textAreaRef.current?.value && (
      <Text>
        You have inputted: “<Strong>{textAreaRef.current.value}</Strong>”
      </Text>
    )}
  </Stack>
);
```

### Disabled

```jsx live
<Stack gap="large">
  <Field label="Disabled" disabled>
    <TextArea placeholder="This textarea is disabled" />
  </Field>
</Stack>
```

### Message and tone

The `message` is used to communicate the status of a field, such as an error
message. This will be announced on focus and can be combined with a `tone` to
illustrate intent. The supported tones are: `critical`, `positive` and
`neutral`.

```jsx live
<Stack gap="large">
  <Field label="Critical" message="Critical message" tone="critical">
    <TextArea placeholder="Critical" />
  </Field>
  <Field label="Positive" message="Positive message" tone="positive">
    <TextArea placeholder="Positive" />
  </Field>
  <Field label="Neutral" message="Neutral message" tone="neutral">
    <TextArea placeholder="Neutral" />
  </Field>
</Stack>
```

## Props

<PropsTable displayName="TextArea" />

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
