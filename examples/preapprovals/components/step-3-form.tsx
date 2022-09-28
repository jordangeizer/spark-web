import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { Button } from '@spark-web/button';
import { Checkbox } from '@spark-web/checkbox';
import { Field } from '@spark-web/field';
import { Heading } from '@spark-web/heading';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { InputAdornment, TextInput } from '@spark-web/text-input';
import { useTheme } from '@spark-web/theme';
import type { FormEvent } from 'react';

import { Slant } from './slant';

export const Step3Form = ({ onSubmit }: { onSubmit: () => void }) => {
  const theme = useTheme();
  return (
    <Stack
      as="form"
      gap="large"
      paddingX="large"
      paddingY="xlarge"
      background="secondaryLow"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Field label="How much would you like to be approved for?">
        <TextInput type="number">
          <InputAdornment placement="start">
            <Text>$</Text>
          </InputAdornment>
        </TextInput>
      </Field>
      <Box
        className={css({
          marginLeft: -theme.spacing.large,
          marginRight: -theme.spacing.large,
        })}
      >
        <Slant>
          <Stack
            gap="xlarge"
            marginX="large"
            padding="xlarge"
            background="primary"
            align="center"
          >
            <Text size="large" align="center">
              Your maximum repayment amount will be
            </Text>
            <Heading as="span" level="1" align="center">
              $581.23^
            </Heading>
            <Text align="center">per fornight (including fees*)</Text>
          </Stack>
        </Slant>
      </Box>
      <Field label="Please confirm that you can afford this fortnightly repayment">
        <Box paddingY="medium">
          <Checkbox>Yes, I can afford $581.23/fortnight</Checkbox>
        </Box>
      </Field>
      <Button type="submit">Apply now</Button>
    </Stack>
  );
};
