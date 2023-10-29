import React, { FC } from 'react';

import './Button.scss';

interface ButtonProps {
  className?: string;
  type: 'button' | 'submit' | 'reset';
  children?: any;
}
const Button: FC<ButtonProps> = ({ className, type, children, ...props }) => {
  return (
    <button className={className} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
