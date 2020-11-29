const { ApolloError } = require('apollo-server-express');
const makeModels = require('helpers-database/models/_make');
const config = require('../config');

const db = makeModels(config);
const { Op } = db.Sequelize;

module.exports = {
  agency: (_, { id }, { models }) => models.Agency.findOne({ where: { id } }),
  agencyUser: async (_, { id }, { models }) => {
    const agencyUser = await models.AgencyUser.findOne({
      where: { id },
      include: models.User,
    });

    if (!agencyUser) {
      throw new ApolloError(
        `Cannot fetch AgencyUser with ID ${id}`,
        'CAN_NOT_FETCH_BY_ID'
      );
    }

    return agencyUser;
  },
  myAgencyUser: async (_, { agencyId }, { models, user }) => {
    // BROKEN
    console.log(agencyId);

    const { id: userId } = await models.User.findOne({
      where: { auth0Id: user.sub },
    });

    const agencyUser = await models.AgencyUser.findOne({
      where: { agencyId, userId },
    });

    if (!agencyUser) {
      throw new ApolloError(
        `You are not a member of agency ${agencyId}`,
        'CAN_NOT_FETCH_BY_ID'
      );
    }

    return agencyUser;
  },
  agencyUsers(_, { agencyId }, { models }) {
    return models.AgencyUser.findAll({
      where: { agencyId },
      include: models.User,
    });
  },
  myAgencies: async (_, __, { models, user }) => {
    const { id: userId } = await models.User.findOne({
      where: { auth0Id: user.sub },
    });

    const agencyUsers = await models.AgencyUser.findAll({
      where: { userId },
    });

    const agencyIds = agencyUsers.map(({ agencyId }) => agencyId);

    return models.Agency.findAll({
      where: { id: agencyIds },
    });
  },
  myRoles: async (_, { agencyId }, { models, user }) => {
    const { id: userId } = await models.User.findOne({
      where: { auth0Id: user.sub },
    });

    const { id: agencyUserId } = await models.AgencyUser.findOne({
      where: { userId, agencyId },
    });

    return models.AgencyUserRole.findAll({
      where: { agencyUserId },
    });
  },
  services: (_, __, { models }) => models.Service.findAll({}),
  visit: (_, { id }, { models }) => models.Visit.findOne({ where: { id } }),
  myOpenVisits: async (_, { agencyId }, { models, user }) => {
    // Broken
    // TODO: Optimize. One idea is to run these 2 query chains at the same time
    const { id: userId } = await models.User.findOne({
      where: { auth0Id: user.sub },
    });
    const { id: agencyUserId } = await models.AgencyUser.findOne({
      where: { userId, agencyId },
    });
    const userServices = await models.AgencyUserService.findAll({
      where: { agencyUserId },
    });
    const allowedIds = userServices.map((service) => service.serviceId);

    const visits = await models.Visit.findAll({
      where: {
        matchedAt: null,
        cancelledAt: null,
        releasedAt: {
          [Op.not]: null,
        },
      },
      include: [
        {
          model: models.VisitService,
          required: false,
        },
      ],
    });

    return visits.filter((visit) =>
      visit.dataValues.VisitServices.every((service) =>
        allowedIds.includes(service.serviceId)
      )
    );
  },
  myOngoingVisit: async (_, __, { models, user }) => {
    // Broken
    const { AgencyUsers } = await models.User.findOne({
      where: { auth0Id: user.sub },
      include: [
        {
          model: models.AgencyUser,
          required: false,
        },
      ],
    });

    return models.Visit.findOne({
      where: {
        finishedAt: null,
        cancelledAt: null,
        agencyUserId: AgencyUsers.map(({ dataValues }) => dataValues.id),
      },
      include: [
        {
          model: models.VisitService,
          required: false,
        },
      ],
    });
  },
};
