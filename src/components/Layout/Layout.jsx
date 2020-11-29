import React from 'react';

import Desktop from './Desktop';
import Mobile from './Mobile';
import DeviceSwitch from '../DeviceSwitch';

const Layout = ({ children }) => (
  <DeviceSwitch>
    <Mobile>{children}</Mobile>
    <Desktop>{children}</Desktop>
  </DeviceSwitch>
);

export default Layout;
