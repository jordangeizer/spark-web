---
title: Core
isExperimentalPackage: true
---

🚧 — Under construction

## SparkProvider

The SparkProvider component is a
[Context provider](https://reactjs.org/docs/context.html#contextprovider) to
provide functionality for the following things:

- **A theme provider** allows for overriding the default theme
- **A link component provider** allows for passing in a custom link component
  (created with the `makeLinkComponent` function in `@spark-web/link`) that will
  be using internally by `Link`, `ButtonLink` and `TextLink` (useful for
  creating links that use client-side transitions instead of full page refreshes
  like [next/link](https://nextjs.org/docs/api-reference/next/link)) does. For a
  reference take a look at the source for
  [UniversalNextLink](/package/next-utils#universal-next-link)
- An id provider for generating unique ids. This will be deprecated in a future
  release once the design system has been upgraded to React 18.
- A minimal CSS reset
- Calls `useFocusVisible` which we use to show focus rings when navigating with
  keyboard, but _not_ when using a pointing device (such as a mouse or
  trackpad).

## AesteticoStylesheet

Uses Emotion's `Global` component to set a stylesheet to load the Aestetico font
from Brighte's CDN.
