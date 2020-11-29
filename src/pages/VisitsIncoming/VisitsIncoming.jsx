import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { DeviceSwitch } from '../../components';
import { useAgency } from '../../providers/Agency';
import Mobile from './Mobile';
import Desktop from './Desktop';

const GET_DATA = gql`
  query MyOpenVisits($agencyId: Int!) {
    myOpenVisits(agencyId: $agencyId) {
      id
      city
      state
      services {
        id
        name
        serviceId
        fee
      }
    }
  }
`;

const Incoming = () => {
  const { agencyId } = useAgency();
  const options = {
    fetchPolicy: 'cache-and-network',
    variables: { agencyId: Number(agencyId) },
    pollInterval: 10000,
  };
  const query = useQuery(GET_DATA, options);

  return (
    <DeviceSwitch {...query}>
      <Mobile />
      <Desktop />
    </DeviceSwitch>
  );
};

export default Incoming;
