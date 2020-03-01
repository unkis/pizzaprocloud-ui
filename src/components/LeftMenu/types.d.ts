import { CollapseType } from 'antd/lib/layout/Sider';
import { RouterProps } from 'react-router';
import { langType } from '../../lang';
import { UserState } from '../../redux/reducersTypes';
import { State } from '../../redux/types';

interface MenuPageOwnProps {
  collapsed: boolean
  onLangChange: (lang: 'ru' | 'de') => void
  children?: any
}

interface MenuPageProps
  extends MenuPageDispatchProps,
    MenuPageOwnProps,
    MenuPageStateProps,
    RouterProps {}

interface MenuPageStateProps {
  lang: langType
  userRole: UserState['role'] // FIXME
  email?: string
  voip: State['voip']
}

interface MenuPageDispatchProps {
  logoutFromUser: () => void
  changeLang: (lang: langType) => void
}
