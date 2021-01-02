import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';

const OngoingVisit = React.createContext({});
const useOngoingVisit = () => useContext(OngoingVisit);

const GET_DATA = gql`
  query {
    myOngoingVisit {
      id
      client {
        fullName
        city
        country
        line1
        line2
        postalCode
        phoneNumber
      }
      services {
        serviceId
      }
      notes
      city
      country
      line1
      line2
      postalCode
      state
      createdAt
      releasedAt
      matchedAt
      startedAt
    }
  }
`;

const OngoingVisitProvider = ({ children }) => {
  const visit = useQuery(GET_DATA, {
    pollInterval: 10000,
  });

  return (
    <OngoingVisit.Provider value={visit}>{children}</OngoingVisit.Provider>
  );
};

export { useOngoingVisit };
export default OngoingVisitProvider;
