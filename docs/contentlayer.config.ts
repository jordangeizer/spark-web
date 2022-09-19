import { readFile } from 'node:fs/promises';

import { plugin as untitledLiveCode } from '@untitled-docs/live-code/rehype/dist/live-code.cjs.js';
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeSlug from 'rehype-slug';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkStripMarkdown from 'strip-markdown';

import { generateProps } from './utils/generate-props';
import { generateToc } from './utils/generate-toc';

async function mdxToStr(mdx: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkMdx)
    //@ts-expect-error: Can't pass property remove to object Pluggable<any[]>.
    .use([remarkStripMarkdown, { remove: ['jsx', 'import', 'export'] }])
    .process(mdx);
  return String(file);
}

export const Home = defineDocumentType(() => ({
  name: 'Home',
  contentType: 'mdx',
  filePathPattern: 'docs/pages/index.md',
  isSingleton: true,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the page.',
      required: true,
    },
  },
  computedFields: {
    toc: {
      type: 'json',
      resolve: async doc => generateToc(doc.body.raw),
    },
  },
}));

export const Guide = defineDocumentType(() => ({
  name: 'Guide',
  contentType: 'mdx',
  filePathPattern: 'docs/pages/guide/*.md',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the page.',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of the guide.',
      required: false,
    },
    order: {
      type: 'number',
      description: 'Position in the sidebar that the guide should be shown.',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => {
        const flattenedPath = doc._raw.sourceFileName;
        const [slug] = flattenedPath.split('.md');
        return slug;
      },
    },
    toc: {
      type: 'json',
      resolve: async doc => generateToc(doc.body.raw),
    },
  },
}));

export const Package = defineDocumentType(() => ({
  name: 'Package',
  contentType: 'mdx',
  filePathPattern: 'packages/**/README.md',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the package.',
      required: true,
    },
    storybookPath: {
      type: 'string',
      description: 'Path for Storybook.',
      required: false,
    },
    isExperimentalPackage: {
      type: 'boolean',
      description: 'Maturity status of the component.',
      required: false,
      default: true,
    },
  },
  computedFields: {
    packageName: {
      type: 'string',
      resolve: async doc => {
        return JSON.parse(
          (
            await readFile(`../${doc._raw.sourceFileDir}/package.json`)
          ).toString()
        ).name;
      },
    },
    componentMaturityStatus: {
      type: 'string',
      resolve: async doc => {
        return JSON.parse(
          (
            await readFile(`../${doc._raw.sourceFileDir}/package.json`)
          ).toString()
        ).componentMaturityStatus;
      },
    },
    slug: {
      type: 'string',
      resolve: doc => doc._raw.sourceFileDir.replace(/^packages\//, ''),
    },
    version: {
      type: 'string',
      resolve: async doc => {
        return JSON.parse(
          (
            await readFile(`../${doc._raw.sourceFileDir}/package.json`)
          ).toString()
        ).version;
      },
    },
    toc: {
      type: 'json',
      resolve: async doc => generateToc(doc.body.raw),
    },
    plaintext: {
      type: 'string',
      resolve: async doc => {
        return mdxToStr(doc.body.raw);
      },
    },
    props: {
      type: 'json',
      resolve: async doc => generateProps(doc._raw.sourceFileDir),
    },
  },
}));

export default makeSource({
  contentDirInclude: ['{docs/pages,packages}'],
  contentDirPath: '..',
  disableImportAliasWarning: true,
  documentTypes: [Home, Guide, Package],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, untitledLiveCode],
  },
  onUnknownDocuments: 'skip-ignore',
});
