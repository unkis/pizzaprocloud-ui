import React, { useState, useEffect } from 'react';
import {
  Form, Icon, Input, Button, Checkbox, Typography, Alert,
} from 'antd';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import './Auth.css';

import { FormComponentProps } from 'antd/es/form';
import { auth } from '../../fakeBD';

import { addUser, logout, setEmail } from '../../redux/actions';

import {
  LoginFormProps,
  LoginFormOwnProps,
  LoginFormDispatchProps,
  LoginFormStateProps,
  LoginFormValues,
} from './types';
import { State } from '../../redux/types';

import { langMap } from '../../lang';

import { ROOT_URL } from '../../constants/rootUrl';

const { Title } = Typography;

export const LoginForm = ({
  form: {
    setFieldsValue, getFieldsValue, validateFields, getFieldDecorator,
  },
  history,
  lang,
  addUser,
  code,
  userRole,
  setEmail,
  logout,
}: LoginFormProps) => {
  const [errMsg, setErrMsg] = useState('');
  const [language, setLanguage] = useState(langMap[lang]);

  useEffect(() => {
    setFieldsValue({ code });
  }, [setFieldsValue, code]);

  // useEffect(() => {
  //   if (userRole) {
  //     history.push(`${ROOT_URL}/menu`)
  //   }
  // }, [history, userRole])

  useEffect(() => {
    setLanguage(langMap[lang]);
  }, [lang]);
  /*
  useEffect(() => {
    const code = localStorage.getItem('code');
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://www.liefersoft.de:9011/oauth2/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            logout();
            localStorage.clear();
            // window.location.reload()
          }
          return res.json();
        })
        .then((result) => {
          if (result.email) {
            setEmail(result.email);
            console.log('SET EMAIL!', result.email);
            window.location.href = `${ROOT_URL}/menu`;
          }
        });
      return;
    }
    if (code) {
      console.log('code from localStorage', code);
      fetch(
        `https://www.liefersoft.de:9011/oauth2/token?client_id=d6ef13df-7f85-4cca-9de3-502377ca9a88&code=${code}&grant_type=authorization_code&redirect_uri=${window.location.origin}/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
        .then((res) => {
          if (res.status !== 200) {
            localStorage.clear();
            console.log(res.json());
            window.location.replace(`
      https://www.liefersoft.de:9011/oauth2/authorize?client_id=d6ef13df-7f85-4cca-9de3-502377ca9a88&response_type=code&redirect_uri=${window.location.origin}/login
      `);
            return { access_token: false };
          }
          return res.json();
        })
        .then((result) => {
          console.log(result.access_token);
          if (result.access_token) {
            localStorage.setItem('token', result.access_token);

            fetch('https://www.liefersoft.de:9011/oauth2/userinfo', {
              headers: {
                Authorization: `Bearer ${result.access_token}`,
              },
            })
              .then((res) => {
                if (!res.ok) {
                  localStorage.clear();
                  // window.location.reload()
                }
                return res.json();
              })
              .then((result) => {
                setEmail(result.email);
                console.log('SET EMAIL', result.email);
                window.location.href = `${ROOT_URL}/menu`;
              });
          }
        });
      return;
    }
    console.log(window.location.search);
    const match = window.location.search.match(/code=([^&]*)&?/);
    if (match) {
      localStorage.setItem('code', match[1]);
      fetch(
        `https://www.liefersoft.de:9011/oauth2/token?client_id=d6ef13df-7f85-4cca-9de3-502377ca9a88&code=${match[1]}&grant_type=authorization_code&redirect_uri=${window.location.origin}/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
        .then((res) => {
          if (res.status !== 200) {
            localStorage.clear();
            console.log(res.json());
            window.location.replace(`
      https://www.liefersoft.de:9011/oauth2/authorize?client_id=d6ef13df-7f85-4cca-9de3-502377ca9a88&response_type=code&redirect_uri=${window.location.origin}/login
      `);
            return { access_token: false };
          }
          return res.json();
        })
        .then((result) => {
          console.log(result.access_token);
          if (result.access_token) {
            localStorage.setItem('token', result.access_token);

            fetch('https://www.liefersoft.de:9011/oauth2/userinfo', {
              headers: {
                Authorization: `Bearer ${result.access_token}`,
              },
            })
              .then((res) => {
                if (!res.ok) {
                  localStorage.clear();
                  // window.location.reload()
                }
                return res.json();
              })
              .then((result) => {
                setEmail(result.email);
                window.location.href = `${ROOT_URL}/menu`;
              });
          }
        });
    } else {
      window.location.replace(`
      https://www.liefersoft.de:9011/oauth2/authorize?client_id=d6ef13df-7f85-4cca-9de3-502377ca9a88&response_type=code&redirect_uri=${window.location.origin}/login
      `);
    }
  }, []);
  */
  // fetch(
  //   `https://www.liefersoft.de:9011/oauth2/authorize?client_id=d6ef13df-7f85-4cca-9de3-502377ca9a88&response_type=token&username=info%40pizza-programm.de&password=12345678&redirect_uri=http://localhost:8081/login`,
  //   {method: 'POST', headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }}
  // )
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
        <Title level={4} style={{ textAlign: 'center' }}>
          {language.authTitle}
        </Title>
        <Form.Item>
          {getFieldDecorator('code', {
            rules: [
              { required: true, message: 'Введите код' },
              { pattern: /[0-9]+/, message: 'Разрешены только цифры' },
            ],
          })(
            <Input
              autoFocus
              autoComplete="off"
              prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={language.organizationNumber}
            />,
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
          {errMsg && (
            <div>
              <Alert type="error" message={errMsg} />
            </div>
          )}
          <Button type="primary" htmlType="submit" className="login-form-button">
            {language.login}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStatetoProps: MapStateToProps<LoginFormStateProps, LoginFormOwnProps, State> = (
  state,
) => ({
  lang: state.languages.lang,
  code: state.user.code,
  userRole: state.user.role,
});

const mapDispatchToProps: MapDispatchToPropsFunction<LoginFormDispatchProps, LoginFormOwnProps> = (
  dispatch,
) => ({
  addUser(role: string, code: string) {
    dispatch(addUser(role, code));
  },
  logout() {
    dispatch(logout());
  },
  setEmail(email: string) {
    dispatch(setEmail(email));
  },
});

export const Auth = connect(
  mapStatetoProps,
  mapDispatchToProps,
)(
  Form.create<FormComponentProps<LoginFormOwnProps>>({ name: 'normal_login' })(
    withRouter<
      RouteComponentProps<
        LoginFormOwnProps & LoginFormDispatchProps & LoginFormStateProps,
        any,
        any
      >,
      any
    >(LoginForm),
  ),
);
