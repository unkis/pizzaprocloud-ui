import React from 'react';

export const DriverMonitorIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...props }) => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <line x1="7.90278" y1="26.0447" x2="42.1207" y2="26.0447" stroke="#8092A0" strokeWidth="4" />
    <line
      y1="-2"
      x2="13.0776"
      y2="-2"
      transform="matrix(0.823191 0.567765 -0.579389 0.815051 36.7374 20.6196)"
      stroke="#8092A0"
      strokeWidth="4"
    />
    <line
      y1="-2"
      x2="13.0776"
      y2="-2"
      transform="matrix(0.823191 -0.567765 0.579389 0.815051 36.7374 35.4697)"
      stroke="#8092A0"
      strokeWidth="4"
    />
    <circle cx="27.7028" cy="28.0447" r="25.5" stroke="#8092A0" strokeWidth="4" />
  </svg>
);
