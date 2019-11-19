import React, { useCallback } from 'react';
import { Divider, Layout, Button } from 'antd';

import './index.css';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import useLanguage from '../../helpers/useLanguage';
import { ROOT_URL } from '../../constants/rootUrl';
import CategorySettings from './subcomponents/CategorySettings';
import PrinterSettings from './subcomponents/PrinterSettings';
import ArticleSettings from './subcomponents/ArticleSettings';

const MainMenu = () => {
  const [categorySettings, articleSettings, saleCategorySettings, setMenu] = useLanguage(
    'categorySettings',
    'articleSettings',
    'saleCategorySettings',
    'setMenu',
  );
  return (
    <div className="Settings-Buttons">
      <Button className="Button_xl">
        <Link to={`${ROOT_URL}/settings/category`}>
F8 /
          {categorySettings}
        </Link>
      </Button>
      <Button className="Button_xl">
        <Link to={`${ROOT_URL}/settings/article`}>
F9 /
          {articleSettings}
        </Link>
      </Button>
      <Button className="Button_xl">
F10 /
        {saleCategorySettings}
      </Button>
      <Button className="Button_xl">{setMenu}</Button>
    </div>
  );
};

const { Header, Content } = Layout;
const Settings = () => {
  const [
    progSettings,
    printSettings,
    userSettings,
    voipSettings,
    menuSettings,
    deliverySettings,
  ] = useLanguage(
    'progSettings',
    'printSettings',
    'userSettings',
    'voipSettings',
    'menuSettings',
    'deliverySettings',
  );
  const onAnyButtonClick = useCallback((event: any) => {
    if ((window as any).PPC && (window as any).PPC.onClick) {
      (window as any).PPC.onClick(event);
      event.preventDefault();
    }
  }, []);
  return (
    <Layout>
      <Header
        style={{
          background: '#fff',
          marginTop: '24px',
          height: 'auto',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-around',
        }}
      >
        <Button size="large" onClick={onAnyButtonClick}>
          F1 /
          {progSettings}
        </Button>
        <Button size="large" onClick={onAnyButtonClick}>
          <Link to={`${ROOT_URL}/settings/printer`}>
F2 /
            {printSettings}
          </Link>
        </Button>
        <Button size="large" onClick={onAnyButtonClick}>
          F3 /
          {userSettings}
        </Button>
        <Button size="large" onClick={onAnyButtonClick}>
          F4 /
          {voipSettings}
        </Button>
        <Button size="large" onClick={onAnyButtonClick}>
          F5 /
          {menuSettings}
        </Button>
        <Button size="large" onClick={onAnyButtonClick}>
          F6 /
          {deliverySettings}
        </Button>
      </Header>
      <Divider />
      <Content>
        <Route exact path={`${ROOT_URL}/settings/category`} component={CategorySettings} />
        <Route exact path={`${ROOT_URL}/settings/article`} component={ArticleSettings} />
        <Route exact path={`${ROOT_URL}/settings/printer`} component={PrinterSettings} />
        <Route path={`${ROOT_URL}/settings/`} exact component={MainMenu} />
      </Content>
    </Layout>
  );
};

export default Settings;
