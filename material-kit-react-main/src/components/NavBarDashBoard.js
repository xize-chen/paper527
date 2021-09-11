import {
  Button, Toolbar, IconButton, AppBar
} from '@material-ui/core';
import { React } from 'react';

export default function NavBarDashBoard() {
  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" />
          <Button color="inherit">local</Button>
          <Button color="inherit">global</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
