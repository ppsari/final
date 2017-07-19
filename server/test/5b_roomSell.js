const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app');
let should = chai.should();
let RoomSell = require('../models/roomSell');
let data = {};
let room_data,propertyId;

describe('RoomSell', () => {
  before(done => {
    data = global.data;
    data.roomSell = [];
    RoomSell.remove({}, err=>{
      room_data1 = {
        name: 'tempat tidur',
        image: 'tempat_tidur.jpg',
        descr: 'sudah termasuk lemari, kasur, bantal',
      }
      room_data = {
        name: 'kamar mandi up',
        image: 'kamar mandi up.jpg',
        descr: 'sudah termasuk lemari, kasur, bantal',
      }
      _propertyId = data.propertyRent[0],
      done();
    });
  })

  describe('POST /api/roomSell/:_propertyId', function(done) {
    it('shouldnt create roomSell -- not login', done => {
      chai.request(server)
      .post(`/api/roomSell/${_propertyId}`)
      .send(room_data1)
      .end((err,roomSell) => {
          roomSell.should.have.status(200);
          roomSell.body.should.be.a('object');
          roomSell.body.should.have.property('err');
          done();
      });
    })
    it('should create propertyRoomSell', done => {
      chai.request(server)
      .post(`/api/roomSell/${_propertyId}`)
      .set('token',data.user1.token)
      .send(room_data1)
      .end((err,nroomSell) => {
        if (err) done(err);
        else if (typeof nroomSell.body.err !== 'undefined') done(err);
        else {
          // console.log("((((((((((((((((((((( nroomSell.body )))))))))))))))))))))");
          // console.log(nroomSell.body);
          nroomSell.should.have.status(200);
          nroomSell.body.should.be.a('object');
          nroomSell.body.should.have.property('image',room_data1.image);
          nroomSell.body.should.have.property('descr',room_data1.descr);
          nroomSell.body.should.have.property('name',room_data1.name);
          nroomSell.body.should.have.property('_propertyId',_propertyId);
          nroomSell.body.should.have.property('_userId',data.user1.id);
          // nroomSell.body.should.have.property('_id');
          data.roomSell.push(nroomSell.body._id);
          done();
        }
      })
    })
  })

  describe('PUT /api/roomSell/:_roomId', function(done) {
    it('shouldnt update roomSell -- not login', done => {
      chai.request(server)
      .put(`/api/roomSell/${data.roomSell[0]}`)
      .send(room_data)
      .end((err,roomSell) => {
          roomSell.should.have.status(200);
          roomSell.body.should.be.a('object');
          roomSell.body.should.have.property('err');
          done();
      });
    })
    it('should update roomSell', done => {
      chai.request(server)
      .put(`/api/roomSell/${data.roomSell[0]}`)
      .set('token',data.user1.token)
      .send(room_data)
      .end((err,nroomSell) => {
        if (err) done(err);
        else if (typeof nroomSell.body.err !== 'undefined') done(err);
        else {
          // console.log("((((((((((((((((((((( nroomSell.body )))))))))))))))))))))");
          // console.log(nroomSell.body);
          nroomSell.should.have.status(200);
          nroomSell.body.should.be.a('object');
          nroomSell.body.should.have.property('image',room_data.image);
          nroomSell.body.should.have.property('descr',room_data.descr);
          nroomSell.body.should.have.property('name',room_data.name);
          nroomSell.body.should.have.property('_propertyId',_propertyId);
          nroomSell.body.should.have.property('_userId',data.user1.id);
          // nroomSell.body.should.have.property('_id');
          data.roomSell.push(nroomSell.body._id);
          done();
        }
      })
    })
  })

  // get all
  describe('GET /api/roomSell/all/:_propertyId', function(done) {
    it('shouldnt return all roomSell -- not login', done => {
      chai.request(server)
      .get(`/api/roomSell/all/${_propertyId}`)
      .send(room_data)
      .end((err,roomSell) => {
        // console.log("///////||||||| roomSell |||||||///////");
        // console.log(roomSell.body);
        roomSell.should.have.status(200);
        roomSell.body.should.be.a('object');
        roomSell.body.should.have.property('err');
        done();
      });
    })
    it('should return all RoomSell', done => {
      chai.request(server)
      .get(`/api/roomSell/all/${_propertyId}`)
      .set('token',data.user1.token)
      .send(room_data)
      .end((err,nroomSell) => {
        if (err) done(err);
        else if (typeof nroomSell.body.err !== 'undefined') done(err);
        else {
          // console.log("++++++++++ get all room +++++++++++++");
          // console.log(nroomSell.body);
          nroomSell.should.have.status(200);
          nroomSell.body.should.be.a('array');
          nroomSell.body.should.have.length(1);
          done();
        }
      })
    })
  })

  // get one
  describe('GET /api/roomSell/:_roomId', function(done) {
    it('shouldnt return roomSell -- not login', done => {
      chai.request(server)
      .get(`/api/roomSell/${data.roomSell[0]}`)
      .end((err,roomSell) => {
        // console.log("(((((====((((( "+ data.roomSell[0] +" )))))====)))))");
          roomSell.should.have.status(200);
          roomSell.body.should.be.a('object');
          roomSell.body.should.have.property('err');
          done();
      });
    })
    it('should return One Testimony', done => {
      chai.request(server)
      .get(`/api/roomSell/${data.roomSell[0]}`)
      // .set('token',data.user1.token)
      .end((err,nroomSell) => {
        if (err) done(err);
        else if (typeof nroomSell.body.err !== 'undefined') done(err);
        else {
          console.log("(((((((((((((((( get one room ))))))))))))))))");
          console.log(nroomSell.body);
          nroomSell.should.have.status(200);
          nroomSell.body.should.be.a('object');
          nroomSell.body.should.have.property('image',room_data.image);
          nroomSell.body.should.have.property('descr',room_data.descr);
          nroomSell.body.should.have.property('name',room_data.name);
          nroomSell.body.should.have.property('_propertyId',_propertyId);
          nroomSell.body.should.have.property('_userId',data.user1.id);
          done();
        }
      })
    })
  })

  // delete one
  describe('DELETE /api/roomSell/:_roomSellId', function(done) {
    it('shouldnt return roomSell -- not login', done => {
      chai.request(server)
      .delete(`/api/roomSell/${data.roomSell[0]}`)
      .end((err,roomSell) => {
        // console.log("(((((====((((( "+ data.roomSell[0] +" )))))====)))))");
          roomSell.should.have.status(200);
          roomSell.body.should.be.a('object');
          roomSell.body.should.have.property('err');
          done();
      });
    })
    it('should return msg deleted', done => {
      chai.request(server)
      .delete(`/api/roomSell/${data.roomSell[0]}`)
      .set('token',data.user1.token)
      .end((err,nroomSell) => {
        // console.log("((((((((((((((((((((( delete nroomSell.body )))))))))))))))))))))");
        // console.log(nroomSell.body);
        if (err) done(err);
        else if (typeof nroomSell.body.err !== 'undefined') done(err);
        else {
          nroomSell.should.have.status(200);
          nroomSell.body.should.be.a('object');
          nroomSell.body.should.have.property('_id',data.roomSell[0]);
          // nroomSell.body.should.have.property('msg','deleted');

          //buat data
          chai.request(server)
          .post(`/api/roomSell/${_propertyId}`)
          .set('token',data.user1.token)
          .send(room_data1)
          .end((err,nroomSell) => {
            if (err) done(err);
            else if (typeof nroomSell.body.err !== 'undefined') done(err);
            else {
              // console.log("((((((((((((((((((((( nroomSell.body )))))))))))))))))))))");
              // console.log(nroomSell.body);
              nroomSell.should.have.status(200);
              nroomSell.body.should.be.a('object');
              nroomSell.body.should.have.property('image',room_data1.image);
              nroomSell.body.should.have.property('descr',room_data1.descr);
              nroomSell.body.should.have.property('name',room_data1.name);
              nroomSell.body.should.have.property('_propertyId',_propertyId);
              nroomSell.body.should.have.property('_userId',data.user1.id);
              // nroomSell.body.should.have.property('_id');
              data.roomSell.push(nroomSell.body._id);
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
