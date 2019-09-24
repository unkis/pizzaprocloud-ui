import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, Checkbox, Typography, Alert } from 'antd';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import './Auth.css';

import { auth } from '../../fakeBD';

import { addUser } from '../../redux/actions';

import { LoginFormProps, LoginFormOwnProps, LoginFormDispatchProps, LoginFormStateProps, LoginFormValues } from './types';
import { State } from '../../redux/types';

import { langMap } from '../../lang';
import { FormComponentProps } from 'antd/es/form';

import { ROOT_URL } from '../../constants/rootUrl';

const { Title } = Typography;

export const LoginForm = ({ form: { setFieldsValue, getFieldsValue, validateFields, getFieldDecorator }, history, lang, addUser, code, userRole }: LoginFormProps) => {
  const [errMsg, setErrMsg] = useState('');
  const [language, setLanguage] = useState(langMap[lang]);

  useEffect(() => {
    setFieldsValue({ code })
  }, [setFieldsValue, code]);

  useEffect(() => {
    if (userRole) {
      history.push(`${ROOT_URL}/menu`);
    }
  }, [history, userRole]);

  useEffect(() => {
    setLanguage(langMap[lang]);
  }, [lang]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateFields((err: any, values: LoginFormValues) => {
      const user = auth(values.username, values.password);
      if (!err && user) {
        addUser(user.role, getFieldsValue().code);
        history.push(`${ROOT_URL}/menu`);
      } else if (!user) {
        setErrMsg('Вы неверно ввели логин или пароль');
      }
    });
  };

    return (
        <div id="components-form-demo-normal-login">
        <Form onSubmit={handleSubmit} className="login-form" autoComplete="off">
            <Title level={4} style={{textAlign: 'center'}}>{language.authTitle}</Title>
            <Form.Item>
            {getFieldDecorator('code', {
                rules: [
                  { required: true, message: 'Введите код' },
                { pattern: /[0-9]+/, message: 'Разрешены только цифры'}
              ],
            })(
                <Input
                autoFocus
                autoComplete="off"
                prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={language.organizationNumber}
                />
            )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Введите имя пользователя' }],
            })(
                <Input
                autoComplete="off"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={language.username}
                />,
            )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Введите пароль' }],
            })(
                <Input
                autoComplete="off"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder={language.password}
                />,
            )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
            })(<Checkbox>{language.autoLogin}</Checkbox>)}
            {errMsg && <div>
                <Alert type="error" message={errMsg}/>
            </div>}
            <Button type="primary" htmlType="submit" className="login-form-button">
                {language.login}
            </Button>
            </Form.Item>
        </Form>
      </div>
    );
}

const mapStatetoProps: MapStateToProps<LoginFormStateProps, LoginFormOwnProps, State> = (state) => {
  return {
    lang: state.languages.lang,
    code: state.user.code,
    userRole: state.user.role
  }
};

const mapDispatchToProps: MapDispatchToPropsFunction<LoginFormDispatchProps, LoginFormOwnProps> = (dispatch) => {
  return {
    addUser(role: string, code: string) {
      dispatch(addUser(role, code));
    }
  }
};

export const Auth = connect(mapStatetoProps, mapDispatchToProps)(Form.create<FormComponentProps<LoginFormOwnProps>>({ name: 'normal_login' })(withRouter<RouteComponentProps<LoginFormOwnProps & LoginFormDispatchProps & LoginFormStateProps, any, any>, any>(LoginForm)));
