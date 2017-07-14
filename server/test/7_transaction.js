const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app');
let should = chai.should();

let Transaction = require('../models/transaction');
let data = {};

describe('Transaction', () => {
  before(done => {
    data = global.data;
    done()
  })
  describe('GET /api/transaction', function(done){
    it('should get transaction -- login as admin', done => {
      chai.request(server)
      .get('/api/transaction')
      .set('token',data.admin.token)
      .end((err,transaction) => {
        if (err) done(err);
        else if (typeof transaction.body.err!== 'undefined') done(err);
        else {
          transaction.should.have.status(200);
          transaction.body.should.be.a('array');
          // console.log(transaction.body)
          done();
        }
      });
    });
    it('shouldnt get transaction -- not login', done => {
      chai.request(server)
      .get('/api/transaction')
      .end((err,transaction) => {
          transaction.should.have.status(200);
          transaction.body.should.be.a('object');
          transaction.body.should.have.property('err');
          // console.log('err:\n'+transaction.body.err);
          done();
      });
    })
    it('shouldnt get transaction -- not access', done => {
      chai.request(server)
      .get('/api/transaction')
      .set('token',data.user1.token)
      .end((err,transaction) => {
          transaction.should.have.status(200);
          transaction.body.should.be.a('object');
          // console.log(transaction.body)
          transaction.body.should.have.property('err');
          // console.log('err:\n'+transaction.body.err);
          done();
      });
    })
  })
  describe('GET /api/transaction/buyer', function(done){
    it('should get transaction -- login', done => {
      chai.request(server)
      .get('/api/transaction/buyer')
      .set('token',data.user1.token)
      .end((err,transaction) => {
        if (err) done(err);
        else if (typeof transaction.body.err!== 'undefined') done(err);
        else {
          transaction.should.have.status(200);
          transaction.body.should.be.a('array');
          // console.log(transaction.body)
          done();
        }
      });
    });
    it('shouldnt get transaction -- not login', done => {
      chai.request(server)
      .get('/api/transaction/buyer')
      .end((err,transaction) => {
          transaction.should.have.status(200);
          transaction.body.should.be.a('object');
          transaction.body.should.have.property('err');
          // console.log('err:\n'+transaction.body.err);
          done();
      });
    })
  })
  describe('GET /api/transaction/seller', function(done){
    it('should get transaction -- login', done => {
      chai.request(server)
      .get('/api/transaction/buyer')
      .set('token',data.user1.token)
      .end((err,transaction) => {
        if (err) done(err);
        else if (typeof transaction.body.err!== 'undefined') done(err);
        else {
          transaction.should.have.status(200);
          transaction.body.should.be.a('array');
          // console.log(transaction.body)
          done();
        }
      });
    });
    it('shouldnt get transaction -- not login', done => {
      chai.request(server)
      .get('/api/transaction/buyer')
      .end((err,transaction) => {
          transaction.should.have.status(200);
          transaction.body.should.be.a('object');
          transaction.body.should.have.property('err');
          // console.log('err:\n'+transaction.body.err);
          done();
      });
    })
  })
  describe('GET /api/transaction/:id', function(done){
    it('should get transaction -- login (buyer)', done => {
      chai.request(server)
      .get(`/api/transaction/${data.transaction[0]}`)
      .set('token',data.user2.token)
      .end((err,transaction) => {
        if (err) done(err);
        else if (typeof transaction.body.err!== 'undefined') done(err);
        else {
          transaction.should.have.status(200);
          transaction.body.should.be.a('object');
          // console.log(transaction.body)
          done();
        }
      });
    });

    it('should get transaction -- login (seller)', done => {
      chai.request(server)
      .get(`/api/transaction/${data.transaction[0]}`)
      .set('token',data.user1.token)
      .end((err,transaction) => {
        if (err) done(err);
        else if (typeof transaction.body.err!== 'undefined') done(err);
        else {
          transaction.should.have.status(200);
          transaction.body.should.be.a('object');
          // console.log(transaction.body)
          done();
        }
      });
    });

    it('shouldnt get transaction -- not login', done => {
      chai.request(server)
      .get(`/api/transaction/${data.transaction[0]}`)
      .end((err,transaction) => {
          transaction.should.have.status(200);
          transaction.body.should.be.a('object');
          transaction.body.should.have.property('err');
          // console.log('err:\n'+transaction.body.err);
          done();
      });
    })
  })


})