import { Alert } from '@spark-web/alert';
import { Box } from '@spark-web/box';
import { Container } from '@spark-web/container';
import { Heading } from '@spark-web/heading';
import { ShieldCheckIcon } from '@spark-web/icon';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import type { ReactNode } from 'react';

import { BrighteLogo } from './brighte-logo';

export const Layout = ({
  heading,
  description,
  footer,
  children,
}: {
  heading: string | JSX.Element;
  description: string | JSX.Element;
  footer: (string | JSX.Element)[];
  children: ReactNode;
}) => (
  <Container size="small">
    <Stack gap="large" padding="medium">
      <Stack as="header" gap="xlarge" marginBottom="medium">
        <BrighteLogo />
        <Heading level="1" tone="primary" align="center">
          {heading}
        </Heading>
        <Text align="center">{description}</Text>
      </Stack>
      <Box as="main">{children}</Box>
      <Stack as="footer" gap="xlarge" marginBottom="medium">
        <BrighteAlert />
        {footer.map((text, i) => (
          <Text key={i} size="xsmall" tone="muted">
            {text}
          </Text>
        ))}
      </Stack>
    </Stack>
  </Container>
);

const BrighteAlert = () => (
  <Alert tone="positive" icon={ShieldCheckIcon}>
    <Text size="xsmall">
      Brighte believes in empowering households to make{' '}
      <u>informed purchases</u>, with transparent and{' '}
      <u>responsible payment plans</u>.
    </Text>
  </Alert>
);
