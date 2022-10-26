import type { RefObject } from 'react';
import { useCallback, useEffect, useState } from 'react';

////////////////////////////////////////////////////////////////////////////////

/**
 * Useful for situations where you have separate buttons to open/close
 * or expand/collapse an element.
 */
export function useTernaryState(
  initialValue: boolean | (() => boolean)
): [boolean, SetTrue, SetFalse] {
  const [state, setState] = useState(initialValue);
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);
  return [state, setTrue, setFalse];
}

type SetTrue = () => void;
type SetFalse = () => void;

////////////////////////////////////////////////////////////////////////////////

/**
 * Calls the provided handler function if a click is detected outside of a
 * specified element.
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void
) {
  useEffect(() => {
    function listener(event: MouseEvent) {
      const element = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!element || element.contains(event.target as Node)) {
        return;
      }

      handler(event);
    }

    window.addEventListener('mousedown', listener);

    return () => window.removeEventListener('mousedown', listener);
  }, [handler, ref]);
}
