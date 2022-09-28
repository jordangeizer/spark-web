import { css } from '@emotion/css';
import { Text } from '@spark-web/text';
import { InputAdornment, TextInput } from '@spark-web/text-input';
import { useTheme } from '@spark-web/theme';

export const RecurringPaymentInput = () => {
  const theme = useTheme();

  return (
    <TextInput type="number">
      <InputAdornment placement="start">
        <Text>$</Text>
      </InputAdornment>
      <InputAdornment placement="end">
        <select
          className={css({
            border: 'none',
            outline: 'none',
            fontFamily: theme.typography.fontFamily.display.name,
          })}
        >
          <option>Weekly</option>
          <option>Monthy</option>
          <option>Yearly</option>
        </select>
      </InputAdornment>
    </TextInput>
  );
};
