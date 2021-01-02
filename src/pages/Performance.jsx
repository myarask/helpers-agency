import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Icon,
  IconButton,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableContainer,
  Card,
  CardContent,
  TableCell,
  Typography,
} from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';
import paths from 'constants/paths';
import { useAgency } from '../providers/Agency';

const options = {
  fetchPolicy: 'cache-and-network',
};

const Performance = () => {
  const { agencyId } = useAgency();
  const [agencyUsers, setAgencyUsers] = useState();

  const GET_DATA = gql`
    query {
      agencyUsers(agencyId: ${agencyId}) {
        id
        user {
          email
          fullName
        }
        agencyUserServices {
          serviceId
        }
      }
      services {
        id
        name
      }
    }
  `;

  const { loading, data } = useQuery(GET_DATA, options);

  useEffect(() => {
    if (data) {
      const AgencyUsers = {};
      data.agencyUsers.forEach((agencyUser) => {
        AgencyUsers[agencyUser.id] = {
          email: agencyUser.user.email,
          fullName: agencyUser.user.fullName,
          serviceIds: agencyUser.agencyUserServices.map(
            ({ serviceId }) => serviceId
          ),
        };
      });

      setAgencyUsers(AgencyUsers);
    }
  }, [data]);

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Agency Performance
      </Typography>

      <Card>
        <CardContent>
          <Box>
            <Typography gutterBottom>Agency Average: 4.2</Typography>
            <Typography gutterBottom>Region Average: 3.7</Typography>
            <Typography gutterBottom>Global Average: 4.0</Typography>
          </Box>
        </CardContent>
      </Card>
      <Box my={2} />
      <Typography variant="h1" gutterBottom>
        Individual Performance
      </Typography>

      <Paper>
        {loading && <LinearProgress />}
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Hours</TableCell>
                <TableCell>Average Rating</TableCell>

                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {agencyUsers &&
                Object.entries(agencyUsers).map(([id, agencyUser]) => (
                  <TableRow hover key={id}>
                    <TableCell>{agencyUser.fullName || '-'}</TableCell>
                    <TableCell>{(Math.random() * 100).toFixed(1)}</TableCell>
                    <TableCell>{(Math.random() * 5).toFixed(1)}</TableCell>

                    <TableCell>
                      <IconButton
                        component={Link}
                        to={paths.user.replace(':id', id)}
                        color="primary"
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

export default Performance;
