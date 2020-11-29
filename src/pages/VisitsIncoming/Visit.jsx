import React from 'react';
import { ListItem, Box, Icon, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import paths from '../../constants/paths';

const Visit = ({ id, services, city, state }) => {
  const address = [city, state].filter(Boolean).join(', ');
  const totalFees = services.reduce((acc, service) => acc + service.fee, 0);
  const totalMinutes = (totalFees / 60).toFixed(0);

  return (
    <ListItem button component={Link} to={paths.visit.replace(':id', id)}>
      <Box display="flex" width="100%">
        <Box flexGrow={1}>
          <Typography variant="body1">{address}</Typography>

          <Typography color="primary" variant="body2">
            <>Duration: </>
            {totalMinutes}
            <> minutes</>
          </Typography>
        </Box>
        <Icon color="action">chevron_right</Icon>
      </Box>
    </ListItem>
  );
};

export default Visit;
