import { WrappedFormUtils } from 'antd/lib/form/Form';
import { langType } from '../../lang';
import { RouterProps } from 'react-router';

export interface LoginFormOwnProps { //FIXME: add typings by connect func
  form: WrappedFormUtils;
};

export type LoginFormDispatchProps = {
  addUser: (role: string, code: string) => void;
};

export type LoginFormStateProps = {
  lang: langType;
  code: string;
  userRole: string;
};
export type LoginFormValues = {
  code: string;
  username: string;
  password: string;
  remember: Boolean;
};

export interface LoginFormProps extends LoginFormOwnProps, RouterProps, LoginFormDispatchProps, LoginFormStateProps {}
