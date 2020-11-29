import React from 'react';
import {
  List,
  LinearProgress,
  Typography,
  Box,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { MainTopNav } from '../../components';
import { useOngoingVisit } from '../../providers/OngoingVisit';
import paths from '../../constants/paths';
import Visit from './Visit';

const Mobile = ({ data, loading }) => {
  const ongoingVisit = useOngoingVisit();

  const hasOngoingVisit = !!(ongoingVisit.data || {}).myOngoingVisit;

  return (
    <>
      <MainTopNav />
      <div>
        <LinearProgress
          style={{
            visibility: loading || ongoingVisit.loading ? 'visible' : 'hidden',
          }}
        />
        {!ongoingVisit.loading && !hasOngoingVisit && (
          <>
            <Box p={2}>
              <Typography variant="h1">Available Visits</Typography>
            </Box>
            {data && data.myOpenVisits.length === 0 && (
              <Box p={3}>
                <Typography align="center">
                  There are no available visits that match your service criteria
                </Typography>
              </Box>
            )}
            <List>
              {data &&
                data.myOpenVisits.map((visit) => (
                  <Visit key={visit.id} {...visit} />
                ))}
            </List>
          </>
        )}

        {hasOngoingVisit && (
          <Box p={3}>
            <Box pb={3}>
              <Typography>
                There is an ongoing visit. Other visits will be available once
                the ongoing visit is completed.
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              component={Link}
              to={paths.visit.replace(
                ':id',
                ongoingVisit.data.myOngoingVisit.id
              )}
            >
              Go to Visit
            </Button>
          </Box>
        )}
      </div>
    </>
  );
};

export default Mobile;
