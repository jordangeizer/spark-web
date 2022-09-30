import { css } from '@emotion/css';
import { useFocusRing, useId, VisuallyHidden } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { Row } from '@spark-web/row';
import { Text } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';

const borderRadius = 'small';

export const SegmentedControl = ({ children }: { children: ReactNode }) => {
  return (
    <Row
      height="medium"
      dividers
      shadow="small"
      borderRadius={borderRadius}
      border="standard"
    >
      {children}
    </Row>
  );
};

export const SegmentedControlOption = forwardRef<
  HTMLInputElement,
  { label: string }
>(function SegmentedControlOption({ label, ...inputProps }, ref) {
  const theme = useTheme();
  const focusStyles = useFocusRing();
  const id = useId();

  return (
    <Box
      flex={1}
      position="relative"
      className={css({
        ':first-child > label': {
          borderTopLeftRadius: theme.border.radius[borderRadius],
          borderBottomLeftRadius: theme.border.radius[borderRadius],
        },
        ':last-child > label': {
          borderTopRightRadius: theme.border.radius[borderRadius],
          borderBottomRightRadius: theme.border.radius[borderRadius],
        },
      })}
    >
      <VisuallyHidden
        {...inputProps}
        as="input"
        type="radio"
        id={id}
        ref={ref}
      />
      <Box
        as="label"
        htmlFor={id}
        background="surface"
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="full"
        userSelect="none"
        className={css({
          ':hover': {
            background: theme.backgroundInteractions.primaryLowHover,
          },
          'input:checked + &': {
            background: theme.color.background.primary,
            '*': {
              color: theme.color.foreground.neutralInverted,
            },
          },
          'input:active + &': {
            background: theme.backgroundInteractions.primaryLowActive,
          },
          'input:focus + &': {
            ...focusStyles,
            position: 'relative',
            zIndex: theme.elevation.sticky,
          },
        })}
      >
        <Text>{label}</Text>
      </Box>
    </Box>
  );
});
