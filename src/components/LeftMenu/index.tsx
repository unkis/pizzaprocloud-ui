import React, { useState, useEffect, useCallback } from 'react';
import {
  Menu, Icon, Typography, Radio,
} from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';

import './Menu.css';

import { ClickParam } from 'antd/lib/menu';
import { langMap } from '../../lang';
import { logoutUser, changeLanguage } from '../../redux/actions';

import { State } from '../../redux/types';
import {
  MenuPageProps, MenuPageStateProps, MenuPageDispatchProps, MenuPageOwnProps,
} from './types';

import { ROOT_URL } from '../../constants/rootUrl';

const { Text } = Typography;

const MenuPage = ({
  lang,
  userRole,
  logoutFromUser,
  changeLang,
  history,
  collapsed,
  onLangChange,
}: MenuPageProps) => {
  const [language, setLanguage] = useState(langMap[lang]);

  useEffect(() => {
    setLanguage(langMap[lang]);
    onLangChange(lang);
  }, [lang, setLanguage]);

  const logout = useCallback(
    (e: ClickParam) => {
      logoutFromUser();
      history.push(`${ROOT_URL}/`);
    },
    [logoutFromUser, history],
  );

  const onSettingsClick = useCallback(
    (e: ClickParam) => {
      history.push(`${ROOT_URL}/settings`);
    },
    [history],
  );

  const handleLangChange = useCallback(
    (e: RadioChangeEvent) => {
      const {
        target: { value },
      } = e;
      changeLang(value);
    },
    [changeLang],
  );
  const onAnyButtonClick = useCallback(
    (fn?: any) => (event: any) => {
      if ((window as any).PPC && (window as any).PPC.onClick) {
        (window as any).PPC.onClick(event);
        event && event.preventDefault && event.preventDefault();
      } else {
        fn && fn(event);
      }
    },
    [],
  );

  const onDeliveryClick = useCallback(() => {
    history.push(`${ROOT_URL}/menu`);
  }, []);

  return (
    <div className="menu">
      <Menu style={{ height: '100vh' }} defaultSelectedKeys={['2']} mode="inline">
        <Menu.Item disabled>
          <Icon type="tag" />
          {!collapsed && (
            <Radio.Group value={lang} onChange={handleLangChange}>
              <Radio.Button value="ru">ru</Radio.Button>
              <Radio.Button value="de">de</Radio.Button>
            </Radio.Group>
          )}
        </Menu.Item>
        <Menu.Item key="1" onClick={onAnyButtonClick(logout)} className="logout-button">
          <Icon type="logout" />
          <span>{language.logout}</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={onAnyButtonClick(onDeliveryClick)}>
          <Icon type="phone" />
          <span>{language.callForm}</span>
        </Menu.Item>
        <Menu.Item key="3" onClick={onAnyButtonClick()}>
          <Icon type="shopping-cart" />
          <span>{language.allOrders}</span>
        </Menu.Item>
        <Menu.Item key="4" onClick={onAnyButtonClick()}>
          <Icon type="dashboard" />
          <span>{language.cookingMonitor}</span>
        </Menu.Item>
        <Menu.Item key="5" onClick={onAnyButtonClick()}>
          <Icon type="car" />
          <span>{language.carMonitor}</span>
        </Menu.Item>
        <Menu.Item key="6" onClick={onAnyButtonClick()}>
          <Icon type="bar-chart" />
          <span>{language.report}</span>
        </Menu.Item>
        <Menu.Item key="7" onClick={onAnyButtonClick(onSettingsClick)}>
          <Icon type="setting" />
          <span>{language.settings}</span>
        </Menu.Item>
        <Menu.Item key="8" onClick={onAnyButtonClick()}>
          <Icon type="question-circle" />
          <span>{language.help}</span>
        </Menu.Item>
      </Menu>
      <Text
        style={{ textAlign: 'center', paddingBottom: '20px', borderRight: '1px solid #e8e8e8' }}
      >
        {userRole}
      </Text>
    </div>
  );
};

const mapStatetoProps: MapStateToProps<MenuPageStateProps, MenuPageOwnProps, State> = (state) => ({
  lang: state.languages.lang,
  userRole: state.user.role,
});

const mapDispatchToProps: MapDispatchToPropsFunction<MenuPageDispatchProps, MenuPageOwnProps> = (
  dispatch,
) => ({
  logoutFromUser() {
    dispatch(logoutUser());
  },
  changeLang(lang: 'ru' | 'de') {
    dispatch(changeLanguage(lang));
  },
});

export const LeftMenu = connect(
  mapStatetoProps,
  mapDispatchToProps,
)(
  withRouter<
    RouteComponentProps<MenuPageDispatchProps & MenuPageOwnProps & MenuPageStateProps>,
    any
  >(MenuPage),
); // FIXME
