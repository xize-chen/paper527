import firebase from 'firebase/app';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import routes from 'src/config/routes';
import theme from 'src/theme';
import {
  isLoaded,
  isEmpty
} from 'react-redux-firebase';
import { useRoutes } from 'react-router-dom';
import logger from 'src/config/logger';

const App = () => {
  logger().enableLogger();
  const auth = firebase.auth();
  const routing = useRoutes(routes(isLoaded(auth) && !isEmpty(auth.currentUser)));
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
