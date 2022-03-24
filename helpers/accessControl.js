// Access definition
const permissions = {
  stores: {
    get: [],
    post: ['Administrator'],
    put: ['Administrator'],
    delete: ['Administrator']
  },
  services: {
    get: [],
    post: ['Administrator'],
    put: ['Administrator'],
    delete: ['Administrator']
  },
  reservations: {
    get: ['Manager'],
    post: [],
    put: ['Manager'],
    delete: ['Manager']
  },
  users: {
    get: ['Administrator'],
    post: ['Administrator'],
    put: ['Administrator'],
    delete: ['Administrator']
  },
  role: {
    get: ['Administrator'],
    post: ['Administrator'],
    put: ['Administrator'],
    delete: ['Administrator']
  },
}

module.exports = { permissions };