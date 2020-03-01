import React, { useCallback } from 'react';
import { Button, ButtonType } from '../Button';

import './assets/DeliveryForm.css';

interface DeliveryFormProps {
  onFieldChange: (fieldId: string, value: string) => void
  fieldsValues: { [id: string]: { name: string; value: string } }
  onNextClick: () => void
  onResetClick: () => void
}
export const DeliveryForm: React.FC<DeliveryFormProps> = ({
  onFieldChange,
  fieldsValues,
  onNextClick,
  onResetClick,
}) => {
  const handleFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFieldChange(event.target.id, event.target.value);
    },
    [onFieldChange],
  );
  return (
    <div className="DeliveryForm">
      <div className="DeliveryForm-Title">Kundendaten</div>
      <div className="DeliveryForm-Fields">
        {Object.keys(fieldsValues).map((id) => {
          const { name, value } = fieldsValues[id];
          return (
            <div className="DeliveryForm-Field Field">
              <div className="Field-Label">{name}</div>
              <input className="Field-Value" id={id} value={value} onChange={handleFieldChange} />
            </div>
          );
        })}
      </div>
      <div className="DeliveryForm-Buttons">
        <Button className="DeliveryForm-Button" type={ButtonType.RED} onClick={onResetClick}>
          esc
        </Button>

        <Button className="DeliveryForm-Button" type={ButtonType.GREEN} onClick={onNextClick}>
          F2 - next
        </Button>
      </div>
    </div>
  );
};
