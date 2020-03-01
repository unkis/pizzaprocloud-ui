import React from 'react';

export const DeliveryIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...props }) => (
  <svg viewBox="0 0 75 31" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <line y1="15.5" x2="62.2144" y2="15.5" stroke="#8092A0" strokeWidth="4" />
    <line
      y1="-2"
      x2="23.7774"
      y2="-2"
      transform="matrix(0.823191 0.567765 -0.579389 0.815051 52.4266 4)"
      stroke="#8092A0"
      strokeWidth="4"
    />
    <line
      y1="-2"
      x2="23.7774"
      y2="-2"
      transform="matrix(0.823191 -0.567765 0.579389 0.815051 52.4266 31)"
      stroke="#8092A0"
      strokeWidth="4"
    />
  </svg>
);
