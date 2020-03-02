import React, { useCallback } from 'react';
import {
  DeliveryIcon,
  CartIcon,
  KitchenMonitorIcon,
  ReportsIcon,
  DriverMonitorIcon,
} from '../../icons';

import './assets/LeftMenu.css';

export enum Buttons {
  DELIVERY = 'DELIVERY',
  CART = 'CART',
  KITCHEN_MONITOR = 'KITCHEN_MONITOR',
  DRIVER_MONITOR = 'DRIVER_MONITOR',
  REPORTS = 'REPORTS',
}

interface LeftMenuProps {
  onButtonClick: (button: Buttons, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
export const LeftMenu: React.FC<LeftMenuProps> = ({ onButtonClick }) => {
  const handleButtonClick = useCallback(
    (button: Buttons) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onButtonClick(button, event);
    },
    [onButtonClick],
  );

  return (
    <div className="LeftMenu">
      <div className="LeftMenu-Button" onClick={handleButtonClick(Buttons.DELIVERY)}>
        <div className="LeftMenu-ButtonIcon">
          <DeliveryIcon className="LeftMenu-ButtonIconSvg" />
        </div>
        <div className="LeftMenu-ButtonText">Lieferung</div>
      </div>
      <div className="LeftMenu-Button" onClick={handleButtonClick(Buttons.CART)}>
        <div className="LeftMenu-ButtonIcon">
          <CartIcon className="LeftMenu-ButtonIconSvg" />
        </div>
        <div className="LeftMenu-ButtonText">Warenkorb</div>
      </div>
      <div className="LeftMenu-Button" onClick={handleButtonClick(Buttons.KITCHEN_MONITOR)}>
        <div className="LeftMenu-ButtonIcon">
          <KitchenMonitorIcon className="LeftMenu-ButtonIconSvg" />
        </div>
        <div className="LeftMenu-ButtonText">Kuchen Monitor</div>
      </div>
      <div className="LeftMenu-Button" onClick={handleButtonClick(Buttons.DRIVER_MONITOR)}>
        <div className="LeftMenu-ButtonIcon">
          <DriverMonitorIcon className="LeftMenu-ButtonIconSvg" />
        </div>
        <div className="LeftMenu-ButtonText">Fahrer Monitor</div>
      </div>
      <div className="LeftMenu-Button" onClick={handleButtonClick(Buttons.REPORTS)}>
        <div className="LeftMenu-ButtonIcon">
          <ReportsIcon className="LeftMenu-ButtonIconSvg" />
        </div>
        <div className="LeftMenu-ButtonText">Berichten</div>
      </div>
      <div className="LeftMenu-Button">
        <div className="LeftMenu-ButtonIcon">
          <ReportsIcon className="LeftMenu-ButtonIconSvg" />
        </div>
        <div className="LeftMenu-ButtonText">Button 1</div>
      </div>
      <div className="LeftMenu-Button">
        <div className="LeftMenu-ButtonIcon">
          <ReportsIcon className="LeftMenu-ButtonIconSvg" />
        </div>
        <div className="LeftMenu-ButtonText">Button 2</div>
      </div>
      <div className="LeftMenu-Button">
        <div className="LeftMenu-ButtonIcon">
          <ReportsIcon className="LeftMenu-ButtonIconSvg" />
        </div>
        <div className="LeftMenu-ButtonText">Button 3</div>
      </div>
    </div>
  );
};
