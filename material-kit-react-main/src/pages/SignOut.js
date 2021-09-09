import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useFirebase } from 'react-redux-firebase';
import MSG_SIGN_OUT from 'src/constants/info';
import ResponseDialog from 'src/components/statistic/ResponseDialog';
import paths from 'src/constants/route_path';

const SignOut = ({ open, close }) => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const auth = firebase.auth();

  const handleSignOut = () => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => auth.signOut().then(() => {
        // Sign-out successful.
        window.sessionStorage.clear();
        navigate(paths.login, { replace: true });
      }).catch((error) => {
        // An error happened.
        console.error(error);
      }));
  };
  return (
    <ResponseDialog
      open={open}
      handleClose={close}
      message={MSG_SIGN_OUT}
      callback={handleSignOut}
    />
  );
};

SignOut.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func
};
export default SignOut;
