import React, { useCallback } from 'react';

import './assets/NavigationButtons.css';

interface Button<T> {
  value: T
  label: string
}
interface NavigationButtonsProps<T = string> {
  buttons: Button<any>[]
  onButtonClick: (button: any) => void
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({ buttons, onButtonClick }) => {
  const handleButtonClick = useCallback(
    (value: any) => () => {
      onButtonClick(value);
    },
    [onButtonClick],
  );
  return (
    <div className="NavigationButtons">
      {buttons.map(({ value, label }) => (
        <div key={value} className="NavigationButton" onClick={handleButtonClick(value)}>
          {label}
        </div>
      ))}
    </div>
  );
};
