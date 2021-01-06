import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useIdentity } from 'providers/Identity';
import { useAgency } from 'providers/Agency';
import { DeviceSwitch } from 'components';
import Desktop from './Desktop';
import Mobile from './Mobile';

const DATA = gql`
  query Visit($id: Int!) {
    visit(id: $id) {
      id
      agencyUserId
      createdAt
      releasedAt
      matchedAt
      startedAt
      finishedAt
      cancelledAt
      city
      line1
      notes
      client {
        fullName
        line1
        line2
        city
        state
        postalCode
        phoneNumber
      }
      services {
        fee
        name
        id
        serviceId
      }
    }
  }
`;

const MATCH_VISIT = gql`
  mutation MatchVisit($id: Int!, $agencyId: Int!) {
    matchVisit(id: $id, agencyId: $agencyId) {
      id
    }
  }
`;

const START_VISIT = gql`
  mutation StartVisit($id: ID!, $agencyId: ID!) {
    startVisit(id: $id, agencyId: $agencyId) {
      id
    }
  }
`;

const FINISH_VISIT = gql`
  mutation FinishVisit($id: ID!) {
    finishVisit(id: $id) {
      id
    }
  }
`;

const Incoming = () => {
  const { id } = useParams();
  const { agencyUserId } = useIdentity();
  const { data, refetch } = useQuery(DATA, {
    fetchPolicy: 'cache-and-network',
    variables: { id: Number(id) },
  });
  const { agencyId } = useAgency();
  const [matchVisit, { loading: isMatching }] = useMutation(MATCH_VISIT);
  const [startVisit, { loading: isStarting }] = useMutation(START_VISIT);
  const [finishVisit, { loading: isFinishing }] = useMutation(FINISH_VISIT);
  // TODO: [Issue #162]: Prevent helpers from taking jobs they are not qualified for

  const handleAccept = async () => {
    const variables = {
      id: Number(id),
      agencyId,
    };
    await matchVisit({ variables });
    await refetch();
  };

  const handleStart = async () => {
    const variables = { id, agencyId };
    await startVisit({ variables });
    await refetch();
  };

  const handleFinish = async () => {
    const variables = { id };
    await finishVisit({ variables });
    await refetch();
  };

  if (!data) return null;
  const { visit } = data;

  const isMine = visit.agencyUserId === agencyUserId;
  const isAvailable =
    visit.releasedAt && !visit.matchedAt && !visit.cancelledAt;

  return (
    <DeviceSwitch
      visit={visit}
      isAvailable={isAvailable}
      isMatching={isMatching}
      isStarting={isStarting}
      isFinishing={isFinishing}
      isMine={isMine}
      handleAccept={handleAccept}
      handleStart={handleStart}
      handleFinish={handleFinish}
    >
      <Mobile />
      <Desktop />
    </DeviceSwitch>
  );
};

export default Incoming;
