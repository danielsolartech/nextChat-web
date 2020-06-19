import React from 'react';
import { Colors } from '../../types';
import { Link } from 'react-router-dom';
import './button.scss';

interface GeneralProps {
  name: string;
  type: 'background' | 'color' | 'outline';
  color: Colors;
  hoverColor: Colors | 'DEFAULT';
  text: string;
  className?: string;
  extraProps?: { [key: string]: any };
}

interface LinkProps extends GeneralProps {
  as: 'Link' | 'ExternalLink';
  to: string;

  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface ButtonProps extends GeneralProps {
  as: 'Link' | 'ExternalLink' | 'Button';

  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export type ButtonsProps = LinkProps | ButtonProps;

const Button: React.FC<ButtonsProps> = (props: ButtonsProps) => {
  let extraProps: any = {
    ...props.extraProps,
    className: (props.className ? (props.className + ' ') : '') + 'nextChat-button ' + props.type,
  };

  if (props.type === 'color') {
    extraProps['text-color'] = props.color;

    if (props.hoverColor !== 'DEFAULT') {
      extraProps['text-color-hover'] = props.hoverColor;
    } else {
      extraProps.className = extraProps.className + ' text-hover';
    }
  }

  if (props.type === 'background') {
    extraProps['background-color'] = props.color;

    if (props.hoverColor !== 'DEFAULT') {
      extraProps['background-color-hover'] = props.hoverColor;
    } else {
      extraProps.className = extraProps.className + ' background-hover';
    }
  }

  if (props.type === 'outline') {
    extraProps['border-color'] = props.color;
    extraProps['text-color'] = props.color;

    if (props.hoverColor !== 'DEFAULT') {
      extraProps['border-color-hover'] = props.hoverColor;
      extraProps['text-color-hover'] = props.hoverColor;
    } else {
      extraProps.className = extraProps.className + ' border-hover text-hover';
    }
  }

  if (props.onClick) {
    extraProps.onClick = props.onClick;
  }

  if ((props.as === 'Link' || props.as === 'ExternalLink') && ((o: any): o is LinkProps => 'to' in o)(props)) {
    if (!props.to) {
      throw new Error('The link to is required.');
    }

    if (props.as === 'ExternalLink') {
      return (
        <a href={props.to} {...extraProps}>
          {props.text}
        </a>
      );
    } else {
      return (
        <Link to={props.to} {...extraProps}>
          {props.text}
        </Link>
      );
    }
  }

  return (
    <button type="button" {...extraProps}>
      {props.text}
    </button>
  );
};

export default Button;
