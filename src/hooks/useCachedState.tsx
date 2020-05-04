import { useEffect, useCallback } from 'react';
import { useLocalStorage, createGlobalState } from 'react-use';
import { isEqual, isNil } from 'lodash';

import { FormState } from 'types';

type CachedState = [FormState, (patch: Partial<FormState>) => void];

const cached = localStorage.getItem('cached');
const useGlobalState = createGlobalState<FormState>(isNil(cached) ? {} : JSON.parse(cached));

const useCachedState = (): CachedState => {
  const [cachedState, setCachedState] = useLocalStorage<FormState>('cached', {});
  const [globalState = {}, setGlobalState] = useGlobalState();

  const setPartialState = useCallback((patch: Partial<FormState>): void => {
    return setGlobalState({ ...globalState, ...patch });
  }, [globalState, setGlobalState]);

  useEffect(() => {
    if (!isEqual(globalState, cachedState)) {
      return setCachedState(globalState);
    }
  }, [globalState, cachedState, setGlobalState, setCachedState]);

  return [globalState, setPartialState];
};

export default useCachedState;
