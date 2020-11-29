import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Box, Button } from '@material-ui/core';

import { useAuth0 } from '../react-auth0-spa';

const useStyles = makeStyles(() => ({
  navButton: {
    width: 'fit-content',
    padding: '0px 30px',
    color: 'inherit',

    '&:': {
      textDecoration: 'none',
    },
  },
  toolbar: {
    minHeight: 48,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const { isAuthenticated, logout } = useAuth0();
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  if (!isAuthenticated) return null;

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Box flexGrow={1} />

        <Button
          className={classes.navButton}
          color="inherit"
          onClick={() => logoutWithRedirect()}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
