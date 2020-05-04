import React, { InputHTMLAttributes, useCallback, ChangeEvent } from 'react';
import { get } from 'lodash';

import useCachedState from 'hooks/useCachedState';
import { FormState } from 'types';

type FormKey = keyof Omit<FormState, 'reasons'>;

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly name: FormKey;
  readonly label: string;
}

const FormGroup = (props: IProps) => {
  const { name, label, type = 'text', ...rest } = props;

  const [cachedState, setCachedState] = useCachedState();
  const value = get<FormState, FormKey, string>(cachedState, name, '');

  const setInputValue = useCallback(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const value = get(currentTarget, 'value', '');

    console.log('setInputValue', { [name]: value });

    return setCachedState({ [name]: value });
  }, [setCachedState, name]);

  return (
    <div className="form-group">
      <label htmlFor={name} id={name + '-label'}>{label}</label>
      <div className="input-group align-items-center">
        <input
          type={type}
          className="form-control"
          id={name}
          {...rest}
          value={value}
          onChange={setInputValue}
          required
        />
        <span className="validity" aria-hidden="true" hidden={false} />
      </div>
      <p className="exemple"></p>
    </div>
  );
};

export default FormGroup;
