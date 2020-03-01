import React, { useState, useEffect, useCallback } from 'react';
import {
  Menu, Icon, Typography, Radio,
} from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { LeftMenu as LeftMenuNew, Buttons } from '../LeftMenu2';
import './Menu.css';

import { ClickParam } from 'antd/lib/menu';
import { langMap } from '../../lang';
import { logoutUser, changeLanguage } from '../../redux/actions';

import { State } from '../../redux/types';
import {
  MenuPageProps, MenuPageStateProps, MenuPageDispatchProps, MenuPageOwnProps,
} from './types';

import { ROOT_URL } from '../../constants/rootUrl';
import { Header } from '../Header';

const { Text } = Typography;

const MenuPage = ({
  lang,
  userRole,
  logoutFromUser,
  changeLang,
  history,
  collapsed,
  onLangChange,
  email,
  voip,
  children,
}: MenuPageProps) => {
  const [language, setLanguage] = useState(langMap[lang]);

  useEffect(() => {
    setLanguage(langMap[lang]);
    onLangChange(lang);
  }, [lang, setLanguage]);

  const logout = useCallback(
    (e: ClickParam) => {
      localStorage.clear();
      // logout();
      window.location.replace(
        `https://www.liefersoft.de:9011/oauth2/logout?telnantId=eadff3cc-6ec6-40a8-b8ca-9403a933cd4f&client_id=d6ef13df-7f85-4cca-9de3-502377ca9a88&post_logout_redirect_uri=${window.location.origin}/login`,
      );
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
  const handleButtonClick = useCallback(
    (button: Buttons, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      switch (button) {
        case Buttons.DELIVERY: {
          return onAnyButtonClick(onDeliveryClick)(event);
        }
        case Buttons.CART:
        case Buttons.DRIVER_MONITOR:
        case Buttons.KITCHEN_MONITOR:
        case Buttons.REPORTS: {
          return onAnyButtonClick()(event);
        }
      }
    },
    [onDeliveryClick, onAnyButtonClick],
  );
  return (
    <>
      <Header
        onHelpClick={console.log}
        onLogoutClick={onAnyButtonClick(logout)}
        onSettingsClick={onAnyButtonClick(onSettingsClick)}
      />
      <div className="App-Main">
        <LeftMenuNew onButtonClick={handleButtonClick} />
        {children}
      </div>
    </>
  );
};

const mapStatetoProps: MapStateToProps<MenuPageStateProps, MenuPageOwnProps, State> = (state) => ({
  lang: state.languages.lang,
  userRole: state.user.role,
  email: state.auth.email,
  voip: state.voip,
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
)(withRouter<RouteComponentProps<any>, any>(MenuPage)); // FIXME
