import React from 'react';
import { Typography, Box, IconButton, Icon, Button } from '@material-ui/core';

const ClientCard = ({ client }) => (
  <Box p={2}>
    <Typography variant="h2" gutterBottom>
      <b>Client Details</b>
    </Typography>
    <Box my={2}>
      <Typography gutterBottom>Name</Typography>
      <Typography variant="body2">{client.fullName}</Typography>
    </Box>

    <Box my={2}>
      <Typography gutterBottom>Address</Typography>
      <Typography variant="body2">{client.line1}</Typography>
      <Typography variant="body2">{client.line2}</Typography>
      <Typography variant="body2">
        {[client.city, client.state].filter(Boolean).join(', ')}
      </Typography>

      <Typography variant="body2">{client.postalCode}</Typography>
      <Button
        fullWidth
        href={`https://www.google.ca/maps/place/${[
          client.line1,
          client.line2,
          client.city,
          client.state,
        ].join(',')}`}
        target="_blank"
      >
        Open in Google Maps
      </Button>
    </Box>

    <Typography gutterBottom>Contact</Typography>
    <Box display="flex">
      <IconButton href={`sms:+${client.phoneNumber}`} color="primary">
        <Icon>message</Icon>
      </IconButton>
      <IconButton href={`tel:+${client.phoneNumber}`} color="primary">
        <Icon>call</Icon>
      </IconButton>
    </Box>
  </Box>
);

export default ClientCard;
