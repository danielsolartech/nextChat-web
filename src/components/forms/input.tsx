import React from 'react';
import './input.scss';

interface InputOptions {
  name: string;
  value: string | number;
  label: string;
  className?: string;
  extraProps?: { [key: string]: any };
}

export interface InputProps {
  name: string;
  type: 'email' | 'text' | 'textarea' | 'password' | 'checkbox' | 'radio';
  icon?: string;
  label?: string;
  description?: string;
  placeholder?: string;
  options?: InputOptions[];
  defaultValue?: string;
  defaultChecked?: string;
  message?: string | boolean;

  onEnter?: () => void;
  onChange?: (value: string) => void;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  let Elements: React.ReactElement | null = null;
  let labelProps: { [key: string]: any } = {};

  if (props.type === 'radio') {
    if (!props.options) {
      throw new Error('The input radio options are required.');
    }

    if (props.defaultChecked) {
      let has: boolean = false;

      for (let option of props.options) {
        if (option.name === props.defaultChecked) {
          has = true;
          break;
        }
      }

      if (!has) {
        throw new Error('The input radio default checked is not a valid option.');
      }
    }

    Elements = (
      <div className="input-radios">
        {props.options.map((option) => (
          <div key={option.name} className={option.className + ' radios-radio'} {...option.extraProps}>
            <input type="radio" name={props.name + 'Input'} id={option.name + 'IRadio'} value={option.value}
              defaultChecked={props.defaultChecked === option.name}
              onChange={(e) => props.onChange && props.onChange(e.target.value)} />
            <label htmlFor={option.name + 'IRadio'}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  } else if (props.type === 'textarea') {
    labelProps.htmlFor = `${props.name}TextArea`;

    Elements = (
      <textarea className="textarea-box" name={props.name} id={`${props.name}TextArea`} placeholder={props.placeholder}
        defaultValue={props.defaultValue} onChange={(e) => props.onChange && props.onChange(e.target.value)} />
    );
  } else if (props.type === 'text' || props.type === 'email' || props.type === 'password') {
    if (!props.icon) {
      throw new Error('The input icon is required.');
    }

    labelProps.htmlFor = `${props.name}Input`;

    Elements = (
      <div className="input-box">
        <div className="box-icon">
          <i className={props.icon} />
        </div>
        <input type={props.type} name={props.name} id={`${props.name}Input`} placeholder={props.placeholder}
          onChange={(e) => props.onChange && props.onChange(e.target.value)} defaultValue={props.defaultValue} />
      </div>
    );
  }

  if (!Elements) {
    throw new Error('The elements are empty.');
  }

  return (
    <div className="nextChat-input" onKeyDown={(e) => e.keyCode === 13 && props.onEnter && props.onEnter()}>
      {props.label && (
        <label {...labelProps}>
          {props.label}

          {props.description && <div className="label-info">
            <i className="far fa-question-circle" />

            <div className="info-hover">
              {props.description}
            </div>
          </div>}
        </label>
      )}
      {Elements}
      {props.message && <div className="input-message" id={props.name + 'Message'} dangerouslySetInnerHTML={{
        __html: typeof props.message === 'string' ? props.message : ''
      }} />}
    </div>
  );
};

export default Input;
