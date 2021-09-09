import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  User as UserIcon,
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
    icon: BarChartIcon,
    title: 'total'
  },
  {
    href: paths.dashboard_compare,
    icon: BarChartIcon,
    title: 'compare'
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
