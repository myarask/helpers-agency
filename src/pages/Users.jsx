import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Icon,
  IconButton,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableContainer,
  Checkbox,
  TableCell,
  Typography,
} from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import paths from 'constants/paths';
import { useAgency } from '../providers/Agency';
import { useIdentity } from '../providers/Identity';

const options = {
  fetchPolicy: 'cache-and-network',
};

const ADD_AGENCY_USER_SERVICE = gql`
  mutation AddAgencyUserService($serviceId: Int!, $agencyUserId: Int!) {
    addAgencyUserService(serviceId: $serviceId, agencyUserId: $agencyUserId) {
      id
    }
  }
`;

const REMOVE_AGENCY_USER_SERVICE = gql`
  mutation RemoveAgencyUserService($serviceId: Int!, $agencyUserId: Int!) {
    removeAgencyUserService(serviceId: $serviceId, agencyUserId: $agencyUserId)
  }
`;

const Users = () => {
  const { agencyId } = useAgency();
  const { isOwner, isAdmin } = useIdentity();
  const [agencyUsers, setAgencyUsers] = useState();
  const [changingServices, setChangingServices] = useState([]);

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

  const [addAgencyUserService] = useMutation(ADD_AGENCY_USER_SERVICE);
  const [removeAgencyUserService] = useMutation(REMOVE_AGENCY_USER_SERVICE);

  const queueService = (userService) => {
    setChangingServices((prev) => [...prev, userService]);
  };

  const unqueueService = ({ serviceId, agencyUserId }) => {
    setChangingServices((prev) =>
      prev.filter(
        (service) =>
          !(
            service.serviceId === serviceId &&
            service.agencyUserId === agencyUserId
          )
      )
    );
  };

  const handleUserServices = async ({ serviceId, agencyUserId, value }) => {
    const opts = {
      variables: {
        serviceId,
        agencyUserId: Number(agencyUserId),
      },
    };

    if (value) {
      setAgencyUsers((prev) => ({
        ...prev,
        [agencyUserId]: {
          ...prev[agencyUserId],
          serviceIds: [...prev[agencyUserId].serviceIds, serviceId],
        },
      }));

      queueService({ serviceId, agencyUserId });
      try {
        await addAgencyUserService(opts);
      } catch (e) {
        console.log(e);
      }
      unqueueService({ serviceId, agencyUserId });
    } else {
      setAgencyUsers((prev) => ({
        ...prev,
        [agencyUserId]: {
          ...prev[agencyUserId],
          serviceIds: prev[agencyUserId].serviceIds.filter(
            (id) => id !== serviceId
          ),
        },
      }));

      queueService({ serviceId, agencyUserId });
      try {
        await removeAgencyUserService(opts);
      } catch (e) {
        console.log(e);
      }
      unqueueService({ serviceId, agencyUserId });
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h1">Staff</Typography>
        <Button color="primary" component={Link} to={paths.newUser}>
          <PersonAddIcon color="primary" />
          <Box pl={1}>
            <Typography>New Staff Member</Typography>
          </Box>
        </Button>
      </Box>

      {agencyUsers && (
        <Paper>
          {loading && <LinearProgress />}
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>

                  {(data.services || []).map((service) => (
                    <TableCell key={service.id}>{service.name}</TableCell>
                  ))}

                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {Object.entries(agencyUsers).map(([id, agencyUser]) => (
                  <TableRow hover key={id}>
                    <TableCell>{agencyUser.fullName || '-'}</TableCell>
                    <TableCell>{agencyUser.email}</TableCell>

                    {data.services.map((service) => (
                      <TableCell style={{ width: 130 }} key={service.id}>
                        <Checkbox
                          disabled={
                            changingServices.some(
                              (x) =>
                                x.serviceId === service.id &&
                                x.agencyUserId === id
                            ) || !(isOwner || isAdmin)
                          }
                          checked={agencyUser.serviceIds.includes(service.id)}
                          onChange={(e) => {
                            handleUserServices({
                              serviceId: service.id,
                              agencyUserId: id,
                              value: e.target.checked,
                            });
                          }}
                          color="primary"
                        />
                      </TableCell>
                    ))}

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
      )}
    </>
  );
};

export default Users;
