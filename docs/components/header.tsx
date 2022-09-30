import { css } from '@emotion/css';
import {
  Box,
  Container,
  Hidden,
  Link,
  MenuIcon,
  useFocusRing,
  useTheme,
  VisuallyHidden,
  XIcon,
} from '@spark-web/design-system';

import { GITHUB_URL, HEADER_HEIGHT, SIDEBAR_WIDTH } from './constants';
import { MAIN_ID } from './content';
import { useSidebarContext } from './sidebar';
import { SkipLink } from './skip-link';
import { BrighteLogo, GitHubIcon } from './vectors/fill';

export function Header() {
  const theme = useTheme();

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      className={css({
        borderBottom: `1px solid ${theme.border.color.standard}`,
        backgroundColor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(8px)',
      })}
    >
      <Container size="xlarge">
        <Box
          display="flex"
          alignItems="center"
          className={css({ height: HEADER_HEIGHT })}
        >
          <SkipLink href={`#${MAIN_ID}`}>Skip to main content</SkipLink>
          <MobileMenu />
          <HomeLink />
          <GitHub />
        </Box>
      </Container>
    </Box>
  );
}

function MobileMenu() {
  const { sidebarIsOpen, toggleSidebar } = useSidebarContext();
  const focusRingStyles = useFocusRing();
  const ToggleMenuIcon = sidebarIsOpen ? XIcon : MenuIcon;

  return (
    <Hidden above="mobile">
      <Box
        as="button"
        type="button"
        onClick={toggleSidebar}
        padding="large"
        className={css({ ':focus': focusRingStyles })}
      >
        <VisuallyHidden>Mobile menu</VisuallyHidden>
        <ToggleMenuIcon size="xsmall" tone="muted" />
      </Box>
    </Hidden>
  );
}

function HomeLink() {
  const theme = useTheme();
  const focusRingStyles = useFocusRing();

  return (
    <Box
      paddingLeft={{ tablet: 'xxlarge' }}
      className={css({
        width: SIDEBAR_WIDTH,
      })}
    >
      <Link
        href="/"
        className={css({
          borderRadius: theme.border.radius.small,
          display: 'inline-block',
          margin: -theme.spacing.xsmall,
          padding: theme.spacing.xsmall,
          ':focus': focusRingStyles,
        })}
      >
        <VisuallyHidden>Home</VisuallyHidden>
        <BrighteLogo tone="primary" />
      </Link>
    </Box>
  );
}

function GitHub() {
  const theme = useTheme();
  const focusRingStyles = useFocusRing();

  return (
    <Box
      paddingRight={{ mobile: 'medium', tablet: 'xxlarge' }}
      className={css({ marginLeft: 'auto' })}
    >
      <Link
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={css({
          display: 'inline-block',
          borderRadius: theme.border.radius.full,

          ':focus': focusRingStyles,

          '& > svg': {
            transitionProperty: 'all',
            transitionTimingFunction: 'cubic-bezier(0.02, 1.505, 0.745, 1.235)',
            transitionDuration: `${theme.animation.standard.duration}ms`,
          },

          '&:focus > svg': {
            fill: theme.backgroundInteractions.primaryHover,
          },

          '&:hover > svg': {
            fill: theme.backgroundInteractions.primaryHover,
          },

          '&:active > svg': {
            fill: theme.backgroundInteractions.primaryActive,
          },
        })}
      >
        <VisuallyHidden>Spark Web on GitHub</VisuallyHidden>
        <GitHubIcon tone="muted" size="small" />
      </Link>
    </Box>
  );
}
