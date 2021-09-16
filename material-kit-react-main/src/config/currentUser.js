const user = () => {
  const session = window.sessionStorage;
  let currentUser = {};
  for (let i = 0; i < session.length; i++) {
    if (session.key(i).includes('firebase')) {
      currentUser = JSON.parse(session.getItem(session.key(i)));
      break;
    }
  }
  return {
    email: currentUser === null ? '' : currentUser.email,
    // uid: currentUser === null ? '' : JSON.stringify(currentUser.uid),
    // isAdmin: currentUser === null ? false : JSON.stringify(currentUser.email).includes('admin'),
  };
};

export default user;
