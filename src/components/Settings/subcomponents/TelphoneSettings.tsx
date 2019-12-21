import React, { useCallback, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import './TelphoneSettings.css'
import { connect } from 'react-redux'
import { State } from '../../../redux/types'
import { addVoipSettings } from '../../../redux/actions'

const mapStateToProps = (state: State) => {
  return {
    voip: state.voip,
  }
}
const mapDispatchToProps = {
  addVoipSettings,
}

const VoipSettings = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  Form.create()(
    ({
      form: { getFieldDecorator, getFieldsValue },
      addVoip,
      voip,
    }: FormComponentProps & { voip: State['voip']; addVoip: typeof addVoipSettings }) => {
      const [logText, setLogText] = useState('')
      const handleClick = useCallback(() => {
        if ((window as any).webphone_api) {
          ;(window as any).webphone_api.onLoaded(() => {
            // Set parameters (Replace upper case worlds with your settings)
            ;(window as any).webphone_api.setparameter('serveraddress', '192.168.178.1')
            ;(window as any).webphone_api.setparameter('username', 'pizzapro')
            ;(window as any).webphone_api.setparameter('password', 'pizzapro1234')
            ;(window as any).webphone_api.start()
            ;(window as any).webphone_api.register()
            ;(window as any).webphone_api.onStart(() => {
              setLogText('CONNECTED')
              const { ip, login, password } = getFieldsValue()
              addVoip(ip, login, password)
            })
          })
        }
      }, [])
      const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        handleClick()
      }, [])
      return (
        <div className="VoipForm">
          <Form onSubmit={handleSubmit}>
            <Form.Item label="Ip">
              {getFieldDecorator('ip')(
                <Input defaultValue={voip ? voip.ip : undefined} placeholder="ip" />,
              )}
            </Form.Item>
            <Form.Item label="Login">
              {getFieldDecorator('login')(
                <Input defaultValue={voip ? voip.login : undefined} placeholder="login" />,
              )}
            </Form.Item>
            <Form.Item label="Password">
              {getFieldDecorator('password')(
                <Input defaultValue={voip ? voip.password : undefined} placeholder="password" />,
              )}
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form>
          <div>{logText}</div>
        </div>
      )
    },
  ),
)

export default VoipSettings
