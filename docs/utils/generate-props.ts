import fs from 'fs';
import path from 'path';
import docgenTypescript from 'react-docgen-typescript';

const repoRoot = path.resolve(path.basename(import.meta.url), '..', '..');

const docgen = docgenTypescript.withDefaultConfig({
  propFilter: prop => {
    if (prop.parent?.name === 'DOMAttributes') return false;
    if (prop.parent?.name === 'HTMLAttributes') return false;
    if (prop.parent?.name === 'AriaAttributes') return false;
    if (prop.parent?.fileName.includes('node_modules/@types/react/')) {
      return false;
    }

    return true;
  },
  shouldExtractValuesFromUnion: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
});

const extensions = ['js', 'jsx', 'json', 'ts', 'tsx', 'tson'];
const exportRegex = /export {[^}]*} from ['"]([^'"]*)['"]/gs;

export const generateProps = (sourceFileDir: string) => {
  const packageSrcDir = path.join(repoRoot, sourceFileDir, 'src');

  const fileData = fs
    .readFileSync(path.join(packageSrcDir, 'index.ts'))
    .toString();

  const matches = Array.from(fileData.matchAll(exportRegex)).flatMap(
    // Convert into an absolute path with all possible extensions
    ([, filename]) =>
      extensions.map(ext => `${path.resolve(packageSrcDir, filename)}.${ext}`)
  );

  // Parse all the files for docgen info
  return docgen.parse(matches);
};
