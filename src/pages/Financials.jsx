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
} from '@material-ui/core';

const Financials = () => {
  return (
    <>
      <Typography variant="h1" gutterBottom>
        Financials
      </Typography>
      <Paper>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell>Billable Hours</TableCell>
                <TableCell>Earned</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>May 2021</TableCell>
                <TableCell>400</TableCell>
                <TableCell>$10000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Apr 2021</TableCell>
                <TableCell>200</TableCell>
                <TableCell>$5000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mar 2021</TableCell>
                <TableCell>80</TableCell>
                <TableCell>$2000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Feb 2021</TableCell>
                <TableCell>40</TableCell>
                <TableCell>$1000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jan 2021</TableCell>
                <TableCell>20</TableCell>
                <TableCell>$500</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default Financials;
