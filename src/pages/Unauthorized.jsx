import React from 'react';
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: '100vh',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
}));

const Unauthorized = () => {
  const { logout } = useAuth0();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography align="center" variant="h1">
            Opps! Looks like you are at the wrong place.
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle1">
            This account is not permitted to use this app.
          </Typography>
          <Container maxWidth="sm">
            <Box pt={2} display="flex" justifyContent="center">
              <Button
                color="secondary"
                variant="contained"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Log in with different account
              </Button>
            </Box>
          </Container>
        </Container>
      </Box>
    </Box>
  );
};

export default Unauthorized;
