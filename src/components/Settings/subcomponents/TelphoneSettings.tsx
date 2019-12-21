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
          // ;(window as any).webphone_api.onLoaded(() => {
            const { ip, login, password } = getFieldsValue()
            // Set parameters (Replace upper case worlds with your settings)
            ;(window as any).webphone_api.stop();
            ;(window as any).webphone_api.stopengine();
            ;(window as any).webphone_api.unregister();
            ;(window as any).webphone_api.setparameter('serveraddress', ip)
            ;(window as any).webphone_api.setparameter('username', login)
            ;(window as any).webphone_api.setparameter('password', password)
            ;(window as any).webphone_api.start()
            ;(window as any).webphone_api.register()
            ;(window as any).webphone_api.onStart(() => {
              setLogText('CONNECTED')
              addVoip(ip, login, password)
            })
          // })
        }
      }, [addVoip, getFieldsValue])
      const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("HANDLE!")
        handleClick()
      }, [handleClick])
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
