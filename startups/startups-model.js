const db = require('../database/dbConfig');

module.exports = {
  find,
  findById,
  findByUserId,
  add,
  edit,
  del
};

function find() {
  return db('startups').select(
    'id',
    'userId',
    'projectName',
    'headline',
    'valuationCap',
    'discount',
    'minInvestment',
    'contract',
    'goalLow',
    'goalHigh',
    'city',
    'state',
    'country',
    'email',
    'startDate',
    'endDate',
    'image',
    'summary',
    'product',
    'solution',
    'product',
    'traction',
    'businessModel',
    'market',
    'vision',
    'founders'
  );
}

function findById(id) {
  return db('startups')
    .select(
      'id',
      'userId',
      'projectName',
      'headline',
      'valuationCap',
      'discount',
      'minInvestment',
      'contract',
      'goalLow',
      'goalHigh',
      'city',
      'state',
      'country',
      'email',
      'startDate',
      'endDate',
      'image',
      'summary',
      'product',
      'solution',
      'product',
      'traction',
      'businessModel',
      'market',
      'vision',
      'founders'
    )
    .where({ id });
}

function findByUserId(userId) {
  return db('startups')
    .select(
      'id',
      'userId',
      'projectName',
      'headline',
      'valuationCap',
      'discount',
      'minInvestment',
      'contract',
      'goalLow',
      'goalHigh',
      'city',
      'state',
      'country',
      'email',
      'startDate',
      'endDate',
      'image',
      'summary',
      'product',
      'solution',
      'product',
      'traction',
      'businessModel',
      'market',
      'vision',
      'founders'
    )
    .where({ userId: userId });
}

function add(startup) {
  return db('startups')
    .insert(startup, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function edit(startup, id) {
  return db('startups')
    .where({ id })
    .update(startup);
}

function del(id) {
  return db('startups')
    .where({ id })
    .del();
}
