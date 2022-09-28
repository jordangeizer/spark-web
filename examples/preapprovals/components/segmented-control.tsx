import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { Text } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';

export const SegmentedControl = ({
  name,
  options,
  borderRadius = 'small',
}: {
  name: string;
  options: { label: string; value: string }[];
  borderRadius?: 'full' | 'small' | 'medium' | 'large';
}) => {
  const theme = useTheme();

  return (
    <Box height="medium" display="flex">
      {options.map(option => (
        <Box
          key={option.value}
          className={css({
            flexBasis: 0,
            flexGrow: 1,
            position: 'relative',
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
          <Box as="input" type="radio" id={option.value} name={name} />
          <Box
            as="label"
            htmlFor={option.value}
            background="surface"
            border="field"
            cursor="pointer"
            className={css({
              position: 'absolute',
              inset: 0,
              ':hover': {
                borderColor: theme.border.color.primaryHover,
              },
              'input:checked + &': {
                backgroundColor: theme.color.background.primary,
                '*': {
                  color: theme.color.foreground.neutralInverted,
                },
              },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            <Text>{option.label}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
