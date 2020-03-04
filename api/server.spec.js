const server = require('../api/server.js');
const request = require('supertest');
const expect = require('chai').expect;

// SET 'TOKEN' VARIABLE: gives all tests access to the JSON web token provided upon successful login
let token;

// ENDPOINT: POST to login user before each test & provide a value for 'token' variable (/api/auth/login)
before(done => {
  request(server)
    .post('/api/auth/login')
    .send({
      email: 'test7@email.com',
      password: 'password'
    })
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        token = res.body.token;
        done();
      }
    });
});

// ENDPOINT: POST to Register a new user (/api/auth/register)
describe('POST /api/auth/register', function() {
  // with username field provided
  it('should respond with json 201 and an object with valid body', function(done) {
    request(server)
      .post('/api/auth/register')
      .send({
        //                              Increase the integer in SEND.email by one for new test
        email: 'test8@email.com',
        password: 'password',
        fullName: 'First',
        investor: false,
        image:
          'https://www.ajactraining.org/wp-content/uploads/2019/09/image-placeholder.jpg'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.newUser).to.have.property('email');
        done();
      });
  });
  // without all required fields provided
  it('should respond with json 500 and an object with valid error message', function(done) {
    request(server)
      .post('/api/auth/register')
      .send({ password: 'NoNameProvided' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Server could not register user');
        done();
      });
  });
});

// ENDPOINT: POST to Login an existing user (/api/auth/login)
describe('POST /api/auth/login', function() {
  // provided with a non-existing user
  it('should respond with json 401 and an object with valid error message', function(done) {
    request(server)
      .post('/api/auth/login')
      .send({ email: 'fake@notreal.com', password: 'password' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Credentials');
        done();
      });
  });
});

// ENDPOINT: GET a list of all Startups (/api/startups)
describe('GET /api/startups', function() {
  it('should return json 200 and an array of objects', done => {
    request(server)
      .get('/api/startups')
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

// ENDPOINT: GET a specific startup by ID (/api/startups/:id)
describe('GET /api/startups/:id', function() {
  // provided with an existing startup ID
  it('should respond with json 200 and an array containing one project', done => {
    request(server)
      .get('/api/startups/3')
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('array');
        done();
      });
  });
  // provided with a non-existing startup ID
  it('should respond with json 404 and an object with valid error message', done => {
    request(server)
      .get('/api/startups/99999')
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Startup with that ID does not exist');
        done();
      });
  });
});

// ENDPOINT: GET all startups for a specific user by userId (/api/startups/users/:userId)
describe('GET /api/startups/users/:userId', function() {
  // provided with an existing userId
  it('should respond with json 200 and an array containing all startups for specific user', done => {
    request(server)
      .get('/api/startups/users/1')
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('array');
        done();
      });
  });
  // provided with a non-existing userId
  it('should respond with json 404 and an object with valid error message', done => {
    request(server)
      .get('/api/startups/users/99999')
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('User with that ID does not exist');
        done();
      });
  });
});

// ENDPOINT: POST a new startup (/api/startups)
describe('POST /api/startups', function() {
  // with all required fields provided
  it('should respond with json 201 and an array with the new startup', done => {
    request(server)
      .post('/api/startups')
      .set('Authorization', token)
      .send({
        userId: 3,
        projectName: 'Altitude',
        headline: 'Bringing you higher, daily',
        valuationCap: 1800000,
        discount: 12,
        minInvestment: 75,
        contract: 'Crowd IPA',
        goalLow: 35000,
        goalHigh: 350000,
        city: 'Denver',
        state: 'Colorado',
        country: 'United States',
        email: 'altitude@email.com',
        postDate: '03/03/2020',
        startDate: '03/12/2020',
        endDate: '06/11/2020',
        active: false
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('array');
        done();
      });
  });
  // without all required fields provided
  it('should respond with json 400 and an object with valid error message', done => {
    request(server)
      .post('/api/startups')
      .set('Authorization', token)
      .send({
        userId: 4,
        projectName: 'Should Not Work',
        valuationCap: 2000000
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal(
          'Server could not post startup. Possibly missing required field(s).'
        );
        done();
      });
  });
});

// ENDPOINT: PUT to update an existing startup by ID (/api/startups/:id)
describe('PUT /api/startups/:id', function() {
  // provided with an existing startup ID and updating an existing property
  it('should respond with json 200 and and an object with valid body', done => {
    request(server)
      .put('/api/startups/5') //                   Increase :id by one for new test
      .set('Authorization', token)
      .send({ discount: 20 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Startup successfully updated');
        expect(res.body.count).to.equal(1);
        done();
      });
  });
  // provided with an existing startup ID and updating a non-existing property
  it('should respond with json 500 and an object with valid error message', done => {
    request(server)
      .put('/api/startups/6')
      .set('Authorization', token)
      .send({ dontexist: 'Hello World' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Server could not update startup');
        done();
      });
  });
  // provided with a non-existing startup ID
  it('should respond with json 404 and an object with valid error message', done => {
    request(server)
      .put('/api/startups/99999')
      .set('Authorization', token)
      .send({ discount: 20 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Startup with that ID does not exist');
        done();
      });
  });
});

// ENDPOINT: DELETE an existing startup by ID (/api/startups/:id)
describe('DELETE /api/startups:id', function() {
  // provided with an existing startup ID
  it('should respond with json 200 and an object with valid success message', done => {
    request(server)
      .delete('/api/startups/5') //                     Increase :id by one for new test
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Startup successfully deleted');
        done();
      });
  });
  // provided with a non-existing startup ID
  it('should respond with json 500 and an object with valid error message', done => {
    request(server)
      .delete('/api/startups/99999')
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Startup with that ID does not exist');
        done();
      });
  });
});
