import { css } from '@emotion/css';
import {
  Content as RadixTabPanel,
  List as RadixTabList,
  Root as RadixTabs,
  Trigger as RadixTab,
} from '@radix-ui/react-tabs';
import { BaseButton, useButtonStyles } from '@spark-web/button';
import { Divider } from '@spark-web/divider';
import { Inline } from '@spark-web/inline';
import { Stack } from '@spark-web/stack';
import { DefaultTextPropsProvider, Text } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import { useComposedRefs } from '@spark-web/utils';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import { buildDataAttributes } from '@spark-web/utils/internal';
import type { ReactElement, ReactNode } from 'react';
import {
  Children,
  forwardRef,
  Fragment,
  isValidElement,
  useEffect,
  useRef,
} from 'react';
import useMeasure from 'react-use-measure';

import { IndexProvider, useIndexContext } from './context';

////////////////////////////////////////////////////////////////////////////////

/**
 * Tabs
 *
 * The parent component of the tab interface.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ activationMode, data, children, defaultIndex }, forwardedRef) => {
    const defaultValue =
      typeof defaultIndex === 'undefined' ? String(0) : String(defaultIndex);

    return (
      <RadixTabs
        {...(data ? buildDataAttributes(data) : undefined)}
        activationMode={activationMode}
        defaultValue={defaultValue}
        ref={forwardedRef}
      >
        {children}
      </RadixTabs>
    );
  }
);

Tabs.displayName = 'Tabs';

export type TabsProps = {
  /**
   * When automatic, tabs are activated when receiving focus. When manual,
   * tabs are activated when clicked.
   *
   * @default 'automatic'
   */
  activationMode?: 'automatic' | 'manual';
  /**
   * Children elements to be rendered within the component.
   * Expected to be `TabList` and `TabPanels`.
   */
  children: ReactNode;
  /** Sets data attributes for the element. */
  data?: DataAttributeMap;
  /** The index of the tab that should be active when initially rendered. */
  defaultIndex?: number;
};

////////////////////////////////////////////////////////////////////////////////

/**
 * TabList
 *
 * The parent component of the tabs.
 */
export function TabList({ children, data }: TabListProps) {
  return (
    <RadixTabList asChild>
      <Inline data={data} gap="small">
        {resolveTabListChildren(children)}
      </Inline>
    </RadixTabList>
  );
}

export type TabListProps = {
  /**
   * Children elements to be rendered within the component.
   * Expected to be more than one `Tab` component.
   */
  children: Array<ReactElement<TabProps>>;
  /** Sets data attributes for the element. */
  data?: DataAttributeMap;
};

////////////////////////////////////////////////////////////////////////////////

/**
 * Tab
 *
 * The interactive element that changes the selected panel.
 */

const GAP = 'small'; // Space between the interactive element and the pseudo border

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ children, data, disabled }, forwardedRef) => {
    const [boxProps, tabStyles] = useTabStyles();

    /**
     * The font-weight of the tab changes when the button is active.
     * This causes the button to get slightly wider (which we don't want).
     * To avoid this, we measure the initial width of the button (after the
     * first paint) and give it fixed width.
     * We're using the style prop for this so that Emotion doesn't need to
     * generate a completely new hash for each tab (as the width will vary
     * for each tab based on the length of the text).
     */
    const [internalRef, bounds] = useMeasure();
    const composedRef = useComposedRefs(internalRef, forwardedRef);
    const widthRef = useRef<number | undefined>(undefined);
    useEffect(() => {
      if (bounds.width && !widthRef.current) {
        widthRef.current = bounds.width;
      }
    }, [bounds.width]);

    const index = useIndexContext();

    return (
      <Stack position="relative" paddingY={GAP}>
        <RadixTab asChild disabled={disabled} value={index}>
          <BaseButton
            {...boxProps}
            ref={composedRef}
            data={data}
            className={css(tabStyles)}
            style={{ width: widthRef.current }}
          >
            <DefaultTextPropsProvider size="small" tone="muted">
              <Content>{children}</Content>
            </DefaultTextPropsProvider>
          </BaseButton>
        </RadixTab>
      </Stack>
    );
  }
);

export type TabProps = {
  /** Children elements to be rendered within the component. */
  children: ReactNode;
  /** Sets data attributes for the element. */
  data?: DataAttributeMap;
  /** When true, prevents the user from interacting with the tab. */
  disabled?: boolean;
};

const TAB_NAME = 'Tab';
Tab.displayName = TAB_NAME;

////////////////////////////////////////////////////////////////////////////////

/**
 * TabPanels
 *
 * The parent component of the panels.
 */
export function TabPanels({ children, data }: TabPanelsProps) {
  return (
    <Stack data={data}>
      <Divider width="large" />
      {resolveTabPanelsChildren(children)}
    </Stack>
  );
}

export type TabPanelsProps = {
  /**
   * Children elements to be rendered within the component.
   * Expected to be more than one `TabPanel` component.
   */
  children: Array<ReactElement<TabPanelProps>>;
  /** Sets data attributes for the element. */
  data?: DataAttributeMap;
};

////////////////////////////////////////////////////////////////////////////////

/**
 * TabPanel
 *
 * The panel that displays when it's corresponding tab is active.
 */
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ children, data }, forwardedRef) => {
    const index = useIndexContext();

    return (
      <RadixTabPanel
        {...(data ? buildDataAttributes(data) : undefined)}
        forceMount
        ref={forwardedRef}
        value={index}
        className={css({
          '&[data-state=inactive]': { display: 'none' },
        })}
      >
        {children}
      </RadixTabPanel>
    );
  }
);

const TAB_PANEL_NAME = 'TabPanel';
TabPanel.displayName = TAB_PANEL_NAME;

export type TabPanelProps = {
  /** Children elements to be rendered within the component. */
  children: ReactNode;
  /** Sets data attributes for the element. */
  data?: DataAttributeMap;
};

////////////////////////////////////////////////////////////////////////////////

/**
 * Helpers
 */

/**
 * Custom hook to encapsulate styles for the Tab component
 */
function useTabStyles() {
  const theme = useTheme();
  const [boxProps, buttonStyles] = useButtonStyles({
    iconOnly: false,
    prominence: 'none',
    size: 'medium',
    tone: 'primary',
  });

  return [
    {
      ...boxProps,
      paddingX: 'xlarge',
    },
    {
      ...buttonStyles,
      '&[data-state=active]': {
        '&:not([aria-disabled=true])': {
          ':hover': { background: theme.color.background.primaryMuted },
          '*': {
            color: theme.color.foreground.primaryActive,
            fontWeight: theme.typography.fontWeight.semibold,
          },
        },
        ':active': {
          transform: 'none',
        },
        // Pseudo border
        '::after': {
          content: '""',
          position: 'absolute',
          background: theme.color.foreground.primaryActive,
          bottom: -theme.spacing[GAP],
          left: 0,
          right: 0,
          height: theme.border.width.large,
          width: '100%',
          transform: 'translateY(100%)',
        },
      },
    },
  ] as const;
}

/**
 * Provides base typographic styles when the type of children is `string` or
 * `number`.
 * Otherwise children are wrapped in a `Fragment` in order to provide custom
 * styles.
 */
function Content({ children }: { children: ReactNode }) {
  if (typeof children === 'string' || typeof children === 'number') {
    return (
      <Text as="span" baseline={false} overflowStrategy="nowrap">
        {children}
      </Text>
    );
  }

  return <Fragment>{children}</Fragment>;
}

/**
 * Throws an error if children are not `Tab` components
 */
function resolveTabListChildren(children: TabProps['children']) {
  return Children.map(children, (child, index) => {
    if ((child as any).type.displayName !== TAB_NAME) {
      throw new Error('All children of `TabList` must be `Tab` components');
    }
    return childWithIndexProvider({ child, index });
  });
}

/**
 * Throws an error if children are not `TabPanel` components
 */
function resolveTabPanelsChildren(children: TabPanelProps['children']) {
  return Children.map(children, (child, index) => {
    if ((child as any).type.displayName !== TAB_PANEL_NAME) {
      throw new Error(
        'All children of `TabPanels` must be `TabPanel` components'
      );
    }
    return childWithIndexProvider({ child, index });
  });
}

/**
 * Ensures that the children are valid `ReactElements` before wrapping them with
 * the IndexProvider.
 */
function childWithIndexProvider({
  child,
  index,
}: {
  child: {} | null | undefined;
  index: number;
}) {
  return (
    isValidElement(child) && (
      <IndexProvider value={index}>{child}</IndexProvider>
    )
  );
}
