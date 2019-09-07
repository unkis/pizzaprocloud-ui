import { CollapseType } from 'antd/lib/layout/Sider';
import { RouterProps } from 'react-router';
import { langType } from '../../lang';
import { FormDataStateType  } from '../../redux/reducersTypes';

interface MenuPageOwnProps {

};

interface MenuPageProps extends MenuPageDispatchProps, MenuPageOwnProps, MenuPageStateProps, RouterProps {};

interface MenuPageStateProps {
  formDataState: FormDataStateType;
  lang: langType;
  userRole: string;//FIXME
};


interface MenuPageDispatchProps {
  logoutFromUser: () => void;
  changeLang: (lang: langType) => void;
};
