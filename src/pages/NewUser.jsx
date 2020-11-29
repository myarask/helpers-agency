import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  LinearProgress,
} from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Field, Form } from 'formik';
import history from 'utils/history';
import paths from 'constants/paths';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

import { useAgency } from '../providers/Agency';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  fullName: Yup.string().required(),
  password: Yup.string()
    .required('No password provided.')
    .min(8, '8 Character Minimum')
    .matches(/[a-z]/, 'at least one lowercase chararacter')
    .matches(/[A-Z]/, 'at least one uppercase character')
    .matches(/[1-9]/, 'at least one digit'),
  password2: Yup.string()
    .required('No password provided.')
    .min(8, '8 Character Minimum')
    .matches(/[a-z]/, 'at least one lowercase chararacter')
    .matches(/[A-Z]/, 'at least one uppercase character')
    .matches(/[1-9]/, 'at least one digit'),
});

const initialValues = {
  fullName: '',
  email: '',
  password: '',
  password2: '',
};

const NewUser = () => {
  const { agencyId } = useAgency();

  const CREATE_AGENCY_USER = gql`
    mutation CreateAgencyUser($email: String!, $password: String!, $fullName: String!) {
      createAgencyUser(email: $email, agencyId: ${agencyId}, password: $password, fullName: $fullName) {
        id
      }
    }
  `;

  const [createAgencyUser] = useMutation(CREATE_AGENCY_USER);

  return (
    <Card>
      <CardHeader title="New Staff Member" />
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validate={(values) => {
            const errors = {};

            if (values.password !== values.password2) {
              errors.password2 = 'Password must match';
            }

            return errors;
          }}
          onSubmit={async (values) => {
            await createAgencyUser({ variables: values });
            history.push(paths.users);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Field
                fullWidth
                component={TextField}
                name="fullName"
                label="Full Name"
                margin="normal"
              />
              <Field
                fullWidth
                type="email"
                component={TextField}
                name="email"
                label="Email"
                margin="normal"
              />
              <Field
                fullWidth
                type="password"
                component={TextField}
                name="password"
                label="Password"
                margin="normal"
              />
              <Field
                fullWidth
                type="password"
                component={TextField}
                name="password2"
                label="Confirm Password"
                margin="normal"
              />
              <br />
              {isSubmitting && <LinearProgress />}
              <br />
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Add Staff Member
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default NewUser;
