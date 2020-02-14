const should = require('chai').should()
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:8080')

describe('GET /users', () => {
    it('should return a 200 response', done => {
        api
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('should return an array', done => {
        api
            .get('/api/users')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.body).to.be.an('array');
                done();
            });
    });

    it('should return an array of users', done => {
        api
            .get('/api/users')
            .set('Accept', 'application/json')
            .end((error, response) => {
                response.body.forEach(users => {
                    expect(users).to.have.property('username');
                });
                done();
            });
    });
});