import React, { useEffect, useState } from 'react';

const getDeviceIndex = () => {
  if (window.innerWidth <= 425) return 0;
  if (window.innerWidth <= 768) return 1; // Change to 2 to disable the tablet view
  return 1;
};

const DeviceSwitch = ({ children, ...rest }) => {
  const arr = React.Children.toArray(children);
  const [deviceIndex, setDeviceIndex] = useState(getDeviceIndex());

  useEffect(() => {
    const onResize = () => {
      const deviceIndexNow = getDeviceIndex();
      if (deviceIndexNow === deviceIndex) return;

      setDeviceIndex(deviceIndexNow);

      if (deviceIndexNow === 0) {
        // On desktop devices, 100% height means 100% of the window
        // On mobile devices, 100% height means 100% of the window + the height of the URL bar
        // This code reduces the height of the root element to be 100% of the window on mobile devices.
        document.body.style.height = `${window.innerHeight}px`;
        document.getElementById(
          'root'
        ).style.height = `${window.innerHeight}px`;
      }
    };

    window.addEventListener('resize', onResize, true);

    return () => {
      window.removeEventListener('resize', onResize, true);
    };
  }, [deviceIndex]);

  if (deviceIndex >= 0 && deviceIndex <= arr.length) {
    return React.cloneElement(arr[deviceIndex], rest);
  }

  return null;
};

export default DeviceSwitch;
