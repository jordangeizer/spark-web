---
title: Fieldset
storybookPath: forms-fieldset--default
isExperimentalPackage: true
---

Use the `Fieldset` to group thematically related controls in a form.

```jsx live
<Fieldset legend="Billing address">
  <Stack gap="small">
    <Field label="Street">
      <TextInput />
    </Field>
    <Field label="City">
      <TextInput />
    </Field>
    <Field label="State">
      <Select
        onChange={() => {}}
        options={[
          { label: 'New South Wales', value: 'NSW' },
          { label: 'Victoria', value: 'VIC' },
          { label: 'Queensland', value: 'QLD' },
          { label: 'South Australia', value: 'SA' },
          { label: 'Western Australia', value: 'WA' },
          { label: 'Tasmania', value: 'TAS' },
          { label: 'Northern Territory', value: 'NT' },
          { label: 'Australian Capital Territory', value: 'ACT' },
        ]}
      />
    </Field>
    <Field label="Postcode">
      <TextInput />
    </Field>
  </Stack>
</Fieldset>
```

## Example

### Legend

Provide a caption that describes the set of form fields.

```jsx live
<Fieldset legend="Name">
  <Columns gap="small">
    <Field label="First" labelVisibility="hidden">
      <TextInput placeholder="e.g. Jane" />
    </Field>
    <Field label="Last" labelVisibility="hidden">
      <TextInput placeholder="e.g. Smith" />
    </Field>
  </Columns>
</Fieldset>
```

## Props

<PropsTable displayName="Fieldset" />

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
