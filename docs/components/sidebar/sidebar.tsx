import { css } from '@emotion/css';
import { Box, Hidden, useTheme } from '@spark-web/design-system';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '../constants';
import { useSidebarContext } from './context';
import { NavItems } from './nav-items';
import type { SidebarItem } from './types';

/** Responsively render sidebar navigation items. */
export const Sidebar = ({ items }: { items: SidebarItem[] }) => {
  const theme = useTheme();
  const { events } = useRouter();
  const { sidebarIsOpen, closeSidebar } = useSidebarContext();

  useEffect(() => {
    // subscribe to next/router event
    events.on('routeChangeStart', closeSidebar);
    return () => {
      // unsubscribe to event on unmount to prevent memory leak
      events.off('routeChangeStart', closeSidebar);
    };
  }, [closeSidebar, events]);

  const fixedScrollableArea = theme.utils.responsiveStyles({
    mobile: {
      backgroundColor: theme.color.background.surface,
      bottom: 0,
      left: 0,
      right: 0,
      top: HEADER_HEIGHT + 1,
    },
    tablet: {
      backgroundColor: 'initial',
      left: 'auto',
      right: 'auto',
      width: SIDEBAR_WIDTH,
    },
  });

  return (
    <Hidden below={sidebarIsOpen ? undefined : 'tablet'}>
      <Box
        position="fixed"
        overflow="auto"
        paddingX={{ tablet: 'large' }}
        paddingY={{ mobile: 'medium', tablet: 'large' }}
        className={css(fixedScrollableArea)}
      >
        <nav aria-label="Page navigation">
          <NavItems items={items} />
        </nav>
      </Box>
    </Hidden>
  );
};
