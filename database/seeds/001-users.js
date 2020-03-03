exports.seed = function(knex) {
  return knex('users')
    .del()
    .then(function() {
      return knex('users').insert([
        {
          id: 1,
          email: 'test@email.com',
          password: 'password',
          fullName: 'First Last',
          investor: false
        },
        {
          id: 2,
          email: 'test1@email.com',
          password: 'password',
          fullName: 'Test Investor',
          investor: true
        },
        {
          id: 3,
          email: 'austen@allred.com',
          password: 'password',
          fullName: 'Austen Allred',
          investor: false
        },
        {
          id: 4,
          email: 'test2@email.com',
          password: 'password',
          fullName: 'Second Investor',
          investor: true
        },
        {
          id: 5,
          email: 'test3@email.com',
          password: 'password',
          fullName: 'Another Founder',
          investor: false
        }
      ]);
    });
};
