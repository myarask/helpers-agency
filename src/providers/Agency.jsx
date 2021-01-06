import React, { useContext, useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { LinearProgress } from '@material-ui/core';

const Agency = React.createContext({});
const useAgency = () => useContext(Agency);

const GET_DATA = gql`
  query {
    myAgencies {
      id
      name
    }
  }
`;

const AgencyProvider = ({ children }) => {
  const { loading, data } = useQuery(GET_DATA);
  const [agencyId, setAgencyId] = useState();

  useEffect(() => {
    if (!data) return;

    setAgencyId(data.myAgencies[0].id);
  }, [data]);

  const handleAgencyIdChange = React.useCallback(
    (e) => setAgencyId(e.target.value),
    []
  );

  if (loading) return <LinearProgress />;
  if (!agencyId) return null;

  const value = {
    agencyId,
    handleAgencyIdChange,
    myAgencies: data.myAgencies,
  };

  return <Agency.Provider value={value}>{children}</Agency.Provider>;
};

export { useAgency };
export default AgencyProvider;
