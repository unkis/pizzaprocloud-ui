import React from 'react';

import './assets/Button.css';
import cn from 'classnames';

export enum ButtonType {
  RED = 'RED',
  GREEN = 'GREEN',
}

interface ButtonProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type?: ButtonType
}
export const Button: React.FC<ButtonProps> = ({
  type, className, children, ...props
}) => (
  <div
    className={cn(className, 'Button', {
      Button_type_red: type === ButtonType.RED,
      Button_type_green: type === ButtonType.GREEN,
    })}
    {...props}
  >
    {children}
  </div>
);
