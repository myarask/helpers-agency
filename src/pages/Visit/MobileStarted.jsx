import React, { useState } from 'react';
import {
  Box,
  Button,
  Icon,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ClientCard, VisitCard } from 'components';

const useStyles = makeStyles((theme) => ({
  item: {
    background: 'white',
    borderRadius: 4,
    border: '1px solid #DFDFDF',
    marginBottom: theme.spacing(1),
  },
}));

const Service = ({ service, onClick, serviceIds }) => {
  const classes = useStyles();

  return (
    <ListItem
      button
      key={service.id}
      className={classes.item}
      onClick={() => onClick(service.serviceId)}
    >
      <Box pr={1}>
        <Icon color="primary">
          {serviceIds.includes(service.serviceId)
            ? 'check_circle_outline_icon'
            : 'radio_button_unchecked'}
        </Icon>
      </Box>
      <ListItemText>{service.name}</ListItemText>
    </ListItem>
  );
};

const MobileStarted = ({ visit, isFinishing, handleFinish }) => {
  const [serviceIds, setServiceIds] = useState([]);

  const onClick = (serviceId) => {
    if (serviceIds.includes(serviceId)) {
      setServiceIds((prev) => prev.filter((x) => x !== serviceId));
    } else {
      setServiceIds((prev) => [...prev, serviceId]);
    }
  };

  return (
    <>
      <Box p={2} style={{ background: '#F4F5FA' }}>
        <Typography gutterBottom>Check off services once completed</Typography>
        <List>
          {visit.services.map((service) => (
            <Service
              key={service.id}
              service={service}
              onClick={onClick}
              serviceIds={serviceIds}
            />
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleFinish}
          disabled={serviceIds.length < visit.services.length || isFinishing}
        >
          Check Out
        </Button>
      </Box>
      <ClientCard client={visit.client} />
      <Divider />

      <VisitCard client={visit.client} notes={visit.notes} />
    </>
  );
};

export default MobileStarted;
