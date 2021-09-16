import {
  BarChart as BarChartIcon,
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
    href: paths.account,
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: paths.login,
    icon: InputIcon,
    title: 'Sign Out'
  },
];

export default items;
