import React, { useState, useCallback, useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';

import { Layout } from 'antd';
import { connect, MapStateToProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import DeliveryForm from '../../components/DeliveryForm';

// types

import { Auth } from '../../components/Auth';
import Cart from '../../components/Cart';
import { LeftMenu } from '../../components/LeftMenu';
import Settings from '../../components/Settings';

import { ROOT_URL } from '../../constants/rootUrl';

import { State } from '../../redux/types';
import { AppOwnProps, AppStateProps, AppProps } from './AppTypes';

import { LanguageCtx } from '../../helpers/useLanguage';
import { langMap } from '../../lang';

const { Sider } = Layout;

const Redirect = () => {
  window.location.href = `${ROOT_URL}/login`;
  return null;
};

const App = ({ userRole, history }: AppProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [lang, setLang] = useState<'ru' | 'de'>('ru');
  const [language, setLanguage] = useState(langMap[lang]);

  useEffect(() => {
    // if (!userRole) {
    //   history.push(`${ROOT_URL}/`);
    // }
  }, [userRole, history]);

  useEffect(() => {
    setLanguage(langMap[lang]);
  }, [lang]);

  const handleCollapse = useCallback(
    (collapsed: boolean) => {
      setCollapsed(collapsed);
    },
    [setCollapsed],
  );

  return (
    <LanguageCtx.Provider value={language}>
      <Layout
        style={{ minHeight: '100vh', '--left-menu-width': collapsed ? '80px' : '200px' } as any}
      >
        {window.location.pathname !== `${ROOT_URL}/`
          && window.location.pathname !== `${ROOT_URL}/login` && (
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
        <Route path={`${ROOT_URL}/menu`} component={DeliveryForm} />
        <Route path={`${ROOT_URL}/settings`} component={Settings} />
        <Route path={`${ROOT_URL}/index.html`} exact component={Auth} />
        <Route path={`${ROOT_URL}/`} exact component={Redirect} />
        <Route path={`${ROOT_URL}/login`} exact component={Auth} />
        <Route path={`${ROOT_URL}/finish`} component={Cart} />
      </Layout>
    </LanguageCtx.Provider>
  );
};

const mapStatetoProps: MapStateToProps<AppStateProps, AppOwnProps, State> = (state) => ({
  userRole: state.user.role,
});

export default connect(mapStatetoProps)(
  withRouter<RouteComponentProps<AppOwnProps & AppStateProps>, any>(App),
); // FIXME
