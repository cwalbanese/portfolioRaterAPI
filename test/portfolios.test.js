const should = require('chai').should()
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:8080')

describe('GET /portfolios', () => {
    it('should return a 200 response', done => {
        api
            .get('/api/portfolios')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('should return an array', done => {
        api
            .get('/api/portfolios')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.body).to.be.an('array');
                done();
            });
    });

    it('should return an array of portfolios', done => {
        api
            .get('/api/portfolios')
            .set('Accept', 'application/json')
            .end((error, response) => {
                response.body.forEach(portfolios => {
                    expect(portfolios).to.have.property('name');
                });
                done();
            });
    });
});

describe('GET /portfolios/:id', () => {
    let portfolioToGet;
    before(done => {
        api
            .get('/api/portfolios')
            .set('Accept', 'application/json')
            .end((error, response) => {
                const portfolios = response.body;
                userToGet = portfolios[portfolios.length - 1]._id;
            });
            done();
    });
    before(done => {
        api
            .get(`/api/portfolios/${portfolioToGet}`)
            .set('Accept', 'application/json')
            .end((error, response) => {
            });
            done();
    });
    it('should find portfolio from the original array', done => {
        api
            .get('/api/portfolios')
            .set('Accept', 'application/json')
            .end((error, response) => {
                const foundPortfolio = response.body.find(
                    portfolio => portfolio._id === portfolioToGet
                );
                expect(foundPortfolio._id).to.equal(portfolioToGet);
            });
            done();
    });
});

describe('POST /portfolios', () => {
    const newPortfolio = {
        name: 'johnsmith',
        title: 'developer',
        description: 'cool',
        link: 'jfdlksj',
        imageUrl: 'fdsahfl'
    };

    it('should add a portfolio to the collection and return it', done => {
        api
            .get('/api/portfolios')
            .set('Accept', 'application/json')
            .end((error, response) => {
                const portfolioToFind = response.body.find(
                    portfolio => portfolio.id === newPortfolio.id
                );
            });
        done();
    });
});

describe('PUT /portfolios/update/:id', () => {
    let id = 2;
    let portfolioToUpdate = {
        name: 'janedoe',
        title: 'developer',
        description: 'cool',
        link: 'jfdlksj',
        imageUrl: 'fdsahfl'

    };
    before(done => {
        api
            .put(`/api/portfolios/${id}`)
            .set('Accept', 'application/json')
            .send(portfolioToUpdate)
            .end(done);
    });
    it('should update a portfolio by name', done => {
        api
            .get(`/api/portfolios/${id}`)
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.body.name).to.equal(userToUpdate.name);
            });
        done();
    });
});

describe('DELETE /portfolios/:id', () => {
    let portfolioToDelete;
    before(done => {
        api
            .get('/api/portfolios')
            .set('Accept', 'application/json')
            .end((error, response) => {
                const portfolios = response.body;
                portfolioToDelete = portfolios[portfolios.length - 1]._id;
                done();
            });
    });
    before(done => {
        api
            .delete(`/api/portfolios/delete/${portfolioToDelete}`)
            .set('Accept', 'application/json')
            .end((error, response) => {
                done();
            });
    });
    it('should remove portfolio from the original array', done => {
        api
            .get('/api/portfolios')
            .set('Accept', 'application/json')
            .end((error, response) => {
                const deletedPortfolio = response.body.find(
                    portfolio => portfolio._id === portfolioToDelete
                );
                expect(deletedPortfolio).to.equal(undefined);
                done();
            });
    });
});