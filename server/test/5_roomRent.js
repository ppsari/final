const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app');
let should = chai.should();
let RoomRent = require('../models/roomRent');
let data = {};
let room_data,propertyId;

describe('RoomRent', () => {
  before(done => {
    data = global.data;
    data.roomRent = [];
    RoomRent.remove({}, err=>{
      room_data1 = {
        name: 'tempat tidur',
        image: 'tempat_tidur.jpg',
        descr: 'sudah termasuk lemari, kasur, bantal',
      }
      room_data = {
        name: 'tempat up',
        image: ' up.jpg',
        descr: 'sudah termasuk lemari, kasur, bantal',
      }
      _propertyId = data.propertyRent[0],
      done();
    });
  })

  describe('POST /api/roomRent/:_propertyId', function(done) {
    it('shouldnt create roomRent -- not login', done => {
      chai.request(server)
      .post(`/api/roomRent/${_propertyId}`)
      .send(room_data1)
      .end((err,roomRent) => {
          roomRent.should.have.status(200);
          roomRent.body.should.be.a('object');
          roomRent.body.should.have.property('err');
          done();
      });
    })
    it('should create propertyRoomRent', done => {
      chai.request(server)
      .post(`/api/roomRent/${_propertyId}`)
      .set('token',data.user1.token)
      .send(room_data1)
      .end((err,nroomRent) => {
        if (err) done(err);
        else if (typeof nroomRent.body.err !== 'undefined') done(err);
        else {
          // console.log("((((((((((((((((((((( nroomRent.body )))))))))))))))))))))");
          // console.log(nroomRent.body);
          nroomRent.should.have.status(200);
          nroomRent.body.should.be.a('object');
          nroomRent.body.should.have.property('image',room_data1.image);
          nroomRent.body.should.have.property('descr',room_data1.descr);
          nroomRent.body.should.have.property('name',room_data1.name);
          nroomRent.body.should.have.property('_propertyId',_propertyId);
          nroomRent.body.should.have.property('_userId',data.user1.id);
          // nroomRent.body.should.have.property('_id');
          data.roomRent.push(nroomRent.body._id);
          done();
        }
      })
    })
  })

  describe('PUT /api/roomRent/:_roomId', function(done) {
    it('shouldnt update roomRent -- not login', done => {
      chai.request(server)
      .put(`/api/roomRent/${data.roomRent[0]}`)
      .send(room_data)
      .end((err,roomRent) => {
          roomRent.should.have.status(200);
          roomRent.body.should.be.a('object');
          roomRent.body.should.have.property('err');
          done();
      });
    })
    it('should update roomRent', done => {
      chai.request(server)
      .put(`/api/roomRent/${data.roomRent[0]}`)
      .set('token',data.user1.token)
      .send(room_data)
      .end((err,nroomRent) => {
        if (err) done(err);
        else if (typeof nroomRent.body.err !== 'undefined') done(err);
        else {
          // console.log("((((((((((((((((((((( nroomRent.body )))))))))))))))))))))");
          // console.log(nroomRent.body);
          nroomRent.should.have.status(200);
          nroomRent.body.should.be.a('object');
          nroomRent.body.should.have.property('image',room_data.image);
          nroomRent.body.should.have.property('descr',room_data.descr);
          nroomRent.body.should.have.property('name',room_data.name);
          nroomRent.body.should.have.property('_propertyId',_propertyId);
          nroomRent.body.should.have.property('_userId',data.user1.id);
          // nroomRent.body.should.have.property('_id');
          data.roomRent.push(nroomRent.body._id);
          done();
        }
      })
    })
  })

  // get all
  describe('GET /api/roomRent/all/:_propertyId', function(done) {
    it('shouldnt return all roomRent -- not login', done => {
      chai.request(server)
      .get(`/api/roomRent/all/${_propertyId}`)
      .send(room_data)
      .end((err,roomRent) => {
        // console.log("///////||||||| roomRent |||||||///////");
        // console.log(roomRent.body);
        roomRent.should.have.status(200);
        roomRent.body.should.be.a('object');
        roomRent.body.should.have.property('err');
        done();
      });
    })
    it('should return all RoomRent', done => {
      chai.request(server)
      .get(`/api/roomRent/all/${_propertyId}`)
      .set('token',data.user1.token)
      .send(room_data)
      .end((err,nroomRent) => {
        if (err) done(err);
        else if (typeof nroomRent.body.err !== 'undefined') done(err);
        else {
          // console.log("++++++++++ get all room +++++++++++++");
          // console.log(nroomRent.body);
          nroomRent.should.have.status(200);
          nroomRent.body.should.be.a('array');
          nroomRent.body.should.have.length(1);
          done();
        }
      })
    })
  })

  // get one
  describe('GET /api/roomRent/:_roomId', function(done) {
    it('shouldnt return roomRent -- not login', done => {
      chai.request(server)
      .get(`/api/roomRent/${data.roomRent[0]}`)
      .end((err,roomRent) => {
        // console.log("(((((====((((( "+ data.roomRent[0] +" )))))====)))))");
          roomRent.should.have.status(200);
          roomRent.body.should.be.a('object');
          roomRent.body.should.have.property('err');
          done();
      });
    })
    it('should return One Testimony', done => {
      chai.request(server)
      .get(`/api/roomRent/${data.roomRent[0]}`)
      // .set('token',data.user1.token)
      .end((err,nroomRent) => {
        if (err) done(err);
        else if (typeof nroomRent.body.err !== 'undefined') done(err);
        else {
          console.log("(((((((((((((((( get one room ))))))))))))))))");
          console.log(nroomRent.body);
          nroomRent.should.have.status(200);
          nroomRent.body.should.be.a('object');
          nroomRent.body.should.have.property('image',room_data.image);
          nroomRent.body.should.have.property('descr',room_data.descr);
          nroomRent.body.should.have.property('name',room_data.name);
          nroomRent.body.should.have.property('_propertyId',_propertyId);
          nroomRent.body.should.have.property('_userId',data.user1.id);
          done();
        }
      })
    })
  })

  // delete one
  describe('DELETE /api/roomRent/:_roomRentId', function(done) {
    it('shouldnt return roomRent -- not login', done => {
      chai.request(server)
      .delete(`/api/roomRent/${data.roomRent[0]}`)
      .end((err,roomRent) => {
        // console.log("(((((====((((( "+ data.roomRent[0] +" )))))====)))))");
          roomRent.should.have.status(200);
          roomRent.body.should.be.a('object');
          roomRent.body.should.have.property('err');
          done();
      });
    })
    it('should return msg deleted', done => {
      chai.request(server)
      .delete(`/api/roomRent/${data.roomRent[0]}`)
      .set('token',data.user1.token)
      .end((err,nroomRent) => {
        // console.log("((((((((((((((((((((( delete nroomRent.body )))))))))))))))))))))");
        // console.log(nroomRent.body);
        if (err) done(err);
        else if (typeof nroomRent.body.err !== 'undefined') done(err);
        else {
          nroomRent.should.have.status(200);
          nroomRent.body.should.be.a('object');
          nroomRent.body.should.have.property('_id',data.roomRent[0]);


          //buat contoh data
          chai.request(server)
          .post(`/api/roomRent/${_propertyId}`)
          .set('token',data.user1.token)
          .send(room_data1)
          .end((err,nroomRent) => {
            if (err) done(err);
            else if (typeof nroomRent.body.err !== 'undefined') done(err);
            else {
              // console.log("((((((((((((((((((((( nroomRent.body )))))))))))))))))))))");
              // console.log(nroomRent.body);
              nroomRent.should.have.status(200);
              nroomRent.body.should.be.a('object');
              nroomRent.body.should.have.property('image',room_data1.image);
              nroomRent.body.should.have.property('descr',room_data1.descr);
              nroomRent.body.should.have.property('name',room_data1.name);
              nroomRent.body.should.have.property('_propertyId',_propertyId);
              nroomRent.body.should.have.property('_userId',data.user1.id);
              // nroomRent.body.should.have.property('_id');
              data.roomRent.push(nroomRent.body._id);
              done();
            }
          })

          // done();
        }
      })
    })
  })
  after( done => {
    global.data = data;
    done();
  });

})
