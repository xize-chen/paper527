import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
// import Server from 'src/services/Server';
import sessionKey from 'src/constants/sessionKey';

const clone = require('clone');

// const service = new Server();
const Account = () => {
  const session = window.sessionStorage;
  const [accountVal, setAccountVal] = useState(() => {
    if (session.getItem(sessionKey.ACCOUNT_KEY) == null) {
      console.log([]);
      return [];
    }
    const account = JSON.parse(session.getItem(sessionKey.ACCOUNT_KEY));
    return account;
  });
  const updateAccount = (account) => {
    const accountClone = clone(accountVal);
    accountClone.first_name = account.first_name;
    accountClone.last_name = account.last_name;
    accountClone.email = account.email;
    accountClone.phone = account.phone;
    accountClone.state = account.state;
    accountClone.country = account.country;
    setAccountVal(accountClone);
  };
  useEffect(() => {
    // service.getAccount((response) => {
    //   const accountArray = JSON.parse(response.data.value);
    //   if (accountArray.length > 0) {
    //     setAccountVal(accountArray[0]);
    //   } else {
    //     setAccountVal({});
    //   }
    // });
  }, []);
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
              <AccountProfileDetails account={accountVal} updateFunc={updateAccount} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
