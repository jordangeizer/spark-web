import { css } from '@emotion/css';
import { useFocusRing, visuallyHiddenStyles } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { useButtonStyles } from '@spark-web/button';
import { useHeading } from '@spark-web/heading';
import { useText } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import type { ReactNode } from 'react';

export type CalendarContainerProps = { children: ReactNode };

export function CalendarContainer({ children }: CalendarContainerProps) {
  const dayPickerStyles = useDayPickerStyles();

  return (
    <Box
      background="surface"
      border="standard"
      borderRadius="medium"
      display="inline-block"
      padding="small"
      position="relative"
      shadow="medium"
      className={css(dayPickerStyles)}
    >
      {children}
    </Box>
  );
}

export function useDayPickerStyles() {
  const theme = useTheme();
  const cellSize = theme.sizing.medium;
  const [typographyHeadingStyles, responsiveHeadingStyles] = useHeading({
    level: '3',
    align: 'left',
  });
  const [typographyTextStyles, responsiveTextStyles] = useText({
    baseline: true,
    tone: 'neutral',
    size: 'small',
    weight: 'regular',
  });
  const [, buttonStyles] = useButtonStyles({
    iconOnly: false,
    prominence: 'none',
    size: 'medium',
    tone: 'primary',
  });
  const focusStyles = useFocusRing({ always: true });

  return {
    '.rdp-vhidden': visuallyHiddenStyles,
    // Base button
    '.rdp-button_reset': {
      appearance: 'none',
      background: 'none',
      border: 'none',
      margin: 0,
      padding: 0,
      cursor: 'pointer',
      color: 'inherit',
      font: 'inherit',
    },
    // Header
    '.rdp-caption': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.sizing.medium,
      position: 'relative',
    },
    '.rdp-caption_label': {
      ...typographyHeadingStyles,
      ...responsiveHeadingStyles,
      margin: 0,
      whiteSpace: 'nowrap',
    },
    // Left / right arrows
    '.rdp-nav': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: theme.spacing.medium - theme.spacing.small,
      paddingRight: theme.spacing.medium - theme.spacing.small,
    },
    '.rdp-nav_button': {
      ...buttonStyles,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      height: theme.sizing.small,
      width: theme.sizing.small,
      borderRadius: theme.border.radius.full,
    },
    '.rdp-nav_button:focus': {
      ...focusStyles,
      position: 'relative',
      backgroundColor: theme.backgroundInteractions.primaryLowHover,
    },
    // Days of week
    '.rdp-head_cell': {
      ...typographyTextStyles,
      ...responsiveTextStyles,
      fontWeight: theme.typography.fontWeight.semibold,
      margin: 0,
      padding: 0,
      textAlign: 'center',
      verticalAlign: 'middle',
      height: cellSize,
      width: cellSize,
    },
    // Day button
    '.rdp-day': {
      ...typographyTextStyles,
      ...responsiveTextStyles,
      ...buttonStyles,
      borderRadius: theme.border.radius.small,
    },
    '.rdp-day:focus': {
      ...focusStyles,
      position: 'relative',
      backgroundColor: theme.backgroundInteractions.primaryLowHover,
    },
    ".rdp-button:disabled, .rdp-button[aria-disabled='true']": {
      color: theme.color.foreground.disabled,
      pointerEvents: 'none',
      userSelect: 'none',
    },
    '.rdp-weeknumber, .rdp-day': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: cellSize,
      height: cellSize,
    },
    // Table
    '.rdp-months': {
      display: 'flex',
    },
    '.rdp-month:first-of-type': {
      marginLeft: 0,
    },
    '.rdp-month:last-of-type': {
      marginRight: 0,
    },
    '.rdp-table': {
      margin: 0,
      maxWidth: `calc(${cellSize} * 7)`,
      borderCollapse: 'collapse',
    },
    '.rdp-tbody': {
      border: 0,
    },
    '.rdp-cell': {
      width: cellSize,
      height: cellSize,
      padding: 0,
      textAlign: 'center',
    },
    ".rdp-day_selected:not([aria-disabled='true']), .rdp-day_selected:focus:not([aria-disabled='true']), .rdp-day_selected:active:not([aria-disabled='true']), .rdp-day_selected:hover:not([aria-disabled='true']), .rdp-day_selected:hover:not([aria-disabled='true'])":
      {
        backgroundColor: theme.color.background.primary,
        color: theme.color.foreground.neutralInverted,
      },
  } as const;
}
