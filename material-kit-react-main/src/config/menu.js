import menuAdmin from './menuAdmin';
import menuUser from './menuUser';
import currentUser from './currentUser';

const menu = () => {
  console.log(currentUser().name);
  if (currentUser().name.includes('admin')) {
    return menuAdmin;
  }
  return menuUser;
};

export default menu;
