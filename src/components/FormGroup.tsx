import React, { InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly name: string;
  readonly label: string;
}

const FormGroup = (props: IProps) => {
  const { name, label, type = 'text', ...rest } = props;

  return (
    <div className="form-group">
      <label htmlFor={name} id={name + '-label'}>{label}</label>
      <div className="input-group align-items-center">
        <input
          type={type}
          className="form-control"
          id={name}
          {...rest}
          required
        />
        {/* <span className="validity" aria-hidden="true" hidden></span> */}
      </div>
      {/* <p className="exemple"></p> */}
    </div>
  );
};

export default FormGroup;
