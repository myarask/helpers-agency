const { ApolloError } = require('apollo-server-express');

const createAuth0User = async (auth0, models, user, password) => {
  const payload = {
    connection: 'Username-Password-Authentication',
    email: user.email,
    password,
    verify_email: true,
  };

  const { data } = await auth0.post('users', payload);
  models.User.update({ auth0Id: data.user_id }, { where: { id: user.id } });
  // TODO: force user to change password
};

module.exports = {
  async createAgencyUser(
    _,
    { email, agencyId, password, fullName },
    { models, auth0 }
  ) {
    const [user] = await models.User.findOrCreate({ where: { email } });

    await models.User.update(
      { fullName },
      { where: { id: user.id, fullName: null } }
    );

    const agencyUser = await models.AgencyUser.create({
      userId: user.id,
      agencyId,
    });

    if (!user.auth0Id) {
      await createAuth0User(auth0, models, user, password);
    }

    return agencyUser;
  },
  async addAgencyUserService(_, { serviceId, agencyUserId }, { models }) {
    return models.AgencyUserService.create({
      serviceId,
      agencyUserId,
    });
  },
  async removeAgencyUserService(_, { serviceId, agencyUserId }, { models }) {
    return models.AgencyUserService.destroy({
      where: { serviceId, agencyUserId },
    });
  },

  async removeAgencyUser(_, { id }, { models }) {
    return models.AgencyUser.destroy({
      where: { id },
    });
  },
  async matchVisit(_, { id, agencyId }, { models, user }) {
    // TODO: Throw error if the user is not a member of the agency
    const { id: userId } = await models.User.findOne({
      where: { auth0Id: user.sub },
    });

    const agencyUser = await models.AgencyUser.findOne({
      where: { userId, agencyId },
    });

    if (!agencyUser) {
      throw new ApolloError(
        `You are not a member of agency ${agencyId}`,
        'CAN_NOT_FETCH_BY_ID'
      );
    }

    return models.Visit.update(
      {
        matchedAt: models.sequelize.literal('CURRENT_TIMESTAMP'),
        agencyUserId: agencyUser.id,
      },
      { where: { id, matchedAt: null, cancelledAt: null, agencyUserId: null } }
    );
  },
  async startVisit(_, { id, agencyId }, { models, user }) {
    const { id: userId } = await models.User.findOne({
      where: { auth0Id: user.sub },
    });

    const agencyUser = await models.AgencyUser.findOne({
      where: { userId, agencyId },
    });

    if (!agencyUser) {
      throw new ApolloError(
        `You are not a member of agency ${agencyId}`,
        'CAN_NOT_FETCH_BY_ID'
      );
    }

    return models.Visit.update(
      {
        startedAt: models.sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        where: {
          id,
          startedAt: null,
          cancelledAt: null,
          agencyUserId: agencyUser.id,
        },
      }
    );
  },
  async finishVisit(_, { id }, { models }) {
    // TODO: make sure the user owns this job
    return models.Visit.update(
      {
        finishedAt: models.sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        where: {
          id,
          finishedAt: null,
          cancelledAt: null,
        },
      }
    );
  },
};
