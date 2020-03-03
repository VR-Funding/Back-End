exports.seed = function(knex) {
  return knex('startups')
    .del()
    .then(function() {
      return knex('startups').insert([
        {
          id: 1,
          userId: 1,
          projectName: 'Uber JetSki',
          valuationCap: 5500000,
          discount: 20,
          minInvestment: 100,
          contract: 'Crowd SAFE',
          goalLow: 25000,
          goalHigh: 850000,
          city: 'Miami Beach',
          state: 'Florida',
          country: 'United States',
          email: 'test@email.com',
          postDate: '01/25/2020',
          startDate: '02/11/2020',
          endDate: '05/18/2020',
          active: true
        },
        {
          id: 2,
          userId: 5,
          projectName: 'Uber Airplane',
          valuationCap: 7000000,
          discount: 10,
          minInvestment: 250,
          contract: 'Crowd SAFE',
          goalLow: 100000,
          goalHigh: 1000000,
          city: 'Columbus',
          state: 'Ohio',
          country: 'United States',
          email: 'test1@email.com',
          postDate: '02/10/2020',
          startDate: '03/10/2020',
          endDate: '10/30/2020',
          active: false
        },
        {
          id: 3,
          userId: 3,
          projectName: 'Lambda School: Machine Learning',
          valuationCap: 10000000,
          discount: 15,
          minInvestment: 200,
          contract: 'Crowd IPA',
          goalLow: 200000,
          goalHigh: 1000000,
          city: 'San Francisco',
          state: 'California',
          country: 'United States',
          email: 'austen@allred.com',
          postDate: '03/03/2020',
          startDate: '04/30/2020',
          endDate: '07/30/2020',
          active: false
        },
        {
          id: 4,
          userId: 1,
          projectName: 'H3LL0W0RLD',
          valuationCap: 2000000,
          discount: 10,
          minInvestment: 49,
          contract: 'Crowd SAFE',
          goalLow: 50000,
          goalHigh: 750000,
          city: 'New York',
          state: 'New York',
          country: 'United States',
          email: 'test2@email.com',
          postDate: '03/20/2020',
          startDate: '04/01/2020',
          endDate: '07/02/2020',
          active: false
        }
      ]);
    });
};
