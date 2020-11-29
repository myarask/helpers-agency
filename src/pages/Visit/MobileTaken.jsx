import React from 'react';
import { Box, Button, Divider } from '@material-ui/core';
import { ServiceList, VisitCard, ClientCard } from 'components';

const MobileTaken = ({ visit, handleStart, isStarting }) => (
  <>
    <Box px={2} py={3} style={{ background: '#F4F5FA' }}>
      <Button
        variant="contained"
        fullWidth
        color="primary"
        onClick={handleStart}
        disabled={isStarting}
      >
        Check-In to start Helping
      </Button>
    </Box>
    <Box p={2}>
      <ClientCard client={visit.client} />

      <Divider />
      <Box pt={2} />
      <ServiceList services={visit.services} />
      <Box pt={2} />
      <VisitCard client={visit.client} notes={visit.notes} />
    </Box>
  </>
);

export default MobileTaken;
