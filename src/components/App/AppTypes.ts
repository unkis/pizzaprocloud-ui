import { UserState } from '../../redux/reducersTypes';
import { RouteComponentProps } from 'react-router';

export interface AppOwnProps {

};

export interface AppStateProps {
  userRole: UserState['role'];
}

export interface AppProps extends AppStateProps, AppOwnProps, RouteComponentProps {}
