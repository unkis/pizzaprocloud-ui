import React from 'react';
import { Divider, Layout, Button } from 'antd';


import './index.css';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import useLanguage from '../../helpers/useLanguage';
import { ROOT_URL } from '../../constants/rootUrl';

const CategorySettings = () => <div>TEST</div>;

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
F9 /
        {articleSettings}
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
        <Button size="large">
F1 /
          {progSettings}
        </Button>
        <Button size="large">
F2 /
          {printSettings}
        </Button>
        <Button size="large">
F3 /
          {userSettings}
        </Button>
        <Button size="large">
F4 /
          {voipSettings}
        </Button>
        <Button size="large">
F5 /
          {menuSettings}
        </Button>
        <Button size="large">
F6 /
          {deliverySettings}
        </Button>
      </Header>
      <Divider />
      <Content>
        <Route exact path={`${ROOT_URL}/settings/category`} component={CategorySettings} />
        <Route path={`${ROOT_URL}/settings/`} exact component={MainMenu} />
      </Content>
    </Layout>
  );
};

export default Settings;
