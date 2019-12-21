import { UserState } from '../../redux/reducersTypes'
import { RouteComponentProps } from 'react-router'
import { State } from '../../redux/types'

export interface AppOwnProps {}

export interface AppStateProps {
  userRole: UserState['role']
  voip: State['voip']
}

export interface AppProps extends AppStateProps, AppOwnProps, RouteComponentProps {}
