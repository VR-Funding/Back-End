exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
      users.increments();
      users
        .string('email', 255)
        .notNullable()
        .unique();
      users.string('password', 255).notNullable();
      users.string('fullName', 255).notNullable();
      users
        .boolean('investor')
        .notNullable()
        .defaultTo(true);
    })
    .createTable('startups', table => {
      table.increments();
      table
        .integer('userId')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('projectName', 128).notNullable();
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
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('startups');
};
