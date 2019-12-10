import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form';
import { RouterProps } from 'react-router';
import { langType } from '../../lang';

export interface LoginFormOwnProps {
  // FIXME: add typings by connect func
  // form: WrappedFormUtils;
}

export type LoginFormDispatchProps = {
  addUser: (role: string, code: string) => void
  logout: () => void
  setEmail: (email: string) => void
}

export type LoginFormStateProps = {
  lang: langType
  code: string
  userRole: string
}
export type LoginFormValues = {
  code: string
  username: string
  password: string
  remember: Boolean
}

export interface LoginFormProps
  extends LoginFormOwnProps,
    RouterProps,
    LoginFormDispatchProps,
    LoginFormStateProps,
    FormComponentProps {}
