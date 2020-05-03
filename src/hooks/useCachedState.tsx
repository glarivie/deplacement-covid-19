import { useEffect } from 'react';
import { useLocalStorage, useSetState } from 'react-use';
import { isEqual } from 'lodash';

import { FormState } from 'types';

type CachedState = [FormState, (patch: Partial<FormState>) => void];

const useCachedState = (): CachedState => {
  const [cachedState, setCachedState] = useLocalStorage<FormState>('cached', {});
  const [state, setState] = useSetState<FormState>(cachedState);

  useEffect(() => {
    if (!isEqual(state, cachedState)) {
      return setCachedState(state);
    }
  }, [state, cachedState, setCachedState]);

  return [state, setState];
};

export default useCachedState;
