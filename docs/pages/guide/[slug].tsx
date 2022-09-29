import { Heading, Stack, Text } from '@spark-web/design-system';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

import { allGuides } from '../../.contentlayer/generated';
import { DocsContent } from '../../components/content';
import { MDXContent } from '../../components/mdx-components/mdx-content';
import type { HeadingData } from '../../utils/generate-toc';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allGuides.map(guide => ({ params: { slug: guide.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  code: string;
  description: string | null;
  title: string;
  toc: HeadingData[];
}> = ({ params }) => {
  const guide = allGuides.find(g => g.slug === params?.slug);
  if (!guide) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      code: guide.body.code,
      description: guide.description ?? null,
      title: guide.title,
      toc: guide.toc,
    },
  };
};

export default function Guide({
  code,
  description,
  title,
  toc,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <DocsContent pageTitle={title} includeNavigation toc={toc}>
      <Stack gap="xlarge" dividers>
        <Stack gap="xlarge">
          <Heading level="1">{title}</Heading>
          {description && (
            <Text size="large" tone="muted">
              {description}
            </Text>
          )}
        </Stack>
        <Stack gap="xlarge">
          <MDXContent code={code} />
        </Stack>
      </Stack>
    </DocsContent>
  );
}
