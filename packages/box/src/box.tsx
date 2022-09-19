import { css, cx } from '@emotion/css';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import {
  buildDataAttributes,
  resetElementStyles,
} from '@spark-web/utils/internal';
import { forwardRefWithAs } from '@spark-web/utils/ts';
import type { ReactNode } from 'react';

import { renderBackgroundProvider } from './context';
import { useBoxProps } from './use-box-props';
import type { BoxStyleProps } from './use-box-styles';

export type BoxProps = {
  /** Children element to be rendered inside the component. */
  children?: ReactNode;

  /** Sets data attributes on the component. */
  data?: DataAttributeMap;

  /** An identifier which must be unique in the whole document. */
  id?: string;

  /** Custom css styles. */
  className?: string;

  // TODO: this API is less than ideal, consider alternative
  /**
   * When providing a component using the "as" prop, optionally tell the system
   * what the underlying element will be. Used internally to manage reset
   * styles.
   */
  asElement?: keyof HTMLElementTagNameMap;
} & BoxStyleProps;

/** Exposes a prop-based API for adding styles to a view, within the constraints of the theme. */
export const Box = forwardRefWithAs<'div', BoxProps>(
  (
    { as: Tag = 'div', asElement, className, data, id, ...props },
    forwardedRef
  ) => {
    const { styles, attributes } = useBoxProps(props);
    const resetStyles = resetElementStyles(asElement ?? Tag);

    const element = (
      <Tag
        {...(data ? buildDataAttributes(data) : undefined)}
        ref={forwardedRef}
        id={id}
        className={cx(css(resetStyles), css(styles), className)}
        {...attributes}
      />
    );

    return renderBackgroundProvider(props.background, element);
  }
);
