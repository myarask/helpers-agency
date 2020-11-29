import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { useAgency } from '../providers/Agency';
import paths from '../constants/paths';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  formControl: {
    margin: theme.spacing(2),
  },
}));

const DesktopSideNav = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { agencyId, myAgencies, handleAgencyIdChange } = useAgency();

  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="permanent"
      anchor="left"
    >
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

      <Divider />
      <List component="nav">
        <ListItem
          button
          component={Link}
          to={paths.visitsIncoming}
          selected={pathname === paths.visitsIncoming}
        >
          <ListItemText primary="Visits" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={paths.users}
          selected={pathname === paths.users}
        >
          <ListItemText primary="Staff" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={paths.performance}
          selected={pathname === paths.performance}
        >
          <ListItemText primary="Performance" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={paths.services}
          selected={pathname === paths.services}
        >
          <ListItemText primary="Services" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={paths.financials}
          selected={pathname === paths.financials}
        >
          <ListItemText primary="Financials" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DesktopSideNav;
