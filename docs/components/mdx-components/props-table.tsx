import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { TextLink } from '@spark-web/text-link';

import { InlineCode } from '../example-helpers';
import { MdxTable, MdxTd, MdxTh, MdxThead, MdxTr } from './mdx-table';

export type PropsTableProps = {
  props: {
    name: string;
    required: boolean;
    type: string;
    defaultValue?: any;
    description: string;
  }[];
};

export const PropsTable = ({ props }: PropsTableProps) => {
  return (
    <MdxTable>
      <colgroup>
        <col style={{ width: '20%' }} />
        <col style={{ width: '30%' }} />
        <col style={{ width: '50%' }} />
      </colgroup>
      <MdxThead>
        <MdxTr>
          <MdxTh>Prop</MdxTh>
          <MdxTh>Type</MdxTh>
          <MdxTh>Description</MdxTh>
        </MdxTr>
      </MdxThead>

      {props.map(prop => {
        return (
          <MdxTr key={prop.name}>
            <MdxTd>
              <Text as="p" overflowStrategy="breakword">
                {prop.name}
                {prop.required ? '' : '?'}
              </Text>
            </MdxTd>
            <MdxTd>
              <Text as="p" overflowStrategy="breakword">
                {prop.type}
              </Text>
            </MdxTd>
            <MdxTd>
              <Stack gap="xlarge">
                {prop.description.split('\n').map((text, i) => {
                  const urlRe = /(https?:\/\/\S*)/;
                  return (
                    <Text key={i} as="p">
                      {text.split(urlRe).map((s, i) =>
                        urlRe.test(s) ? (
                          <TextLink
                            key={i}
                            href={s}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {s}
                          </TextLink>
                        ) : (
                          <span key={i}>{s}</span>
                        )
                      )}
                    </Text>
                  );
                })}
                {typeof prop.defaultValue !== 'undefined' ? (
                  <Text as="p">
                    <strong>Default</strong>:{' '}
                    <InlineCode>{JSON.stringify(prop.defaultValue)}</InlineCode>
                  </Text>
                ) : null}
              </Stack>
            </MdxTd>
          </MdxTr>
        );
      })}
    </MdxTable>
  );
};
