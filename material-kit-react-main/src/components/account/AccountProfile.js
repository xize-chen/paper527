import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const AccountProfile = ({
  account, ...props
}) => {
  const [alert, setAlert] = useState({});
  const handleAlertClose = () => {
    const alterSuccess = { isError: false, isOpen: false, message: '' };
    setAlert(alterSuccess);
  };
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src="/static/images/avatars/avatar_1.png"
            sx={{
              height: 100,
              width: 100
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {`${account.first_name} ${account.last_name}` }
          </Typography>
          <Typography color="textSecondary" variant="body1">
            <b>Account Created In</b>
            <br />
            {account.reg_time}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <label htmlFor="avatar-image-upload">
          <Button
            color="primary"
            variant="outlined"
            component="span"
            fullWidth
          >
            Upload picture
          </Button>
          <Snackbar
            open={alert.isOpen}
            autoHideDuration={2000}
            onClose={handleAlertClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <Alert onClose={handleAlertClose} severity={alert.isError ? 'error' : 'success'}>
              {alert.message}
            </Alert>
          </Snackbar>
        </label>

      </CardActions>
    </Card>
  );
};
AccountProfile.propTypes = {
  account: PropTypes.object.isRequired,
};

export default AccountProfile;
