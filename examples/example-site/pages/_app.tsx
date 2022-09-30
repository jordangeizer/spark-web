import { Global } from '@emotion/react';
import { SparkProvider } from '@spark-web/core';
import { UniversalNextLink } from '@spark-web/next-utils';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';

import { Layout } from '../components/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SparkProvider linkComponent={UniversalNextLink}>
      <NextHead>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </NextHead>
      <Global styles={{ 'html, body, #__next': { height: '100%' } }} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SparkProvider>
  );
}
