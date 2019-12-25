import React, { useCallback, useState, useEffect } from 'react';
import {
  Form, Input, Button, Select, Typography, Icon,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import './TelphoneSettings.css';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { State } from '../../../redux/types';
import { addVoipSettings, setVoipConnected, setVoipDisconnected } from '../../../redux/actions';
import useLanguage from '../../../helpers/useLanguage';
import { ROOT_URL } from '../../../constants/rootUrl';

const mapStateToProps = (state: State) => ({
  voip: state.voip,
});
const mapDispatchToProps = {
  addVoip: addVoipSettings,
  voipConnected: setVoipConnected,
  voipDisconnected: setVoipDisconnected,
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    lg: { span: 12 },
    xl: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    lg: { span: 12 },
    xl: { span: 12 },
  },
};
const VoipSettings = withRouter<any, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    Form.create()(
      ({
        form: { getFieldDecorator, getFieldsValue, setFieldsValue },
        addVoip,
        voip,
        voipConnected,
        voipDisconnected,
        history,
      }: FormComponentProps &
        RouteComponentProps & {
          voip: State['voip']
          addVoip: typeof addVoipSettings
          voipConnected: typeof setVoipConnected
          voipDisconnected: typeof setVoipDisconnected
        }) => {
        const [logText, setLogText] = useState('');
        const handleClick = useCallback(() => {
          if ((window as any).webphone_api) {
            // ;(window as any).webphone_api.onLoaded(() => {
            const {
              ip, login, password, provider, registar,
            } = getFieldsValue()
            // Set parameters (Replace upper case worlds with your settings)
            ;(window as any).webphone_api.stop();
            (window as any).webphone_api.stopengine();
            (window as any).webphone_api.unregister();
            (window as any).webphone_api.setparameter('serveraddress', ip);
            (window as any).webphone_api.setparameter('username', login);
            (window as any).webphone_api.setparameter('password', password);
            (window as any).webphone_api.start();
            (window as any).webphone_api.register();
            (window as any).webphone_api.onRegistered(() => {
              setLogText('CONNECTED');
              addVoip(provider, ip, login, password, registar);
              voipConnected();
            });
            (window as any).webphone_api.onRegisterFailed(() => {
              voipDisconnected();
            });
            (window as any).webphone_api.onUnRegistered(() => {
              voipDisconnected();
            });
            (window as any).webphone_api.onEvents((event: any) => {
              const eventSplitted = event.split(',');
              console.log('eventSplitted:', eventSplitted);
              if (eventSplitted[0] === 'STATUS' && eventSplitted[1] == '-1') {
                voipDisconnected();
              }
            });

            // })
          }
        }, [addVoip, getFieldsValue, voipConnected]);
        const handleSubmit = useCallback(
          (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            console.log('HANDLE!');
            handleClick();
          },
          [handleClick],
        );
        const [telefonProvider, username, domain, password, registar, voipHeader] = useLanguage(
          'telefonProvider',
          'username',
          'domain',
          'password',
          'registar',
          'voipHeader',
        );
        const { provider } = getFieldsValue(['provider']);
        console.log('provider', provider);
        useEffect(() => {
          if (provider === 'DeutscheTelekom') {
            setFieldsValue({
              domain: 'tel.t-online.de',
            });
          }
        }, [provider]);
        useEffect(() => {
          if (voip) {
            console.log('I AM TRY');
            setFieldsValue(voip);
          }
        }, [voip]);
        useEffect(() => {
          const setted = localStorage.getItem('PPC__pluginSetted');
          if (!setted) {
            localStorage.setItem('PPC__pluginSetted', 'true');
            history.push(`${ROOT_URL}/native/WebPhoneService_Install.exe`);
          }
        }, [history]);
        return (
          <div className="VoipForm">
            <a href={`${ROOT_URL}/native/WebPhoneService_Install.exe`}>СКАЧАТЬ ПЛАГИН</a>
            <Typography.Title level={3}>{voipHeader}</Typography.Title>
            <Form {...formItemLayout} onSubmit={handleSubmit}>
              <Form.Item label={telefonProvider}>
                {getFieldDecorator('provider')(
                  <Select>
                    <Select.Option key="DeutscheTelekom">Deutsche Telekom</Select.Option>
                    <Select.Option key="Vodafone">Vodafone</Select.Option>
                    <Select.Option key="1und1">1und 1</Select.Option>
                    <Select.Option key="O2">O2</Select.Option>
                    <Select.Option key="Andere">Andere</Select.Option>
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label={domain}>
                {getFieldDecorator('ip')(
                  <Input defaultValue={voip ? voip.ip : undefined} placeholder="ip" />,
                )}
              </Form.Item>
              {provider !== 'DeutscheTelekom' && (
                <Form.Item label={username}>
                  {getFieldDecorator('login')(
                    <Input defaultValue={voip ? voip.login : undefined} placeholder="login" />,
                  )}
                </Form.Item>
              )}
              {provider !== 'DeutscheTelekom' && (
                <Form.Item label={password}>
                  {getFieldDecorator('password')(
                    <Input
                      defaultValue={voip ? voip.password : undefined}
                      placeholder="password"
                    />,
                  )}
                </Form.Item>
              )}
              <Form.Item label={registar}>
                {getFieldDecorator('registar')(
                  <Input defaultValue={voip ? voip.password : undefined} placeholder="password" />,
                )}
              </Form.Item>
              <Button style={{ margin: '10px 0' }} type="primary" htmlType="submit">
                Save
              </Button>
            </Form>
            <div>
              Voip Status:
              {' '}
              <Icon
                type="bulb"
                style={{ color: voip && voip.connected ? 'green' : 'grey' }}
                theme="filled"
              />
            </div>
          </div>
        );
      },
    ),
  ),
);

export default VoipSettings;
