import { Box } from '@spark-web/box';
import { FieldContextProvider, useFieldContext } from '@spark-web/field';
import { useTheme } from '@spark-web/theme';
import type { ReactElement } from 'react';
import { Children, createContext, isValidElement, useContext, useMemo } from 'react';

// Context
// ------------------------------

type InputAdornmentContextType = { placement: PlacementType };

/**
 * Components like the `SelectInput` may subscribe to the adornment context and
 * change their appearance or behaviour.
 */
const InputAdornmentContext = createContext<InputAdornmentContextType | null>(null);

export function useInputAdornmentContext() {
  return useContext(InputAdornmentContext);
}

// Public components
// ------------------------------

const placementToPadding = {
  start: {
    paddingLeft: 'medium',
    paddingRight: 'xsmall',
  },
  end: {
    paddingLeft: 'xsmall',
    paddingRight: 'medium',
  },
} as const;

type PlacementType = keyof typeof placementToPadding;
export type InputAdornmentProps = {
  children: ReactElement;
  /**
   * When using another input component as an adornment, you may optionally
   * override the parent field label.
   */
  fieldLabel?: string;
  /** Where to place the adornment. */
  placement: PlacementType;
  /**
   * By default, the adornment element will be wrapped to provide alignment and
   * spacing, use the "raw" property to opt-out of this behaviour.
   */
  raw?: boolean;
};

/**
 * Places an element at the "start" or "end" of the input, only one adornment
 * may be provided for each placement. By default, the adornment element will be
 * wrapped to provide alignment and spacing, use the "raw" property to opt-out
 * of this behaviour.
 *
 * @example
 * <TextInput>
 *   <InputAdornment placement="start">
 *     <Text tone="placeholder">$</Text>
 *   </InputAdornment>
 * </TextInput>
 */
export const InputAdornment = ({ children, fieldLabel, placement, raw }: InputAdornmentProps) => {
  const { sizing } = useTheme();
  const adornmentContext = useMemo(() => ({ placement }), [placement]);
  const { paddingLeft, paddingRight } = placementToPadding[placement];
  let content = children;

  if (!raw) {
    content = (
      <Box paddingLeft={paddingLeft} paddingRight={paddingRight}>
        {/*
          Ensure single character adornments don't collapse below the minimum width.
          Using a separate element because padding is considered when declaring
          dimensions.
        */}
        <Box alignItems="center" justifyContent="center" style={{ minWidth: sizing.xxsmall }}>
          {children}
        </Box>
      </Box>
    );
  }

  const wrappedContent = (
    <InputAdornmentContext.Provider value={adornmentContext}>{content}</InputAdornmentContext.Provider>
  );

  if (fieldLabel) {
    return <FieldAdornment fieldLabel={fieldLabel}>{wrappedContent}</FieldAdornment>;
  }

  return wrappedContent;
};

// Private components
// ------------------------------

/**
 * The adornment placeholder provides the default horizontal gutter for the
 * input, when no adornment for that placement is provided.
 */
const AdornmentPlaceholder = () => {
  const { spacing } = useTheme();
  return <Box style={{ width: spacing.medium }} />;
};

/**
 * Wrap the element with a field provider to override the parent field label.
 * Only split-out from `InputAdornment` to avoid the conditional hook rule.
 */
const FieldAdornment = ({ children, fieldLabel }: Required<Pick<InputAdornmentProps, 'children' | 'fieldLabel'>>) => {
  const parentFieldContext = useFieldContext();
  const fieldContext = useMemo(() => ({ ...parentFieldContext, accessibilityLabel: fieldLabel }), [fieldLabel, parentFieldContext]);

  return <FieldContextProvider value={fieldContext}>{children}</FieldContextProvider>;
};

// Utils
// ------------------------------

// NOTE: `null | undefined` allow consumers to conditionally render adornments
export type AdornmentChild = ReactElement<InputAdornmentProps> | null | undefined;
export type AdornmentsAsChildren = AdornmentChild | [AdornmentChild, AdornmentChild];

/**
 * @private
 * Map children for placement within the `TextInput` flex container. Ensures that
 * placeholders are provided for unused placements.
 */
export const childrenToAdornments = (children?: AdornmentsAsChildren) => {
  let endAdornment = <AdornmentPlaceholder />;
  let startAdornment = <AdornmentPlaceholder />;

  if (!children) {
    return { endAdornment, startAdornment };
  }

  Children.forEach(children, child => {
    if (isValidElement(child)) {
      if (child.props.placement === 'end') {
        endAdornment = child;
      }
      if (child.props.placement === 'start') {
        startAdornment = child;
      }
    }
  });

  return { endAdornment, startAdornment };
};
