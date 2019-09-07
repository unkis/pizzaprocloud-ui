import React, { useState, useEffect, useCallback } from 'react';
import { Menu, Icon, Layout, Typography, Button, Divider, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';

import './Menu.css';

import { langMap } from '../../lang';
import { logoutUser, changeLanguage } from '../../redux/actions';


import DeliveryForm from '../DeliveryForm';

import { State } from '../../redux/types';
import { MenuPageProps, MenuPageStateProps, MenuPageDispatchProps, MenuPageOwnProps } from './types';
import { ClickParam } from 'antd/lib/menu';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;



const MenuPage = ({ lang, userRole, logoutFromUser, changeLang, history }: MenuPageProps) => {
  const [language, setLanguage] = useState(langMap[lang]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setLanguage(langMap[lang]);
  }, [lang, setLanguage]);

  useEffect(() => {
    setLanguage(langMap[lang]);
  }, [lang]);

  const logout = useCallback((e: ClickParam) => {
    logoutFromUser();
    history.push('./');
  }, [logoutFromUser, history]);

  const handleLangChange = useCallback((e: RadioChangeEvent) => {
    const { target: { value } } = e;
    changeLang(value);
  }, [changeLang]);

  const handleCollapse = useCallback((collapsed: boolean) => {
    setCollapsed(collapsed);
  }, [setCollapsed]);

  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Sider collapsible onCollapse={handleCollapse} theme="light" style={{
      overflow: 'auto',
      height: '100vh',
      left: 0,
    }}>
        <div className="menu">
          <Menu style={{height: '100vh'}} defaultSelectedKeys={['2']} mode="inline">
            <Menu.Item disabled>
              <Icon type="tag" />
              {!collapsed && <Radio.Group value={lang} onChange={handleLangChange}>
                <Radio.Button value="ru">ru</Radio.Button>
                <Radio.Button value="de">de</Radio.Button>
              </Radio.Group>}
            </Menu.Item>
            <Menu.Item key="1" onClick={logout}>
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
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', marginTop: '24px', height: 'auto', display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-around' }}>
          <Button type="dashed" size="large">{language.tableOrders}</Button>
          <Button type="dashed" size="large">{language.selfPickUp}</Button>
          <Button type="dashed" size="large">{language.sales}</Button>
          <Button type="dashed" size="large">{language.phoneMonitor}</Button>
        </Header>
        <Divider/>
        <Content style={{ margin: '0 16px', background: 'inherit'  }}>
          <DeliveryForm langMap={language} />
        </Content>
      </Layout>
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

export const LeftMenu = connect(
  mapStatetoProps,
  mapDispatchToProps
)(withRouter<RouteComponentProps<MenuPageDispatchProps & MenuPageOwnProps & MenuPageStateProps>, any>(MenuPage));//FIXME
