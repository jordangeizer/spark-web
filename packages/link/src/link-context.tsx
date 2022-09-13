import type { DataAttributeMap } from '@spark-web/utils/internal';
import assert from 'assert';
import dedent from 'dedent';
import type {
  AnchorHTMLAttributes,
  ForwardRefRenderFunction,
  Ref,
  VFC,
} from 'react';
import { createContext, forwardRef, useContext } from 'react';

export interface LinkComponentProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  data?: DataAttributeMap;
  href: string;
}

export const makeLinkComponent = (
  render: ForwardRefRenderFunction<HTMLAnchorElement, LinkComponentProps>
) => ({ __forwardRef__: forwardRef(render) } as const);

export type LinkComponent =
  | ReturnType<typeof makeLinkComponent>
  | VFC<LinkComponentProps>;

export const DefaultLinkComponent = makeLinkComponent((props, ref) => (
  <a ref={ref} {...props} />
));

export const LinkComponentContext =
  createContext<LinkComponent>(DefaultLinkComponent);

export const useLinkComponent = (ref: Ref<HTMLAnchorElement>) => {
  const linkComponent = useContext(LinkComponentContext);

  assert(
    !ref || '__forwardRef__' in linkComponent,
    dedent`
      You're passing a ref to a Spark link, but your app is providing a custom link component to 'SparkProvider' that doesn't appear to support refs.

      To fix this, you need to use Spark's 'makeLinkComponent' helper function when creating your custom link component. This ensures that refs are forwarded correctly, and allows us to silence this error message.
    `
  );

  if ('__forwardRef__' in linkComponent) {
    return linkComponent.__forwardRef__;
  }

  return linkComponent;
};
