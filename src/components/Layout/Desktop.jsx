import React from 'react';
import { makeStyles } from '@material-ui/styles';
import DesktopSideNav from '../DesktopSideNav';
import NavBar from '../NavBar';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    display: 'flex',
    top: 50,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'auto',
    padding: theme.spacing(3),
  },
  main: {
    width: '100%',
  },
}));

const Desktop = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <div className={classes.container}>
        <DesktopSideNav />
        <div className={classes.main}>{children}</div>
      </div>
    </>
  );
};

export default Desktop;
