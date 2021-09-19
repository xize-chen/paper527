import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useFirebase } from 'react-redux-firebase';
import paths from 'src/constants/route_path';
import service from 'src/services/Server';

const Login = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const auth = firebase.auth();
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  const emailLogin = (credentials, { setSubmitting, setErrors }) => {
    setErrorMsg('');
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(async () => {
          // Signed in
          const start = Date.now();
          await service.getAccount(credentials.email);
          console.log(`time consumed: ${Date.now() - start}`);
          navigate(paths.dashboard);
        })
        .catch((error) => {
          console.log(`error: ${error}`);
          setSubmitting(false);
          if (error === undefined || error.code === undefined) {
            return;
          }
          if (error.code.includes('password')) {
            setErrors({ password: error.message });
          } else if (error.code.includes('user')) {
            setErrors({ email: error.message });
          } else {
            setErrorMsg(error.message);
            setAlertOpen(true);
          }
        }));
  };

  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={emailLogin}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    to browse Covid-19 dashboard
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                  <Snackbar
                    open={alertOpen}
                    autoHideDuration={2000}
                    onClose={handleAlertClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'center'
                    }}
                  >
                    <Alert onClose={handleAlertClose} severity="error">
                      {errorMsg}
                    </Alert>
                  </Snackbar>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?
                  {' '}
                  <Link component={RouterLink} to={paths.register} variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
