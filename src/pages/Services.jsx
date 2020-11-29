import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableContainer,
  TableCell,
  Typography,
  LinearProgress,
} from '@material-ui/core';

const Services = () => {
  return (
    <>
      <Typography variant="h1" gutterBottom>
        Services
      </Typography>
      <Paper>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Service</TableCell>
                <TableCell>Billable Hours</TableCell>
                <TableCell>Proportion</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>Personal Care</TableCell>
                <TableCell>600</TableCell>
                <TableCell>
                  <LinearProgress variant="determinate" value={60} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mobility Assist</TableCell>
                <TableCell>400</TableCell>
                <TableCell>
                  <LinearProgress variant="determinate" value={40} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Medication Reminder</TableCell>
                <TableCell>200</TableCell>
                <TableCell>
                  <LinearProgress variant="determinate" value={20} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default Services;
