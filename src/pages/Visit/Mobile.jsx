import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { BackTopNav } from '../../components';
import MobileAvailable from './MobileAvailable';
import MobileTaken from './MobileTaken';
import MobileStarted from './MobileStarted';
import MobileFinished from './MobileFinished';
import paths from '../../constants/paths';

const Mobile = ({
  visit,
  isAvailable,
  handleAccept,
  handleStart,
  handleFinish,
  isMatching,
  isStarting,
  isFinishing,
  isMine,
}) => {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <BackTopNav to={paths.visitsIncoming} />
      {isAvailable ? (
        <MobileAvailable
          visit={visit}
          handleAccept={handleAccept}
          isMatching={isMatching}
        />
      ) : isMine && !visit.startedAt ? (
        <MobileTaken
          visit={visit}
          handleStart={handleStart}
          isStarting={isStarting}
        />
      ) : isMine && !visit.finishedAt ? (
        <MobileStarted
          visit={visit}
          handleFinish={handleFinish}
          isFinishing={isFinishing}
        />
      ) : isMine ? (
        <MobileFinished />
      ) : (
        <Typography>This job is not available</Typography>
      )}
    </Box>
  );
};

export default Mobile;
