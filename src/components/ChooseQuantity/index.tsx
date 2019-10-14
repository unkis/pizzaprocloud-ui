import React, { useCallback, useState, useEffect } from 'react';
import { Alert, Input, Button } from 'antd';

const selectSearchInputText = (targetElem?: any) => {
  // функция для выделения текста в поле поиска
  const target = targetElem || (document.querySelector('.BodyOfChooseQuantity .ant-input') as HTMLInputElement);
  target.focus();
  target.setRangeText(target.value, 0, target.value.length, 'select');
};

interface Product {
  productName: string
  type: 'addition' | 'product'
}

interface ChooseQuantityProps {
  onClose: (quantity: number) => any
  product: Product
  defaultValue?: number
  min?: number
}
interface BodyOfChooseQuantityProps {
  onCloseAlert: () => void
  quantity: number | '-'
  productName: string
  onNumberChange: (value: React.ChangeEvent<HTMLInputElement>) => void
}

function BodyOfChooseQuantity({
  onCloseAlert,
  quantity,
  onNumberChange,
  productName,
}: BodyOfChooseQuantityProps) {
  return (
    <div className="BodyOfChooseQuantity">
      <div className="BodyOfChooseQuantity-ProductName">{productName}</div>
      <Input autoFocus value={quantity} onChange={onNumberChange} />
      <div>
        <Button type="primary" onClick={onCloseAlert}>
          Добавить
        </Button>
      </div>
    </div>
  );
}

const ChooseQuantity = ({
  onClose, defaultValue = 1, product, min,
}: ChooseQuantityProps) => {
  const [quantity, setQuantity] = useState<number | '-'>(
    min === undefined || defaultValue > min ? defaultValue : min,
  );

  const onNumberChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === '-') return setQuantity('-');
      const parsedValue = parseInt(event.target.value);
      if (isNaN(parsedValue) || (min !== undefined && min > parsedValue)) {
        return setQuantity(0);
      }
      setQuantity(parsedValue);
    },
    [setQuantity],
  );

  const onCloseAlert = useCallback(() => {
    onClose(quantity === '-' ? 0 : quantity);
  }, [onClose, quantity]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const activeElement = document.activeElement
        && document.activeElement.className.includes('ant-input-number-input');
      if (event.key === 'Enter' || event.key === '+') {
        onCloseAlert();
      } else if (!activeElement && event.key === 'ArrowUp') {
        setQuantity((prev: number | '-') => (prev === '-' ? 0 : prev + 1));
        setTimeout(selectSearchInputText, 10);
      } else if (!activeElement && event.key === 'ArrowDown') {
        setQuantity((prev) => {
          if (prev === '-') return 0;
          if (min !== undefined && min > prev - 1) {
            return min;
          }
          console.log('prev: ', prev);
          return prev - 1;
        });
        setTimeout(selectSearchInputText, 10);
      }
    },
    [setQuantity, onCloseAlert],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  useEffect(() => {
    setTimeout(selectSearchInputText, 10);
  }, []);

  const Body = useCallback(
    () => (
      <BodyOfChooseQuantity
        quantity={quantity}
        onCloseAlert={onCloseAlert}
        productName={product.productName}
        onNumberChange={onNumberChange}
      />
    ),
    [quantity, onCloseAlert, product, onNumberChange],
  );

  return (
    <Alert
      className="warning ChooseQuantity"
      message="Выберите количество"
      description={<Body />}
      type="info"
      closable
      onClose={onCloseAlert}
    />
  );
};

export default ChooseQuantity;
