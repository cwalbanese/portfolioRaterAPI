const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('http://localhost:8080');

//Portfolio tests

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
      .end((error, response) => {});
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
        expect(foundPortfolio).to.equal(portfolioToGet);
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
        expect(response.body.name).to.equal(portfolioToUpdate.name);
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

//User tests

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

describe('GET /users/:id', () => {
  let userToGet;
  before(done => {
    api
      .get('/api/users')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const users = response.body;
        userToGet = users[users.length - 1]._id;
        done();
      });
  });
  before(done => {
    api
      .get(`/api/users/${userToGet}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        done();
      });
  });
  it('should find user from the original array', done => {
    api
      .get('/api/users')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const foundUser = response.body.find(user => user._id === userToGet);
        expect(foundUser._id).to.equal(userToGet);
        done();
      });
  });
});

describe('POST /users', () => {
  const newUser = {
    username: 'johnsmith'
  };

  it('should add a user to the collection and return it', done => {
    api
      .get('/api/users')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const userToFind = response.body.find(user => user.id === newUser.id);
      });
    done();
  });
});

describe('PUT /users/update/:id', () => {
  let id = 2;
  let userToUpdate = {
    username: 'johnsmith'
  };
  before(done => {
    api
      .put(`/api/users/${id}`)
      .set('Accept', 'application/json')
      .send(userToUpdate)
      .end(done);
  });
  it('should update a user by name', done => {
    api
      .get(`/api/users/${id}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.body.username).to.equal(userToUpdate.username);
      });
    done();
  });
});

describe('DELETE /users/:id', () => {
  let userToDelete;
  before(done => {
    api
      .get('/api/users')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const users = response.body;
        userToDelete = users[users.length - 1]._id;
        done();
      });
  });
  before(done => {
    api
      .delete(`/api/users/delete/${userToDelete}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        done();
      });
  });
  it('should remove user from the original array', done => {
    api
      .get('/api/users')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const deletedUser = response.body.find(
          user => user._id === userToDelete
        );
        expect(deletedUser).to.equal(undefined);
        done();
      });
  });
});
