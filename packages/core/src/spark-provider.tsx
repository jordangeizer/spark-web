import { Global } from '@emotion/react';
import { IdProvider, useFocusVisible } from '@spark-web/a11y';
import type { LinkComponent } from '@spark-web/link';
import { DefaultLinkComponent, LinkComponentContext } from '@spark-web/link';
import type { BrighteTheme } from '@spark-web/theme';
import { defaultTheme, ThemeProvider } from '@spark-web/theme';
import type { ReactNode } from 'react';

import { AesteticoStylesheet } from './fonts';

export type SparkProviderProps = {
  children: ReactNode;
  linkComponent?: LinkComponent;
  loadCustomFonts?: boolean;
  theme?: BrighteTheme;
};

/** Consolidates core functionality and dependencies of Spark Web. */
export const SparkProvider = ({
  children,
  linkComponent = DefaultLinkComponent,
  loadCustomFonts = true,
  theme = defaultTheme,
}: SparkProviderProps) => {
  useFocusVisible();

  return (
    <ThemeProvider value={theme}>
      <LinkComponentContext.Provider value={linkComponent}>
        <IdProvider>{children}</IdProvider>
      </LinkComponentContext.Provider>
      {loadCustomFonts && <AesteticoStylesheet />}
      {/* Minimum reset */}
      <Global
        styles={`body{margin:0;padding:0;background:${theme.color.background.body}; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}`}
      />
    </ThemeProvider>
  );
};
