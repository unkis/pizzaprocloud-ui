import React, { useState, useCallback, useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'

import { Layout, Modal, notification } from 'antd'
import { connect, MapStateToProps } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import DeliveryForm from '../../components/DeliveryForm'

// types
// @ts-ignore
// import '../../webphone-api/webphone_api';
import { Auth } from '../../components/Auth'
import Cart from '../../components/Cart'
import { LeftMenu } from '../../components/LeftMenu'
import Settings from '../../components/Settings'

import { ROOT_URL } from '../../constants/rootUrl'

import { State } from '../../redux/types'
import { AppOwnProps, AppStateProps, AppProps } from './AppTypes'

import { LanguageCtx } from '../../helpers/useLanguage'
import { langMap } from '../../lang'

const { Sider } = Layout

const Redirect = () => {
  window.location.href = `${ROOT_URL}/login`
  return null
}

const Download = withRouter(({ history, location, match }: RouteComponentProps<{ id: string }>) => (
  <Modal
    visible
    onOk={() => history.push(`${ROOT_URL}/menu`)}
    onCancel={() => history.push(`${ROOT_URL}/menu`)}
  >
    <a href={`${ROOT_URL}/${match.params.id}`}>СКАЧАТЬ ПЛАГИН</a>
  </Modal>
))
// const Logs = () => {
//   const [logs, setLogs] = useState('')
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if ((window as any).webphone_api) {
//         ;(window as any).webphone_api.onLoaded(() => {
//           setLogs((prev) => `${prev}LOADED\n`)
//           // Set parameters (Replace upper case worlds with your settings)
//           ;(window as any).webphone_api.setparameter('serveraddress', '192.168.178.1')
//           ;(window as any).webphone_api.setparameter('username', 'pizzapro')
//           ;(window as any).webphone_api.setparameter('password', 'pizzapro1234')
//           ;(window as any).webphone_api.start()
//           ;(window as any).webphone_api.onCallStateChange((...args: any[]) => {
//             setLogs((prev) => `${prev}SIP onCallStateChange: ${args}\n`)
//             if (args[0] && args[0] === 'callSetup') {
//               setLogs((prev) => `${prev}PEERNAME: ${args[2]}\n`)
//             }
//           })
//           ;(window as any).webphone_api.onEvents((...args: any[]) =>
//             setLogs((prev) => `${prev}Eventargs: ${args}\n`),
//           )
//         })
//       }
//     }, 2000)
//     return () => clearTimeout(timeoutId)
//   }, [])
//   return <div>{logs}</div>
// }
const App = ({ userRole, history, voip }: AppProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const [lang, setLang] = useState<'ru' | 'de'>('ru')
  const [language, setLanguage] = useState(langMap[lang])
  useEffect(() => {
    function renderNotification(event: {
      detail: { message: string; description: string }
      [key: string]: any
    }) {
      console.log(event)
      notification.error(event.detail)
    }
    function pushState({ detail: { page } }: any) {
      history.push(page)
    }
    window.addEventListener('notification', renderNotification as any)
    window.addEventListener('pushPage', pushState)
    return () => {
      window.removeEventListener('notification', renderNotification as any)
      window.removeEventListener('pushPage', pushState as any)
    }
  }, [])
  useEffect(() => {
    // if (!userRole) {
    //   history.push(`${ROOT_URL}/`);
    // }
  }, [userRole, history])
  useEffect(() => {
    if (voip) {
      window.onload = () => {
        if ((window as any).webphone_api) {
          ;(window as any).webphone_api.onLoaded(() => {
            // Set parameters (Replace upper case worlds with your settings)
            ;(window as any).webphone_api.setparameter('serveraddress', voip.ip)
            ;(window as any).webphone_api.setparameter('username', voip.login)
            ;(window as any).webphone_api.setparameter('password', voip.password)
            ;(window as any).webphone_api.start()
            ;(window as any).webphone_api.onCallStateChange((...args: any[]) => {
              console.log('SIP onCallStateChange: ', args)
              if (args[0] && args[0] === 'callSetup') {
                console.log('PEERNAME: ', args[2])
              }
            })
          })
        }
      }
    }
  }, [voip])
  useEffect(() => {
    setLanguage(langMap[lang])
  }, [lang])

  const handleCollapse = useCallback(
    (collapsed: boolean) => {
      setCollapsed(collapsed)
    },
    [setCollapsed],
  )

  return (
    <LanguageCtx.Provider value={language}>
      <Layout
        style={{ minHeight: '100vh', '--left-menu-width': collapsed ? '80px' : '200px' } as any}
      >
        {window.location.pathname !== `${ROOT_URL}/` &&
          window.location.pathname !== `${ROOT_URL}/login` && (
            <Sider
              collapsible
              onCollapse={handleCollapse}
              theme="light"
              style={{
                overflow: 'auto',
                height: '100vh',
                left: 0,
              }}
            >
              <LeftMenu collapsed={collapsed} onLangChange={setLang as any} />
            </Sider>
          )}
        <Route path={`${ROOT_URL}/native/:id`} component={Download} />
        {/* <Route path={`${ROOT_URL}/logs`} component={Logs} /> */}
        <Route path={`${ROOT_URL}/menu`} component={DeliveryForm} />
        <Route path={`${ROOT_URL}/settings`} component={Settings} />
        <Route path={`${ROOT_URL}/index.html`} exact component={Auth} />
        <Route path={`${ROOT_URL}/`} exact component={Redirect} />
        <Route path={`${ROOT_URL}/logout`} exact component={Redirect} />
        <Route path={`${ROOT_URL}/login`} exact component={Auth} />
        <Route path={`${ROOT_URL}/finish`} component={Cart} />
      </Layout>
    </LanguageCtx.Provider>
  )
}

const mapStatetoProps: MapStateToProps<AppStateProps, AppOwnProps, State> = (state) => ({
  userRole: state.user.role,
  voip: state.voip,
})

export default connect(mapStatetoProps)(
  withRouter<RouteComponentProps<AppOwnProps & AppStateProps>, any>(App),
) // FIXME
