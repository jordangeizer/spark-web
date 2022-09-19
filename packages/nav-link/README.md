---
title: Nav Link
storybookPath: navigation-navlink--default
isExperimentalPackage: true
---

Nav links are styled links for use in site navigation.

```jsx live
<Stack as="nav" gap="small">
  <NavLink href="#" isSelected>
    <HomeIcon />
    Dashboard
  </NavLink>
  <NavLink href="#">
    <ClipboardListIcon />
    Applications
  </NavLink>
  <NavLink href="#">
    <BriefcaseIcon />
    Leads
  </NavLink>
  <NavLink href="#">
    <AcademicCapIcon />
    Training
  </NavLink>
  <NavLink href="#">
    <ChartSquareBarIcon />
    Analytics
  </NavLink>
  <NavLink href="#">
    <CogIcon />
    Settings
  </NavLink>
</Stack>
```

## Children

Valid children of a `NavLink` are a string, or a string plus an icon. No other
combinations are allowed.

## Border Radius

There are two valid border radii for a `NavLink`: `'small'` and `'full'`.
Typically `'small'` should be used for vertical navigations (like a sidebar) and
`'full'` should be used for horizontal navigations like in a header.

```jsx live
<Stack gap="large">
  <Text weight="semibold">
    Hover or focus to see the different border radius options
  </Text>
  <Stack as="nav" gap="small">
    <NavLink href="#">"Small" border radius nav item</NavLink>
    <NavLink href="#" borderRadius="full">
      "Full" border radius nav item
    </NavLink>
  </Stack>
</Stack>
```

## isSelected

The `isSelected` prop is used to style the currently active page. It is
important that it is only treated as active if the page is current as it also
sets the `aria-current` attribute to `page`.

## Size

`NavLink`s can be either `medium` or `large`.

```jsx live
<Columns gap="small" collapseBelow="desktop">
  <Stack as="nav" gap="small">
    <NavLink href="#">Medium size nav item</NavLink>
    <NavLink href="#" size="large">
      Medium size nav item
    </NavLink>
  </Stack>
  <Stack as="nav" gap="small">
    <NavLink href="#">
      <HomeIcon />
      Large size nav item
    </NavLink>
    <NavLink href="#" size="large">
      <HomeIcon />
      Large size nav item
    </NavLink>
  </Stack>
</Columns>
```

## Inline

By default, the underlying element will be `display: flex` and will take up all
available space. By setting the `inline` prop to `true` the `NavLink` will be
`display: inline-flex` instead.

```jsx live
<Stack gap="small">
  <Box>
    <NavLink href="#">NavLink without inline prop</NavLink>
    <NavLink href="#">NavLink without inline prop</NavLink>
    <NavLink href="#">NavLink without inline prop</NavLink>
  </Box>
  <Divider />
  <Box>
    <NavLink inline href="#">
      NavLink with inline prop
    </NavLink>
    <NavLink inline href="#">
      NavLink with inline prop
    </NavLink>
    <NavLink inline href="#">
      NavLink with inline prop
    </NavLink>
  </Box>
</Stack>
```

## Props

<PropsTable displayName="NavLink" />

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
