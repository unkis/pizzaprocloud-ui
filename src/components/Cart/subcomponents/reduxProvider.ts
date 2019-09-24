import { addToFormData } from '../../../redux/actions';
import { State } from '../../../redux/types';
import { MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { SumFormOwnProps, SumFormStateProps, SumFormDispatchProps } from './SumFormTypes';

export const mapStateToProps: MapStateToProps<SumFormStateProps, SumFormOwnProps, State> = (state) => {
  return {
    cartProducts: state.cartProducts,
    formDataState: state.formDataState,
    lang: state.languages.lang
  }
};

export const mapDispatchToProps: MapDispatchToPropsFunction<SumFormDispatchProps, SumFormOwnProps> = (dispatch) => {
  return {
    addDataToFormData(id: string, value: string) {
      dispatch(addToFormData(id, value))
    },
  }
};
