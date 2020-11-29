import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useAgency } from './Agency';

const Identity = React.createContext({});
const useIdentity = () => useContext(Identity);

const IdentityProvider = ({ children }) => {
  const { agencyId } = useAgency();

  const GET_DATA = gql`
    query {
      myRoles(agencyId: ${agencyId}) {
        roleId
      }
      myAgencyUser(agencyId: ${agencyId}) {
        id
      }
    }
  `;

  const { data } = useQuery(GET_DATA);

  const value = {
    isOwner: data && data.myRoles.some(({ roleId }) => roleId === 1),
    isAdmin: data && data.myRoles.some(({ roleId }) => roleId === 2),
    agencyUserId: data && data.myAgencyUser.id,
  };

  return <Identity.Provider value={value}>{children}</Identity.Provider>;
};

export { useIdentity };
export default IdentityProvider;
