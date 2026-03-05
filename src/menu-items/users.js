// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { AppstoreAddOutlined, EnvironmentOutlined, TeamOutlined } from '@ant-design/icons';

// icons
const icons = {
  TeamOutlined,
  AppstoreAddOutlined,
  EnvironmentOutlined
};
// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const users = {
  id: 'group-working-pages',
  title: <FormattedMessage id="Working Pages" />,
  icon: icons.AppstoreAddOutlined,
  type: 'group',
  children: [
    {
      id: 'users',
      title: <FormattedMessage id="Users" />,
      type: 'item',
      url: '/dashboard/users',
      icon: icons.TeamOutlined,
      breadcrumbs: false
    },
    {
      id: 'places',
      title: <FormattedMessage id="Places" />,
      type: 'item',
      url: '/dashboard/places',
      icon: icons.EnvironmentOutlined,
      breadcrumbs: false
    }
  ]
};

export default users;
