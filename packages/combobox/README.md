---
title: Combobox
storybookPath: forms-combobox--default
isExperimentalPackage: true
---

The `Combobox` allows the user to browse, search, and make a single selection
from a large list of values.

## Usage

### Controlled component

```jsx live
const [value, setValue] = React.useState(null);

return (
  <Field label="Who's your favourite Adventure Time character?">
    <Combobox
      placeholder="Select a character"
      items={[
        { label: 'Jake', value: 'jake' },
        { label: 'Finn', value: 'finn' },
        { label: 'BMO', value: 'bmo' },
      ]}
      onChange={value => setValue(value)}
      value={value}
    />
  </Field>
);
```

### Uncontrolled component

```jsx live
<Field label="Who's your favourite Adventure Time character?">
  <Combobox
    placeholder="Select a character"
    items={[
      { label: 'Jake', value: 'jake' },
      { label: 'Finn', value: 'finn' },
      { label: 'BMO', value: 'bmo' },
    ]}
  />
</Field>
```

### Async

```jsx live
const [items, setItems] = React.useState([]);
const [value, setValue] = React.useState(null);

const fetchItems = async input => {
  if (!input) return [];
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [{ label: input, value: input }];
};

return (
  <Field label="Search the interwebs">
    <Combobox
      placeholder="Start typing..."
      items={items}
      onChange={value => setValue(value)}
      onInputChange={input => setItems(fetchItems(input))}
      value={value}
    />
  </Field>
);
```

## Custom label and value

```jsx live
const [value, setValue] = React.useState(null);

return (
  <Field
    label="What's your favourite movie?"
    message={JSON.stringify(value ?? {})}
  >
    <Combobox
      placeholder="Select a movie"
      items={[
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
      ]}
      onChange={value => setValue(value)}
      value={value}
      getOptionLabel={option => option.title}
      getOptionValue={option => `${option.year}`}
    />
  </Field>
);
```

## Grouped

```jsx live
<Field label="Who's your favourite character?">
  <Combobox
    placeholder="Select a character"
    items={[
      {
        label: 'Futurama',
        options: [
          { label: 'Fry', value: 'fry' },
          { label: 'Leela', value: 'leela' },
          { label: 'Bender', value: 'bender' },
          { label: 'Zoidberg', value: 'zoidberg' },
        ],
      },
      {
        label: 'South Park',
        options: [
          { label: 'Stan', value: 'stan' },
          { label: 'Kyle', value: 'kyle' },
          { label: 'Cartman', value: 'cartman' },
          { label: 'Kenny', value: 'kenny' },
        ],
      },
    ]}
  />
</Field>
```

## Appearance

### Disabled

```jsx live
<Field label="Who's your favourite Adventure Time character?" disabled>
  <Combobox
    placeholder="Select a character"
    items={[
      { label: 'Jake', value: 'jake' },
      { label: 'Finn', value: 'finn' },
      { label: 'BMO', value: 'bmo' },
    ]}
  />
</Field>
```

### Invalid

```jsx live
<Field
  label="Who's your favourite Adventure Time character?"
  tone="critical"
  message="Required"
>
  <Combobox
    placeholder="Select a character"
    items={[
      { label: 'Jake', value: 'jake' },
      { label: 'Finn', value: 'finn' },
      { label: 'BMO', value: 'bmo' },
    ]}
  />
</Field>
```

## Props

<PropsTable displayName="Combobox" />

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
