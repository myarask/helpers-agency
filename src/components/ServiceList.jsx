import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ServiceIcon from './ServiceIcon';

const useStyles = makeStyles((theme) => ({
  icon: {
    background: theme.palette.primary.main,
    height: '1.5rem',
    width: '1.5rem',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const ServiceList = ({ services, noFees }) => {
  const classes = useStyles();
  return (
    <>
      <Typography varaint="h2" gutterBottom>
        <b>Services required today:</b>
      </Typography>
      {services.map((service) => (
        <Box
          key={service.id}
          display="flex"
          justifyContent="space-between"
          pt={1}
        >
          <Box display="flex" alignItems="center">
            <Box className={classes.icon} mr={1}>
              <ServiceIcon id={service.serviceId} size="small" color="white" />
            </Box>
            <Typography>{service.name}</Typography>
          </Box>

          {!noFees && (
            <Typography>
              <>{(service.fee / 60).toFixed(0)}</>
              <> min</>
            </Typography>
          )}
        </Box>
      ))}
    </>
  );
};

export default ServiceList;
