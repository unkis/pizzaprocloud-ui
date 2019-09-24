import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';

import './index.css';

import { Menu, Icon, Layout, Radio } from 'antd';
import DeliveryForm from './components/DeliveryForm';

import { withRouter } from 'react-router-dom';
import { connect} from 'react-redux';
import { logoutUser, changeLanguage } from './redux/actions';

//types
import { ClickParam } from 'antd/lib/menu';

import { langMap } from './lang';

import { Auth } from './components/Auth';
import Cart from './components/Cart';

import store from './redux';

import { ROOT_URL } from './constants/rootUrl';

import { Typography } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { RouteComponentProps } from 'react-router';
import { MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';

import './components/LeftMenu/Menu.css';

import { State } from './redux/types';
import { MenuPageProps, MenuPageStateProps, MenuPageDispatchProps, MenuPageOwnProps } from './components/LeftMenu/types';

const { Sider } = Layout;

const { Text } = Typography;

const App = ({ lang, userRole, logoutFromUser, changeLang, history }: MenuPageProps) => {
  const [language, setLanguage] = useState(langMap[lang]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setLanguage(langMap[lang]);
  }, [lang, setLanguage]);

  useEffect(() => {
    if (!userRole) {
      history.push(`${ROOT_URL}/`);
    }
  }, [userRole]);

  const logout = useCallback((e: ClickParam) => {
    logoutFromUser();
    history.push(`${ROOT_URL}/`);
  }, [logoutFromUser, history]);

  const handleLangChange = useCallback((e: RadioChangeEvent) => {
    const { target: { value } } = e;
    changeLang(value);
  }, [changeLang]);

  const handleCollapse = useCallback((collapsed: boolean) => {
    setCollapsed(collapsed);
  }, [setCollapsed]);

  return (
    <Layout style={{ minHeight: '100vh','--left-menu-width': collapsed ? '80px' : '200px' } as any}>
      {window.location.pathname !==  `${ROOT_URL}/` && <Sider collapsible onCollapse={handleCollapse} theme="light" style={{
        overflow: 'auto',
        height: '100vh',
        left: 0,
      }}>
        <div className="menu">
          <Menu style={{ height: '100vh' }} defaultSelectedKeys={['2']} mode="inline">
            <Menu.Item disabled>
              <Icon type="tag" />
              {!collapsed && <Radio.Group value={lang} onChange={handleLangChange}>
                <Radio.Button value="ru">ru</Radio.Button>
                <Radio.Button value="de">de</Radio.Button>
              </Radio.Group>}
            </Menu.Item>
            <Menu.Item key="1" onClick={logout} className="logout-button">
              <Icon type="logout" />
              <span>{language.logout}</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="phone" />
              <span>{language.callForm}</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="shopping-cart" />
              <span>{language.allOrders}</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="dashboard" />
              <span>{language.cookingMonitor}</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="car" />
              <span>{language.carMonitor}</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="bar-chart" />
              <span>{language.report}</span>
            </Menu.Item>
            <Menu.Item key="7">
              <Icon type="setting" />
              <span>{language.settings}</span>
            </Menu.Item>
            <Menu.Item key="8">
              <Icon type="question-circle" />
              <span>{language.help}</span>
            </Menu.Item>
          </Menu>
          <Text style={{ textAlign: 'center', paddingBottom: '20px', borderRight: '1px solid #e8e8e8' }}>{userRole}</Text>
        </div>
    </Sider>}
          <Route path={`${ROOT_URL}/menu`} component={DeliveryForm} />
          <Route path={`${ROOT_URL}/index.html`} exact component={Auth} />
          <Route path={`${ROOT_URL}/`} exact component={Auth} />
          <Route path={`${ROOT_URL}/finish`} component={Cart} />
    </Layout>
  );
};

const mapStatetoProps: MapStateToProps<MenuPageStateProps, MenuPageOwnProps, State> = (state) => {
  return {
    formDataState: state.formDataState,
    lang: state.languages.lang,
    userRole: state.user.role
  }
};

const mapDispatchToProps: MapDispatchToPropsFunction<MenuPageDispatchProps, MenuPageOwnProps> = (dispatch) => ({
  logoutFromUser() {
    dispatch(logoutUser());
  },
  changeLang(lang: 'ru' | 'de') {
    dispatch(changeLanguage(lang));
  }
});

export const AppWithConnect = connect(
  mapStatetoProps,
  mapDispatchToProps
)(withRouter<RouteComponentProps<MenuPageDispatchProps & MenuPageOwnProps & MenuPageStateProps>, any>(App));//FIXME

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <AppWithConnect />
    </Provider>
  </Router>,
  document.getElementById('root')
);
