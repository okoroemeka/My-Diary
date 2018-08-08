import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../bin/www';

const { assert, expect, should } = chai;

should();
chai.use(chaiHttp);

describe('GET /api/v1/entries', () => {
  it('should return 200 response for get all diary entries', (done) => {
    chai.request(server)
      .get('/api/v1/entries')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.an('object');
        res.body.data.should.be.an('array');
        expect(res.body.status).be.a('string');
        assert.isString(res.body.status);
        assert.equal(res.body.status, 'success');
        done();
      });
  });
});
describe('CREATE /api/v1/entries', () => {
  it('it should return response code 201 and message', (done) => {
    const details = {
      title: 'my new zeal',
      text: 'welcome to my new world',
    };
    chai.request(server)
      .post('/api/v1/entries')
      .send(details)
      .type('form')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        expect(res.body.status).be.a('string');
        assert.isObject(res.body.data);
        assert.isString(res.body.status);
        assert.equal(res.body.status, 'success');
        assert.equal(res.body.message, 'entry created successfully');
        done();
      });
  });
  it('should return 400 response code for', (done) => {
    const emptyDetails = {
      title: '',
      text: '',
    };
    chai.request(server)
      .post('/api/v1/entries')
      .send(emptyDetails)
      .type('form')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        expect(res.body.status).be.a('string');
        assert.isString(res.body.status);
        assert.isString(res.body.message);
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'bad request');
        done();
      });
  });
});
describe('Get /api/v1/entries/:entryId', () => {
  it('should return status code 200', (done) => {
    chai.request(server)
      .get('/api/v1/entries/1')
      .end((err, res) => {
        res.should.have.status('200');
        res.body.should.an('object');
        assert.isString(res.body.status);
        assert.equal(res.body.status, 'success');
        done();
      });
  });
  it('should return 404 status code', (done) => {
    chai.request(server)
      .get('/api/v1/entries/5')
      .end((err, res) => {
        res.should.have.status('404');
        res.body.should.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.isString(res.body.status);
        assert.isString(res.body.message);
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'Not found');
        done();
      });
  });
});

describe('PUT /api/v1/entries/1', () => {
  it('should return 200 status code', (done) => {
    const details = {
      title: 'New home',
      text: 'Rome my new home',
    };
    chai.request(server)
      .put('/api/v1/entries/1')
      .send(details)
      .type('form')
      .end((err, res) => {
        res.should.have.status('200');
        res.body.should.be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        expect(res.body.data).be.a('object');
        assert.isString(res.body.status);
        assert.isString(res.body.message);
        assert.equal(res.body.status, 'success');
        assert.equal(res.body.message, 'Updated successully');
        assert.isObject(res.body.data);
        done();
      });
  });
});
describe('DELETE /api/v1/entries/:entryId', () => {
  it('should return 404 for non existing diary entries', (done) => {
    chai.request(server)
      .delete('/api/v1/entries/3')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        done();
      });
  });
});
