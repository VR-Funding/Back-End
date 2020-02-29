const db = require('../database/dbConfig');

module.exports = {
  find,
  findById,
  add,
  edit,
  del
};

function find() {
  return db('startups');
}

function findById(id) {
  return db('startups').where({ id });
}

function add(startup) {
  return db('startups').insert(startup);
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
