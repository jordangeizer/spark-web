import { SparkProvider } from '@spark-web/design-system';
import { UniversalNextLink } from '@spark-web/next-utils';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import { DefaultSeo } from 'next-seo';

import { allGuides, allPackages } from '../.contentlayer/generated';
import { Layout } from '../components/layout';
import type { SidebarItem } from '../components/sidebar';

function App({
  Component,
  pageProps,
  navigation,
}: AppProps & {
  navigation: SidebarItem[];
}) {
  return (
    <SparkProvider linkComponent={UniversalNextLink}>
      <NextHead>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </NextHead>
      <DefaultSeo
        titleTemplate="%s | Brighte Spark Design System"
        defaultTitle="Brighte Spark Design System"
      />
      <Layout navigation={navigation}>
        <Component {...pageProps} />
      </Layout>
    </SparkProvider>
  );
}

App.getInitialProps = async () => {
  const ignorePackages = [
    // internal package used only for Radio and Checkbox for consistent styling
    'control-label',
  ];
  return {
    navigation: [
      { name: 'Home', href: '/' },
      {
        name: 'Guides',
        children: [
          {
            name: 'Demo',
            href: '/guide/demo',
          },
          ...allGuides
            .sort((a, b) => {
              if (a.order < b.order) {
                return -1;
              }
              if (a.order > b.order) {
                return 1;
              }
              return 0;
            })
            .map(guide => ({
              name: guide.title,
              href: `/guide/${guide.slug}`,
            })),
        ],
      },
      {
        name: 'Reference',
        children: [
          {
            name: 'Tokens',
            href: '/reference/tokens',
          },
          {
            name: 'Colours',
            href: '/reference/colours',
          },
          {
            name: 'Typography',
            href: '/reference/typography',
          },
        ],
      },
      {
        name: 'Components',
        children: allPackages
          .filter(({ slug }) => !ignorePackages.includes(slug))
          .map(({ title, slug }) => ({
            name: title,
            href: `/package/${slug}`,
          })),
      },
    ],
  };
};

export default App;
