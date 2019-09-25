import React, { useState, useCallback, useEffect } from 'react';
import { Route } from "react-router-dom";

import { Layout } from 'antd';
import DeliveryForm from '../../components/DeliveryForm';

import { withRouter } from 'react-router-dom';
import { connect} from 'react-redux';

//types

import { Auth } from '../../components/Auth';
import Cart from '../../components/Cart';
import { LeftMenu } from '../../components/LeftMenu';

import { ROOT_URL } from '../../constants/rootUrl';

import { RouteComponentProps } from 'react-router';
import { MapStateToProps } from 'react-redux';

import { State } from '../../redux/types';
import { AppOwnProps, AppStateProps, AppProps } from './AppTypes';

const { Sider } = Layout;

const App = ({ userRole, history }: AppProps) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!userRole) {
      history.push(`${ROOT_URL}/`);
    }
  }, [userRole]);

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
        <LeftMenu collapsed={collapsed}/>
    </Sider>}
          <Route path={`${ROOT_URL}/menu`} component={DeliveryForm} />
          <Route path={`${ROOT_URL}/index.html`} exact component={Auth} />
          <Route path={`${ROOT_URL}/`} exact component={Auth} />
          <Route path={`${ROOT_URL}/finish`} component={Cart} />
    </Layout>
  );
};

const mapStatetoProps: MapStateToProps<AppStateProps, AppOwnProps, State> = (state) => {
  return {
    userRole: state.user.role
  }
};

export default connect(
  mapStatetoProps
)(withRouter<RouteComponentProps<AppOwnProps & AppStateProps>, any>(App));//FIXME
