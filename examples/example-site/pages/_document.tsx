import { propsWithCssText } from '@spark-web/next-utils';
import type { DocumentContext } from 'next/document';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  static async getInitialProps(context: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(context);
    return propsWithCssText(initialProps);
  }

  render() {
    return (
      <Html lang="en-AU">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
