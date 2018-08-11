'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _www = require('../bin/www');

var _www2 = _interopRequireDefault(_www);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai2.default.assert,
    expect = _chai2.default.expect,
    should = _chai2.default.should;


should();
_chai2.default.use(_chaiHttp2.default);

describe('GET /api/v1/entries', function () {
  it('should return 200 response for get all diary entries', function (done) {
    _chai2.default.request(_www2.default).get('/api/v1/entries').end(function (err, res) {
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
describe('CREATE /api/v1/entries', function () {
  it('it should return response code 201 and message', function (done) {
    var details = {
      title: 'my new zeal',
      text: 'welcome to my new world'
    };
    _chai2.default.request(_www2.default).post('/api/v1/entries').send(details).type('form').end(function (err, res) {
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
  it('should return 400 response code for', function (done) {
    var emptyDetails = {
      title: '',
      text: ''
    };
    _chai2.default.request(_www2.default).post('/api/v1/entries').send(emptyDetails).type('form').end(function (err, res) {
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
describe('Get /api/v1/entries/:entryId', function () {
  it('should return status code 200', function (done) {
    _chai2.default.request(_www2.default).get('/api/v1/entries/1').end(function (err, res) {
      res.should.have.status('200');
      res.body.should.an('object');
      assert.isString(res.body.status);
      assert.equal(res.body.status, 'success');
      done();
    });
  });
  it('should return 404 status code', function (done) {
    _chai2.default.request(_www2.default).get('/api/v1/entries/5').end(function (err, res) {
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

describe('PUT /api/v1/entries/1', function () {
  it('should return 200 status code', function (done) {
    var details = {
      title: 'New home',
      text: 'Rome my new home'
    };
    _chai2.default.request(_www2.default).put('/api/v1/entries/1').send(details).type('form').end(function (err, res) {
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
describe('DELETE /api/v1/entries/:entryId', function () {
  it('should return 200 for deleted diary enry', function (done) {
    _chai2.default.request(_www2.default).delete('/api/v1/entries/2').end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.an('object');
      expect(res.body.status).be.a('string');
      expect(res.body.status).be.a('string');
      assert.isString(res.body.status);
      assert.isString(res.body.message);
      assert.equal(res.body.status, 'success');
      assert.equal(res.body.message, 'entry deleted successfully');
      done();
    });
  });
  it('should return 404 for non existing diary entries', function (done) {
    _chai2.default.request(_www2.default).delete('/api/v1/entries/5').end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.an('object');
      expect(res.body.status).be.a('string');
      expect(res.body.message).be.a('string');
      assert.isString(res.body.status);
      assert.isString(res.body.message);
      assert.equal(res.body.status, 'fail');
      assert.equal(res.body.message, 'The entry does not exist');
      done();
    });
  });
});