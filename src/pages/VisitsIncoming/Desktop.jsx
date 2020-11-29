import React from 'react';
import {
  IconButton,
  Icon,
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
import { Link } from 'react-router-dom';
import paths from '../../constants/paths';

const Desktop = ({ data, loading }) => {
  return (
    <>
      <Typography variant="h1" gutterBottom>
        Incoming Jobs
      </Typography>
      <Paper>
        {loading && <LinearProgress />}
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>City</TableCell>
                <TableCell>Services</TableCell>
                <TableCell>Link</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data &&
                data.myOpenVisits.map((visit) => (
                  <TableRow key={visit.id} hover>
                    <TableCell>{visit.city}</TableCell>
                    <TableCell>
                      {visit.services.map((service) => service.name).join(', ')}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        component={Link}
                        to={paths.visit.replace(':id', visit.id)}
                      >
                        <Icon>chevron_right</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default Desktop;
