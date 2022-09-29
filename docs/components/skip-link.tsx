import { css } from '@emotion/css';
import {
  Box,
  ButtonLink,
  visuallyHiddenStyles,
} from '@spark-web/design-system';

export type SkipLinkProps = {
  children: string;
  href: string;
};

export function SkipLink({ children, href }: SkipLinkProps) {
  return (
    <Box
      className={css({
        ...visuallyHiddenStyles,
        ':focus-within': {
          position: 'absolute',
          width: 'auto',
          height: 'auto',
          padding: 0,
          margin: 0,
          overflow: 'visible',
          clip: 'auto',
          whiteSpace: 'normal',
        },
      })}
    >
      <Box paddingLeft={{ tablet: 'xxlarge' }}>
        <ButtonLink href={href} tone="neutral">
          {children}
        </ButtonLink>
      </Box>
    </Box>
  );
}
