exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
      users.increments();
      users
        .string('email', 100)
        .notNullable()
        .unique();
      users.string('password', 100).notNullable();
      users.string('fullName', 100).notNullable();
      users
        .boolean('investor')
        .notNullable()
        .defaultTo(true);
      users.string('image', 5000);
    })
    .createTable('startups', table => {
      table.increments();
      table
        .integer('userId')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE');
      table.string('projectName', 80).notNullable();
      table.string('headline', 80).notNullable();
      table
        .integer('valuationCap')
        .unsigned()
        .notNullable();
      table
        .integer('discount')
        .unsigned()
        .notNullable();
      table
        .integer('minInvestment')
        .unsigned()
        .notNullable();
      table
        .integer('goalLow')
        .unsigned()
        .notNullable();
      table
        .integer('goalHigh')
        .unsigned()
        .notNullable();
      table
        .string('contract', 128)
        .notNullable()
        .defaultTo('Crowd SAFE');
      table.string('city', 128).notNullable();
      table.string('state', 128).notNullable();
      table.string('country', 128).notNullable();
      table.string('email', 128).notNullable();
      table.string('postDate', 10).notNullable();
      table.string('startDate', 10).notNullable();
      table.string('endDate', 10).notNullable();
      table
        .boolean('active')
        .notNullable()
        .defaultTo(false);
      table.string('image', 5000);
      table.string('summary', 1000);
      table.string('problem', 2000);
      table.string('solution', 2000);
      table.string('product', 2000);
      table.string('traction', 2000);
      table.string('businessModel', 2000);
      table.string('market', 2000);
      table.string('vision', 2000);
      table.string('founders', 2000);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('startups');
};
