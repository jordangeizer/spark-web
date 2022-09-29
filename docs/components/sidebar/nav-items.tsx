import {
  Box,
  composeId,
  NavLink,
  Stack,
  Text,
  useId,
} from '@spark-web/design-system';
import { useRouter } from 'next/router';

import type { SidebarItem } from './types';

/** @private Recursively render nav items and groups of nav items. */
export const NavItems = ({ items }: { items: SidebarItem[] }) => {
  const { asPath } = useRouter();
  const rootId = useId();

  return (
    <Stack as="ul" gap="small">
      {items.map((linkOrGroup, key) => (
        <Box key={key} as="li">
          {(() => {
            if ('children' in linkOrGroup) {
              const titleId = composeId(rootId, key);
              return (
                <Stack
                  as="nav"
                  aria-labelledby={titleId}
                  gap="medium"
                  paddingLeft="medium"
                  paddingTop="medium"
                >
                  <Text
                    id={titleId}
                    as="span"
                    baseline={false}
                    overflowStrategy="nowrap"
                    size="small"
                    transform="uppercase"
                    weight="semibold"
                  >
                    {linkOrGroup.name}
                  </Text>
                  <NavItems items={linkOrGroup.children} />
                </Stack>
              );
            }

            return (
              <NavLink
                href={linkOrGroup.href}
                isSelected={linkOrGroup.href === asPath}
              >
                {linkOrGroup.name}
              </NavLink>
            );
          })()}
        </Box>
      ))}
    </Stack>
  );
};
