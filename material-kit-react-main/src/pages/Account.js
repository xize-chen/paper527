import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import sessionKey from 'src/constants/sessionKey';
import currentUser from 'src/config/currentUser';

const Account = () => {
  const session = window.sessionStorage;
  const [accountVal, setAccountVal] = useState(() => {
    if (session.getItem(sessionKey.ACCOUNT_KEY) == null) {
      return {
        email: currentUser().email.slice(1, -1),
        first_name: '',
        last_name: '',
        country: ''
      };
    }
    const account = JSON.parse(session.getItem(sessionKey.ACCOUNT_KEY));
    return account;
  });

  return (
    <>
      <Helmet>
        <title>Account | Task</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile account={accountVal} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails account={accountVal} update={setAccountVal} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
