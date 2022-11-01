---
title: Theme
isExperimentalPackage: true
---

🚧 — Under construction

The theme packages exports a set of objects and utilities that are used
internally to create Spark Web components as well as for consumers to be able to
override

## useTheme

The `useTheme` hook returns an object with our theme tokens along with a set of
styling utilities.

The theme will always be in the same shape, but the values can be overridden by
[passing in a custom theme to the SparkProvider](/package/core).

Theme tokens differ slightly from the values passed into the provider (or the
defaultTokens if you don't provide a theme) as they are run through the
[decorateTokens](https://github.com/brighte-labs/spark-web/blob/6fc8d1bc37e25d0cd622bc37f68a1d92eb5961b5/packages/theme/src/make-theme.ts#L101)
function which add some extra values that should never change (and therefore
aren't themeable) as well as using
[Capsize](https://seek-oss.github.io/capsize/) to add tokens we need to trim
space above capital letters and below the baseline so spacing between elements
is consistent and doesn't vary depending on line-height, font-size etc.

For more documentation about our tokens, please see the
[tokens reference page](/reference/tokens).

#### mapResponsiveProp

Returns either the string value of the token provided to it, or an array which
maps to [our breakpoints](/reference/tokens#breakpoint) (where index 0 refers to
the mobile breakpoint, 1 is the tablet breakpoint and so on).

### Theme utils

#### mapResponsiveScale

Helper for mapping keys/breakpoint map to a theme scale e.g.

```jsx
mapResponsiveProp('small', { small: 8, large: 16 }); // 8
mapResponsiveProp(
  { mobile: 'small', tablet: 'large' },
  { small: 8, medium: 12, large: 16 }
); // [8, 16]
```

#### optimizeResponsiveArray

TODO

#### responsiveRange

Designed to be used alongside `optimizeResponsiveArray`.

#### responsiveStyles

TODO

#### resolveResponsiveProps

TODO

## defaultTokens

This is the default tokens for the Brighte theme _before_ they've been
decorated.

## makeBrighteTheme

This function

- decorates to passed in tokens
- decorates them
- works out if the background tokens are dark or light
- adds the [theme utils](#theme-utils)

Pass the result of this function into the
[SparkProvider](/package/core#sparkprovider) if you want to override the default
theme.
