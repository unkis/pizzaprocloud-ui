import { langType } from '../../../lang';
import { CartProductsState, FormDataStateType } from '../../../redux/reducersTypes';
import { FormComponentProps } from 'antd/lib/form/Form';

export interface SumFormOwnProps {};

export interface SumFormDispatchProps {
  addDataToFormData: (id: string, value: string) => void;
};

export interface SumFormStateProps {
  cartProducts: CartProductsState;
  lang: langType;
  formDataState: FormDataStateType;
}
export interface SumFormProps extends SumFormOwnProps, SumFormDispatchProps, SumFormStateProps, FormComponentProps{} 
