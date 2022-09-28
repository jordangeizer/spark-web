import { SparkProvider } from '@spark-web/core';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SparkProvider>
      <Component {...pageProps} />
    </SparkProvider>
  );
}

export default MyApp;
