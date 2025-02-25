import { css } from '@emotion/css';
import { Box } from '@spark-web/design-system';
import rangeParser from 'parse-numeric-range';
import type { Language } from 'prism-react-renderer';
import PrismHighlight, { Prism } from 'prism-react-renderer';

import { theme } from './prism-theme';

interface HighlightProps {
  code: string;
  language: string;
  metastring?: string;
}

['js', 'jsx', 'ts', 'tsx'].forEach(lang => {
  // @ts-expect-error: Property 'insertBefore' does not exist on type 'LanguageDict'.
  Prism.languages.insertBefore(lang, 'template-string', {
    'gql-template-string': {
      pattern: /gql`[^`]*`/,
      inside: Prism.languages.graphql,
    },
  });
});

const getShouldHighlightLine = (meta = '') => {
  const pattern = /{([\d,-]+)}/;
  const result = pattern.exec(meta);
  if (result) {
    const lineNumbers = rangeParser(result[1]);
    return (index: number) => lineNumbers.includes(index + 1);
  } else {
    return () => false;
  }
};

export function Highlight({ code, language, metastring }: HighlightProps) {
  const shouldHighlightLine = getShouldHighlightLine(metastring);
  return (
    <PrismHighlight
      Prism={Prism}
      theme={theme}
      code={code}
      language={language as Language}
    >
      {({ tokens, getLineProps, getTokenProps }) => (
        <Box
          as="code"
          className={css({
            // we don't want ligatures because they look strange in lots of cases
            // and mess up the editor
            fontFeatureSettings: 'initial',
            MozFontFeatureSettings: 'initial',
            minWidth: '100%',
          })}
        >
          {tokens.map((line, i) => {
            return (
              <Box
                key={i}
                {...getLineProps({
                  line,
                  key: i,
                })}
                className={css({
                  backgroundColor: shouldHighlightLine(i)
                    ? 'rgba(0,0,0,0.05)'
                    : undefined,
                })}
              >
                {line.map((token, key) => (
                  <Box as="span" key={key} {...getTokenProps({ token, key })} />
                ))}
              </Box>
            );
          })}
        </Box>
      )}
    </PrismHighlight>
  );
}
