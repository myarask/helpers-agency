const { gql } = require('apollo-server-express');

module.exports = gql`
  type Client {
    id: Int!
    userId: Int!
    approvedAt: String
    fullName: String!
    city: String!
    country: String!
    line1: String!
    line2: String
    postalCode: String!
    state: String!
    phoneNumber: String
  }

  type Agency {
    id: Int!
    name: String
    agencyUsers: [AgencyUser]
  }

  type User {
    id: Int!
    email: String
    fullName: String
  }

  type AgencyUser {
    id: Int!
    user: User
    agencyUserServices: [AgencyUserService]
  }

  type Service {
    id: Int!
    name: String!
    fee: Int!
  }

  type VisitServices {
    id: Int
    visitId: Int
    serviceId: Int
    name: String
    fee: Int
  }

  type Visit {
    id: Int
    clientId: Int
    userId: Int
    agencyUserId: Int
    notes: String
    city: String
    country: String
    line1: String
    line2: String
    postalCode: String
    state: String
    createdAt: String
    releasedAt: String
    matchedAt: String
    startedAt: String
    finishedAt: String
    cancelledAt: String
    client: Client
    services: [VisitServices]
  }

  type AgencyUserService {
    id: Int!
    serviceId: Int!
    agencyUserId: Int!
  }

  type AgencyUserRole {
    id: Int!
    roleId: Int!
    agencyUserId: Int!
  }

  type Query {
    agency(id: ID!): Agency!
    services: [Service]
    agencyUser(id: ID!): AgencyUser!
    myAgencyUser(agencyId: ID!): AgencyUser!
    agencyUsers(agencyId: Int!): [AgencyUser] # TODO: Secure to agency members
    myAgencies: [Agency]
    myRoles(agencyId: Int!): [AgencyUserRole]
    myOpenVisits(agencyId: Int!): [Visit]
    myOngoingVisit: Visit
    visit(id: Int!): Visit
  }

  type Mutation {
    createAgencyUser(
      email: String!
      password: String!
      agencyId: Int!
      fullName: String!
    ): AgencyUser

    matchVisit(id: Int!, agencyId: Int!): Visit
    # agencyId isn't a necessary parameter in startVisit
    startVisit(id: ID!, agencyId: ID!): Visit
    finishVisit(id: ID!): Visit
    removeAgencyUser(id: Int!): Int # TODO: Add hasRole directive
    addAgencyUserService(agencyUserId: Int!, serviceId: Int!): AgencyUserService # TODO: Add hasRole directive
    removeAgencyUserService(agencyUserId: Int!, serviceId: Int!): Int # TODO: Add hasRole directive
  }
`;
