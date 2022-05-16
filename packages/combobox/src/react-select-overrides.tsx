import { useFocusRing } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { ChevronDownIcon } from '@spark-web/icon';
import { Spinner } from '@spark-web/spinner';
import { Text, useText } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import type {
  GroupBase,
  SelectComponentsConfig,
  StylesConfig,
  ThemeConfig,
} from 'react-select';
import { components } from 'react-select';

export const reactSelectComponentsOverride: SelectComponentsConfig<
  any,
  false,
  GroupBase<any>
> = {
  DropdownIndicator: props => (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon size="xxsmall" tone="muted" />
    </components.DropdownIndicator>
  ),
  IndicatorSeparator: () => null,
  LoadingMessage: props => (
    <components.LoadingMessage {...props}>
      <Box paddingY="large">
        <Spinner size="xsmall" tone="primary" />
      </Box>
    </components.LoadingMessage>
  ),
  NoOptionsMessage: props => (
    <components.NoOptionsMessage {...props}>
      <Box paddingY="large">
        <Text>No matching results</Text>
      </Box>
    </components.NoOptionsMessage>
  ),
};

export const useReactSelectStylesOverride = <Item,>({
  invalid,
}: {
  invalid: boolean;
}): StylesConfig<Item, false, GroupBase<Item>> => {
  const theme = useTheme();

  const [textStyles] = useText({
    baseline: false,
    tone: 'neutral',
    size: 'standard',
    weight: 'regular',
  });

  const focusRingStyles = useFocusRing({ always: true });

  return {
    option: (provided, state) => ({
      ...provided,
      ...textStyles,
      borderRadius: theme.border.radius.small,
      ...(state.isSelected
        ? {
            color: theme.color.foreground.primaryActive,
            backgroundColor: theme.color.background.primaryMuted,
          }
        : {}),
      ...(state.isFocused
        ? {
            backgroundColor: state.isSelected
              ? theme.backgroundInteractions.primaryLowHover
              : theme.color.background.surfaceMuted,

            '> *': {
              color: state.isSelected
                ? theme.color.foreground.primaryHover
                : undefined,
              stroke: state.isSelected
                ? theme.color.foreground.primaryHover
                : undefined,
            },
          }
        : {}),
      ':active': {
        backgroundColor: state.isSelected
          ? theme.backgroundInteractions.positiveLowActive
          : theme.color.background.surfacePressed,

        '> *': {
          color: state.isSelected
            ? theme.color.foreground.primaryActive
            : undefined,
          stroke: state.isSelected
            ? theme.color.foreground.primaryActive
            : undefined,
        },
      },
    }),
    control: (provided, state) => ({
      ...provided,
      ...textStyles,
      ...(state.isFocused
        ? focusRingStyles
        : invalid
        ? {
            borderColor: theme.color.foreground.critical,
          }
        : {}),
    }),
    menu: provided => ({
      ...provided,
      boxShadow: theme.shadow.medium,
      borderRadius: theme.border.radius.medium,
    }),
    menuList: provided => ({
      ...provided,
      padding: theme.spacing.small,
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing.xsmall,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transitionProperty: 'transform',
      transitionTimingFunction: 'linear',
      transitionDuration: '100ms',
      ...(state.isFocused
        ? {
            transform: 'rotate(180deg)',
          }
        : {}),
    }),
  };
};

export const useReactSelectThemeOverride = (): ThemeConfig => {
  const theme = useTheme();

  return selectTheme => ({
    ...selectTheme,
    borderRadius: theme.border.radius.small,
    colors: {
      ...selectTheme.colors,
      primary: '#00a87b',
      primary75: '#00c28d',
      primary50: '#9acbb8',
      primary25: '#c8eada',
      danger: '#e61e32',
      dangerLight: '#fec1b5',
      neutral0: 'white',
      neutral5: '#fafcfe',
      neutral10: '#f1f4fb',
      neutral20: '#dce1ec',
      neutral30: '#c7cedb',
      // neutral40,
      neutral50: '#98a2b8',
      neutral60: '#646f84',
      neutral70: '#1a2a3a',
      // neutral80,
      // neutral90,
    },
    spacing: {
      baseUnit: theme.spacing.xsmall,
      controlHeight: theme.sizing.medium,
      menuGutter: theme.spacing.xxsmall,
    },
  });
};