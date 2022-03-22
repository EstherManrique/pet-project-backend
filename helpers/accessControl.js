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
    get: ['Administrator', 'Manager'],
    post: [],
    put: ['Administrator', 'Manager'],
    delete: ['Administrator', 'Manager']
  },
  users: {
    get: ['Administrator', 'Manager'],
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