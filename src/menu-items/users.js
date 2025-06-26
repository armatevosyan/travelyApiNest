// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  BuildOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  AppstoreOutlined
} from '@ant-design/icons';

// icons
const icons = {
  TeamOutlined,
  BuildOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  FileTextOutlined,
  AppstoreOutlined
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
      id: 'products',
      title: <FormattedMessage id="Products" />,
      type: 'item',
      url: '/dashboard/products',
      icon: icons.AppstoreOutlined,
      breadcrumbs: false
    }
  ]
};

export default users;
