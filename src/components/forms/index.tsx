import React from 'react';
import Input, { InputProps } from './input';
import Button, { ButtonsProps } from './button';
import './index.scss';

interface FormProps {
  title: string;
  description?: string;
  extra?: string | React.ReactElement;

  inputs: InputProps[];
  submitButton: ButtonsProps;
  cancelButton?: ButtonsProps;
}

const Form: React.FC<FormProps> = (props: FormProps) => {
  return (
    <div className="nextChat-form">
      <div className="form-head">
        <div className="head-title" text-color="Purple">
          {props.title}
        </div>
        {props.description && <div className="head-description">
          {props.description}
        </div>}
      </div>
      <div className="form-body">
        {props.inputs.length > 0 && props.inputs.map((input) => <Input key={input.name} {...input} />)}

        {props.extra && (
          <div className="body-extra">
            {typeof props.extra === 'string' ? <p>{props.extra}</p> : props.extra}
          </div>
        )}

        <div className="body-buttons">
          <Button {...props.submitButton} />
          {props.cancelButton && <Button {...props.cancelButton} />}
        </div>
      </div>
    </div>
  );
};

export default Form;
