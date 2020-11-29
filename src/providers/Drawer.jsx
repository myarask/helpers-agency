import React, { useContext, useState } from 'react';
import {
  List,
  SwipeableDrawer,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import paths from '../constants/paths';
import { useAgency } from './Agency';
import { useAuth0 } from '../react-auth0-spa';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
  },
}));

const Drawer = React.createContext({});
const useDrawer = () => useContext(Drawer);

const NavItem = ({ to, label, onClick }) => (
  <ListItem button component={Link} to={to} onClick={onClick}>
    <ListItemText primary={label} />
  </ListItem>
);

const DrawerProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { logout } = useAuth0();
  const { agencyId, myAgencies, handleAgencyIdChange } = useAgency();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => logout({ returnTo: window.location.origin });

  return (
    <Drawer.Provider value={{ open, handleOpen, handleClose }}>
      {children}
      <SwipeableDrawer open={open} onClose={handleClose} onOpen={handleOpen}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="agency-label">Agency</InputLabel>
          <Select
            labelId="agency-label"
            value={agencyId}
            label="Agency"
            onChange={handleAgencyIdChange}
            style={{ fontSize: '14px' }}
          >
            {myAgencies.map(({ id, name }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <List component="nav" aria-label="Main Menu">
          <NavItem
            to={paths.visitsIncoming}
            label="Visits"
            onClick={handleClose}
          />
          {/* <NavItem to={paths.users} label="Staff" onClick={handleClose} />
          <NavItem
            to={paths.performance}
            label="Performance"
            onClick={handleClose}
          />
          <NavItem to={paths.services} label="Services" onClick={handleClose} />
          <NavItem
            to={paths.financials}
            label="Financials"
            onClick={handleClose}
          /> */}

          <NavItem
            label="Logout"
            icon="exit_to_app"
            to="#"
            onClick={handleLogout}
          />
        </List>
      </SwipeableDrawer>
    </Drawer.Provider>
  );
};

export { useDrawer };
export default DrawerProvider;
