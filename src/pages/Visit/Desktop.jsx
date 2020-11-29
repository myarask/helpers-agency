import React from 'react';
import { Box, Paper, Button, Typography } from '@material-ui/core';

const Desktop = ({ visit, isAvailable, handleAccept }) => {
  return (
    <>
      <Typography variant="h1" gutterBottom>
        Open Job
      </Typography>

      <Paper>
        <Box p={2}>
          {isAvailable ? (
            <>
              <Typography>
                <b>Client</b>
              </Typography>
              <Typography gutterBottom>{visit.client.fullName}</Typography>

              <Typography>
                <b>Address</b>
              </Typography>
              <Typography>{visit.city}</Typography>
              <Typography gutterBottom>{visit.line1}</Typography>

              <Typography>
                <b>Services</b>
              </Typography>
              <Typography gutterBottom>
                {visit.services.map((service) => service.name).join(', ')}
              </Typography>

              <Button variant="contained" onClick={handleAccept}>
                Accept
              </Button>
            </>
          ) : (
            <Typography>This job is not available</Typography>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default Desktop;
