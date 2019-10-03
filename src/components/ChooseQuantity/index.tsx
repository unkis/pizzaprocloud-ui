import React, { useCallback, useState, useEffect } from 'react';
import { Alert, InputNumber, Button } from 'antd';

interface Product {
  productName: string;
  type: 'addition' | 'product';
};

interface ChooseQuantityProps {
  onClose: (quantity: number) => any;
  product: Product;
  defaultValue?: number;
}
interface BodyOfChooseQuantityProps {
  onCloseAlert: () => void;
  quantity: number;
  productName: string;
  onNumberChange: (value?: number) => void;
  min?: number;
};

function BodyOfChooseQuantity({ onCloseAlert, quantity, onNumberChange, productName, min }: BodyOfChooseQuantityProps) {
  return (
    <div className="BodyOfChooseQuantity">
      <div className="BodyOfChooseQuantity-ProductName">{productName}</div>
      <InputNumber autoFocus min={min} value={quantity} onChange={onNumberChange} />
      <div>
        <Button type="primary" onClick={onCloseAlert}>Добавить</Button>
      </div>
    </div>
  )
}

const ChooseQuantity = ({ onClose, defaultValue = 1, product }: ChooseQuantityProps) => {
  const [quantity, setQuantity] = useState(defaultValue);

  const onNumberChange = useCallback((value: number | undefined) => setQuantity(value || 0), [setQuantity]);
  const onCloseAlert = useCallback(() => {
    onClose(quantity);
  }, [onClose, quantity]);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    const activeElement = document.activeElement && document.activeElement.className.includes('ant-input-number-input');
    if (event.key === 'Enter' || event.key === '+') {
      onCloseAlert();
    } else if (!activeElement && event.key === 'ArrowUp') {
      setQuantity(prev => prev + 1);
    } else if (!activeElement && event.key === 'ArrowDown') {
      setQuantity(prev => prev - 1);
    }
  }, [setQuantity, onCloseAlert]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown]);

  const Body = useCallback(() => (
    <BodyOfChooseQuantity
      quantity={quantity}
      onCloseAlert={onCloseAlert}
      productName={product.productName}
      min={product.type === 'product' ? 0 : undefined}
      onNumberChange={onNumberChange} />), [quantity, onCloseAlert, product, onNumberChange]);
  return (
    <Alert
      className="warning ChooseQuantity"
      message={"Выберите количество"}
      description={<Body />}
      type="info"
      closable
      onClose={onCloseAlert}
    />

  )
};

export default ChooseQuantity;
