import { Stack } from '@spark-web/design-system';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { home } from '../.contentlayer/generated';
import { DocsContent } from '../components/content';
import { MDXContent } from '../components/mdx-components/mdx-content';
import type { HeadingData } from '../utils/generate-toc';

export const getStaticProps: GetStaticProps<{
  code: typeof home.title;
  title: typeof home.body.code;
  toc: HeadingData[];
}> = () => {
  return {
    props: {
      code: home.body.code,
      title: home.title,
      toc: home.toc,
    },
  };
};

export default function HomePage({
  code,
  title,
  toc,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <DocsContent pageTitle={title} includeNavigation toc={toc}>
      <Stack gap="xlarge">
        <MDXContent code={code} />
      </Stack>
    </DocsContent>
  );
}
