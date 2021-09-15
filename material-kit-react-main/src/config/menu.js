import menuAdmin from './menuAdmin';
import menuUser from './menuUser';
import currentUser from './currentUser';

const menu = () => {
  console.log(currentUser().email);
  if (currentUser().email.includes('admin')) {
    return menuAdmin;
  }
  return menuUser;
};

export default menu;
