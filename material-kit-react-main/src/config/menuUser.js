import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  User as UserIcon,
} from 'react-feather';

import paths from 'src/constants/route_path';

const items = [
  {
    href: paths.dashboard,
    icon: BarChartIcon,
    title: 'Dashboard'
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
];

export default items;
