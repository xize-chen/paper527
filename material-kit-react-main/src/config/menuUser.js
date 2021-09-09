import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  PieChart
} from 'react-feather';

import InputIcon from '@material-ui/icons/Input';
import paths from 'src/constants/route_path';

const items = [
  {
    href: paths.dashboard,
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: paths.dashboard_total,
    icon: PieChart,
    title: 'Total'
  },
  {
    href: paths.dashboard_compare,
    icon: PieChart,
    title: 'Compare'
  },
  {
    href: paths.account,
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: paths.settings,
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: paths.login,
    icon: InputIcon,
    title: 'Sign Out'
  },
];

export default items;
