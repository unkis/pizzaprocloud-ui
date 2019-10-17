import { CollapseType } from 'antd/lib/layout/Sider';
import { RouterProps } from 'react-router';
import { langType } from '../../lang';
import { UserState } from '../../redux/reducersTypes';

interface MenuPageOwnProps {
  collapsed: boolean
  onLangChange: (lang: 'ru' | 'de') => void
}

interface MenuPageProps
  extends MenuPageDispatchProps,
    MenuPageOwnProps,
    MenuPageStateProps,
    RouterProps {}

interface MenuPageStateProps {
  lang: langType
  userRole: UserState['role'] // FIXME
}

interface MenuPageDispatchProps {
  logoutFromUser: () => void
  changeLang: (lang: langType) => void
}
