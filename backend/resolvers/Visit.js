module.exports = {
  client: (Visit) => Visit.getClient(),
  services: (Visit) => Visit.getVisitServices(),
};
