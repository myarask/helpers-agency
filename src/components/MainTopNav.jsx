import React from 'react';
import { IconButton, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import TopNav from './TopNav';
import Logo from './Logo';
import { useDrawer } from '../providers/Drawer';

const MainTopNav = () => {
  const { handleOpen } = useDrawer();

  return (
    <TopNav>
      <IconButton aria-label="Main Menu" onClick={handleOpen}>
        <MenuIcon fontSize="small" color="secondary" />
      </IconButton>

      <Logo />

      <Box width="44px" />
    </TopNav>
  );
};

export default MainTopNav;
