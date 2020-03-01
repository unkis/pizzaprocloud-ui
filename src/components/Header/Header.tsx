import React from 'react';
import { VoipStatusIcon } from '../../icons';

import './assets/Header.css';

interface HeaderProps {
  onSettingsClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onHelpClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onLogoutClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
export const Header: React.FC<HeaderProps> = ({ onSettingsClick, onHelpClick, onLogoutClick }) => (
  <div className="Header">
    <div className="Header-VoipStatus">
      <VoipStatusIcon />
    </div>
    <div className="Header-Actions">
      <div className="Header-Login">login@pizza-pasta.de</div>
      <div className="Header-ActionsButtons">
        <div className="Header-ActionButton" onClick={onSettingsClick}>
            Einstellungen
        </div>
        <div className="Header-ActionButton" onClick={onHelpClick}>
            Hilfe
        </div>
        <div className="Header-ActionButton" onClick={onLogoutClick}>
            Log out
        </div>
      </div>
    </div>
  </div>
);
