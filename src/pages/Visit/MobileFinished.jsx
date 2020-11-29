import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import paths from '../../constants/paths';

const MobileFinished = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
    >
      <Box p={2}>
        <Typography align="center">This visit is complete!</Typography>
      </Box>

      <Box p={2}>
        <Button component={Link} to={paths.home} fullWidth>
          See more Visits
        </Button>
      </Box>
    </Box>
  );
};

export default MobileFinished;
