import { Box } from '@spark-web/box';
import type {
  ReactElement } from 'react';
import {
  Children,
  isValidElement
} from 'react';

import type { InputAdornmentProps } from './InputAdornment';

// NOTE: `null | undefined` allow consumers to conditionally render adornments
export type AdornmentChild =
  | ReactElement<InputAdornmentProps>
  | null
  | undefined;
export type AdornmentsAsChildren =
  | AdornmentChild
  | [AdornmentChild, AdornmentChild];

/**
 * The adornment placeholder provides the default horizontal gutter for the
 * input, when no adornment for that placement is provided.
 */
 const AdornmentPlaceholder = () => {
  return <Box gap="medium" />;
};

/**
 * Map children for placement within the `TextInput` flex container. Ensures that
 * placeholders are provided for unused placements.
 */
 export const childrenToAdornments = (children?: AdornmentsAsChildren) => {
  let endAdornment = <AdornmentPlaceholder />;
  let startAdornment = <AdornmentPlaceholder />;

  if (!children) {
    return { endAdornment, startAdornment };
  }

  Children.forEach(children, child => {
    if (isValidElement(child)) {
      if (child.props.placement === 'end') {
        endAdornment = child;
      }
      if (child.props.placement === 'start') {
        startAdornment = child;
      }
    }
  });

  return { endAdornment, startAdornment };
};