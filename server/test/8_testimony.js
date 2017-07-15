const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app');
let should = chai.should();
let Testimony = require('../models/testimony');
let data = {};
let testimony_data,propertyId;

describe('Testimony', () => {
  before(done => {
    data = global.data;
    data.testimony = [];
    Testimony.remove({}, err=>{
      testimony_data = {
        testimony: 'asli sama kayak foto',
      }
      _propertyId = data.propertyRent[0],
      // console.log("(((((((((((((((((((( " +_propertyId+ "))))))))))))))))))))");
      done();
    });
  })

  describe('POST /api/testimony/:_propertyId', function(done) {
    it('shouldnt create testimony -- not login', done => {
      chai.request(server)
      .post(`/api/testimony/${_propertyId}`)
      .send(testimony_data)
      .end((err,testimony) => {
          testimony.should.have.status(200);
          testimony.body.should.be.a('object');
          testimony.body.should.have.property('err');
          done();
      });
    })
    it('should create propertyTestimony', done => {
      chai.request(server)
      .post(`/api/testimony/${_propertyId}`)
      .set('token',data.user1.token)
      .send(testimony_data)
      .end((err,ntestimony) => {
        if (err) done(err);
        else if (typeof ntestimony.body.err !== 'undefined') done(err);
        else {
          console.log("((((((((((((((((((((( ntestimony.body )))))))))))))))))))))");
          console.log(ntestimony.body);
          ntestimony.should.have.status(200);
          ntestimony.body.should.be.a('object');

          ntestimony.body.should.have.property('testimony',testimony_data.testimony);
          ntestimony.body.should.have.property('_propertyId',_propertyId);
          ntestimony.body.should.have.property('_userId',data.user1.id);
          ntestimony.body.should.have.property('_id');
          data.testimony.push(ntestimony.body._id);
          done();
        }
      })
    })
  })
// get all
  describe('GET /api/testimony/all/:_propertyId', function(done) {
    it('shouldnt return testimony -- not login', done => {
      chai.request(server)
      .get(`/api/testimony/all/${_propertyId}`)
      .end((err,testimony) => {
          testimony.should.have.status(200);
          testimony.body.should.be.a('object');
          testimony.body.should.have.property('err');
          done();
      });
    })
    it('should return all Testimony', done => {
      chai.request(server)
      .get(`/api/testimony/all/${_propertyId}`)
      .set('token',data.user1.token)
      .end((err,ntestimony) => {
        if (err) done(err);
        else if (typeof ntestimony.body.err !== 'undefined') done(err);
        else {
          // console.log("((((((((((((((((((((( ntestimony.body )))))))))))))))))))))");
          // console.log(ntestimony.body);
          ntestimony.should.have.status(200);
          ntestimony.body.should.be.a('array');
          ntestimony.body.should.have.length(1)
          done();
        }
      })
    })
  })

// get one
  describe('GET /api/testimony/:_testimonyId', function(done) {
    it('shouldnt return testimony -- not login', done => {
      chai.request(server)
      .get(`/api/testimony/${data.testimony[0]}`)
      .end((err,testimony) => {
        console.log("(((((====((((( "+ data.testimony[0] +" )))))====)))))");
          testimony.should.have.status(200);
          testimony.body.should.be.a('object');
          testimony.body.should.have.property('err');
          done();
      });
    })
    it('should return One Testimony', done => {
      chai.request(server)
      .get(`/api/testimony/${data.testimony[0]}`)
      // .set('token',data.user1.token)
      .end((err,ntestimony) => {
        if (err) done(err);
        else if (typeof ntestimony.body.err !== 'undefined') done(err);
        else {
          console.log("((((((((((((((((((((( ntestimony.body )))))))))))))))))))))");
          console.log(ntestimony.body);
          ntestimony.should.have.status(200);
          ntestimony.body.should.be.a('object');
          ntestimony.body.should.have.length(1)
          ntestimony.body.should.have.property('testimony',testimony_data.testimony);
          ntestimony.body.should.have.property('_propertyId',_propertyId);
          ntestimony.body.should.have.property('_userId',data.user1.id);
          ntestimony.body.should.have.property('_id')
          done();
        }
      })
    })
  })
// delete one
  describe('DELETE /api/testimony/:_testimonyId', function(done) {
    it('shouldnt return testimony -- not login', done => {
      chai.request(server)
      .delete(`/api/testimony/${data.testimony[0]}`)
      .end((err,testimony) => {
        // console.log("(((((====((((( "+ data.testimony[0] +" )))))====)))))");
          testimony.should.have.status(200);
          testimony.body.should.be.a('object');
          testimony.body.should.have.property('err');
          done();
      });
    })
    it('should return One Testimony', done => {
      chai.request(server)
      .delete(`/api/testimony/${data.testimony[0]}`)
      .set('token',data.user1.token)
      .end((err,ntestimony) => {
        // console.log("((((((((((((((((((((( delete ntestimony.body )))))))))))))))))))))");
        // console.log(ntestimony.body);
        if (err) done(err);
        else if (typeof ntestimony.body.err !== 'undefined') done(err);
        else {
          ntestimony.should.have.status(200);
          ntestimony.body.should.be.a('object');
          ntestimony.body.should.have.property('testimony',testimony_data.testimony);
          ntestimony.body.should.have.property('_propertyId',_propertyId);
          ntestimony.body.should.have.property('_userId',data.user1.id);
          ntestimony.body.should.have.property('_id')

          //for data
          chai.request(server)
          .post(`/api/testimony/${_propertyId}`)
          .set('token',data.user1.token)
          .send(testimony_data)
          .end((err,ntestimony) => {
            if (err) done(err);
            else if (typeof ntestimony.body.err !== 'undefined') done(err);
            else {
              // console.log("((((((((((((((((((((( ntestimony.body )))))))))))))))))))))");
              // console.log(ntestimony.body);
              ntestimony.should.have.status(200);
              ntestimony.body.should.be.a('object');
              ntestimony.body.should.have.property('testimony',testimony_data.testimony);
              ntestimony.body.should.have.property('_propertyId',_propertyId);
              ntestimony.body.should.have.property('_userId',data.user1.id);
              ntestimony.body.should.have.property('_id');
              data.testimony.push(ntestimony.body._id);
              done();
            }
          })


          done();
        }
      })
    })
  })

  after( done => {
    global.data = data;
    done();
  });

})
