const server = require('../api/server.js');
const request = require('supertest');
const expect = require('chai').expect;
const should = require('chai').should();

let token;

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

// Endpoint: POST to Register a new user (/api/auth/register)
describe('POST /api/auth/register', function() {
  // with username field provided
  it('should respond with json 201 and an object with valid body', function(done) {
    request(server)
      .post('/api/auth/register')
      .send({
        email: 'test16@email.com',
        password: 'password',
        fullName: 'First',
        investor: false
      })
      // update send ^ on new test
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
      .send({ password: 'noname' })
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

// Endpoint: POST to Login an existing user (/api/auth/login)
describe('POST /api/auth/login', function() {
  // attempt to login with non-existent user
  it('should respond with json 401 and an object with valid error message', function(done) {
    request(server)
      .post('/api/auth/login')
      .send({ email: 'carlosis', password: 'password' })
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
  // .expect('Content-Type', 'text/html; charset=utf-8')
  // .expect(404)
});

// Endpoint: GET a list of all Startups (/api/startups)
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

// Endpoint: GET a specific startup by ID (/api/startups/:id)
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
  // provided with a non-existing user
  it('should respond with json 200 and an empty array', done => {
    request(server)
      .get('/api/startups/99999')
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.empty;
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

// Endpoint: POST a new startup (/api/startups)
describe('POST /api/startups', function() {
  // with all required fields provided
  it('should respond with json 201 and an array with the new startup', done => {
    request(server)
      .post('/api/startups')
      .set('Authorization', token)
      .send({
        userId: 3,
        projectName: 'Altitude',
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
        projectName: 'Shouldnt Work',
        valuationCap: 2000000
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Server could not post startup');
        done();
      });
  });
  // possibly 500
});

// Endpoint: PUT to update an existing startup by ID (/api/startups/:id)
describe('PUT /api/startups/:id', function() {
  // update startup with an existing property
  it('should respond with json 200 and and an object with valid body', done => {
    request(server)
      .put('/api/startups/7')
      // update PUT or SEND on new test
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
  // update startup with a non-existing property
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
});

// Endpoint: DELETE an existing startup by ID (/api/startups/:id)
describe('DELETE /api/startups:id', function() {
  // provided with an existing startup ID
  it('should respond with json 200 and an object with valid success message', done => {
    request(server)
      .delete('/api/startups/9')
      // update PUT ^ on new test
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
