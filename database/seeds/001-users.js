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
          investor: false,
          image:
            'https://www.ajactraining.org/wp-content/uploads/2019/09/image-placeholder.jpg'
        },
        {
          id: 2,
          email: 'test1@email.com',
          password: 'password',
          fullName: 'Test Investor',
          investor: true,
          image:
            'https://www.ajactraining.org/wp-content/uploads/2019/09/image-placeholder.jpg'
        },
        {
          id: 3,
          email: 'austen@allred.com',
          password: 'password',
          fullName: 'Austen Allred',
          investor: false,
          image:
            'https://www.ajactraining.org/wp-content/uploads/2019/09/image-placeholder.jpg'
        },
        {
          id: 4,
          email: 'test2@email.com',
          password: 'password',
          fullName: 'Second Investor',
          investor: true,
          image:
            'https://www.ajactraining.org/wp-content/uploads/2019/09/image-placeholder.jpg'
        },
        {
          id: 5,
          email: 'test3@email.com',
          password: 'password',
          fullName: 'Another Founder',
          investor: false,
          image:
            'https://www.ajactraining.org/wp-content/uploads/2019/09/image-placeholder.jpg'
        }
      ]);
    });
};
