import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  LinearProgress,
} from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import history from 'utils/history';

const GET_AGENCY_USER = gql`
  query($id: ID!) {
    agencyUser(id: $id) {
      id
      user {
        email
        fullName
      }
    }
  }
`;

const REMOVE_AGENCY_USER = gql`
  mutation RemoveAgencyUser($id: Int!) {
    removeAgencyUser(id: $id)
  }
`;

const Users = () => {
  const { id } = useParams();

  const options = {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  };

  const { loading, data } = useQuery(GET_AGENCY_USER, options);
  const [removeAgencyUser] = useMutation(REMOVE_AGENCY_USER);

  const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);

  const handleRemoveUser = async () => {
    setIsDeleteModalShowing(false);
    await removeAgencyUser({ variables: { id: Number(id) } });
    history.go(-1);
  };

  return (
    <>
      {loading && <LinearProgress />}
      {data && (
        <Card>
          <CardHeader title="User" />
          <CardContent>
            <Box display="flex">
              <Typography variant="h4">Email: </Typography>
              <Typography>{data.agencyUser.user.email}</Typography>
            </Box>
            <Box display="flex">
              <Typography variant="h4">Full Name: </Typography>
              <Typography>{data.agencyUser.user.fullName}</Typography>
            </Box>
            <Button
              color="primary"
              variant="contained"
              onClick={() => setIsDeleteModalShowing(true)}
            >
              Remove User From Agency
            </Button>
          </CardContent>
        </Card>
      )}

      <Dialog
        open={isDeleteModalShowing}
        onClose={() => setIsDeleteModalShowing(false)}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please confirm, you are removing user from agency.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsDeleteModalShowing(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleRemoveUser} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Users;
