const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app');
let should = chai.should();

let Request = require('../models/request');
let Transaction = require('../models/transaction');
let data = {};
let r1,r2,r3, rInvalid, rUncomplete;

describe('Request', () => {
  before(done => {
    data = global.data;
    data.request = [];
    data.transaction = [];
    Request.remove({}, err=>{
      r1 = {
        duration: 50,
        kind: 'PropertyRent',
        _propertyId:data.propertyRent[0],
        _sellerId:data.user1.id,
        _userId: data.user2.id
      }
      r2 = {
        duration: 1,
        kind: 'PropertyRent',
        _propertyId:data.propertyRent[1],
        _sellerId:data.user1.id,
        _userId: data.user2.id
      }
      r3 = {
        duration: 1,
        kind: 'PropertySell',
        _propertyId:data.propertyRent[0],
        _sellerId:data.user1.id,
        _userId: data.user2.id
      }
      rInvalid = {
        duration: 50,
        kind: 'PropertyRent',
        _propertyId:data.propertyRent[0],
        _sellerId:data.user1.id,
        _userId: data.user1.id
      }
      done();
    });
  })

  describe('POST /api/request', function(done){
    it('shouldnt create request -- not login', done => {
      chai.request(server)
      .post('/api/request')
      .send(r1)
      .end((err,request) => {
          request.should.have.status(200);
          request.body.should.be.a('object');
          request.body.should.have.property('err');
          // console.log('err:\n'+request.body.err);
          done();
      });
    });
    it('shouldnt create request -- invalidRequest (own product)', done => {
      chai.request(server)
      .post('/api/request')
      .set('token',data.user1.token)
      .send(rInvalid)
      .end((err,request) => {
          request.should.have.status(200);
          request.body.should.be.a('object');
          request.body.should.have.property('err');
          // console.log('err:\n'+request.body.err);
          done();
      });
    })

    it('should create request1', done => {
      chai.request(server)
      .post('/api/request')
      .set('token',data.user2.token)
      .send(r1)
      .end((err,nrequest) => {
        if (err) done(err);
        else if (typeof nrequest.body.err !== 'undefined') done(err);
        else {
          nrequest.should.have.status(200);
          nrequest.body.should.be.a('object');
          // nrequest.body.should.have.property('duration',r1.duration);
          nrequest.body.should.have.property('_id');
          data.request.push(nrequest.body._id);
          // console.log(nrequest.body);
          done();
        }
      })
    })

    it('should create request2', done => {
      chai.request(server)
      .post('/api/request')
      .set('token',data.user2.token)
      .send(r2)
      .end((err,nrequest) => {
        if (err) done(err);
        else if (typeof nrequest.body.err !== 'undefined') done(err);
        else {
          nrequest.should.have.status(200);
          nrequest.body.should.be.a('object');
          // nrequest.body.should.have.property('duration',r2.duration);
          nrequest.body.should.have.property('_id');
          data.request.push(nrequest.body._id);
          // console.log(nrequest.body);
          done();
        }
      })
    })

    it('should create request3', done => {
      chai.request(server)
      .post('/api/request')
      .set('token',data.user2.token)
      .send(r3)
      .end((err,nrequest) => {
        if (err) done(err);
        else if (typeof nrequest.body.err !== 'undefined') done(err);
        else {
          nrequest.should.have.status(200);
          nrequest.body.should.be.a('object');
          // nrequest.body.should.have.property('duration',r3.duration);
          nrequest.body.should.have.property('_id');
          data.request.push(nrequest.body._id);
          // console.log(nrequest.body);

        }
        done();
      })
    })

  })
  describe('GET /api/request', function(done){
    it('should get request -- login', done => {
      chai.request(server)
      .get('/api/request')
      .set('token',data.user1.token)
      .end((err,request) => {
        if (err) done(err);
        else if (typeof request.body.err!== 'undefined') done(err);
        else {
          request.should.have.status(200);
          request.body.should.be.a('array');
          // console.log(request.body)
          done();
        }
      });
    });
    it('shouldnt get request -- not login', done => {
      chai.request(server)
      .get('/api/request')
      .end((err,request) => {
          request.should.have.status(200);
          request.body.should.be.a('object');
          request.body.should.have.property('err');
          // console.log('err:\n'+request.body.err);
          done();
      });
    })
  })
  describe('GET /api/request:id', function(done){
    it('should get request -- login', done => {
      chai.request(server)
      .get(`/api/request/${data.request[0]}`)
      .set('token',data.user1.token)
      .end((err,request) => {
        if (err) done(err);
        else if (typeof request.body.err !== 'undefined') done(err);
        else {
          request.should.have.status(200);
          request.body.should.be.a('object');
          // console.log(request.body)
          done();
        }
      });
    });
    it('shouldnt get request -- not login', done => {
      chai.request(server)
      .get(`/api/request/${data.request[0]}`)
      .end((err,request) => {
          request.should.have.status(200);
          request.body.should.be.a('object');
          request.body.should.have.property('err');
          // console.log(request.body)
          // console.log('err:\n'+request.body.err);
          done();
      });
    })

  //   it('shouldnt get request -- not access', done => {
  //     chai.request(server)
  //     .get(`/api/request/${data.request[0]}`)
  //     .set('token',data.user2.token)
  //     .end((err,request) => {
  //         request.should.have.status(200);
  //         request.body.should.be.a('object');
  //         request.body.should.have.property('err');
  //         console.log('err:\n'+request.body.err);
  //         done();
  //     });
  //   })
  })
  describe('DELETE /api/request', function(done){

    it('should delete request as seller (reject)', (done)=> {
      let requestDt = {
        _sellerId : data.user1.id,
        response: 'reject'
      }
      chai.request(server)
      .post(`/api/request/delete/${data.request[0]}`)
      .set('token',data.user1.token)
      .send(requestDt)
      .end((err,request) => {
        if (err) done(err);
        else if (typeof request.body.err !== 'undefined') done(err);
        else {
          request.should.have.status(200);
          request.body.should.be.a('object');
          // console.log(request.body)
          done();
        }
      })
    });

    it('should delete request as seller (approved)', (done)=> {
      console.log('approved')
      let requestDt = {
        _sellerId : data.user1.id,
        response: 'approved',
        _propertyId: r2._propertyId,
        kind: r2.kind,
        note: 'ga mau aja'
      }
      chai.request(server)
      .post(`/api/request/delete/${data.request[1]}`)
      .set('token',data.user1.token)
      .send(requestDt)
      .end((err,request) => {
        if (err) done(err);
        else if (typeof request.body.err !== 'undefined') done(err);
        else {
          console.log('deleted');
          request.should.have.status(200);
          request.body.should.be.a('object');
          request.body.should.have.property('_id',data.request[1]);
          done()
        }
      })
    });

  })
  after( done => {
    global.data = data;
    done();
  });
})