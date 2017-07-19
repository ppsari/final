const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app');
let should = chai.should();
let PropertyRent = require('../models/propertyRent');
let data = {};
let pr1,pr2,pr3,prUncomplete,prInvalid;

describe('PropertyRent', () => {
  before(done => {
    data = global.data;
    data.propertyRent = [];
    // this.timeout(15000);
    PropertyRent.remove({}, err=>{
      pr1 = {
        name: 'apartemen mewah jakarta barat',
        image: 'apartemen.jpg',
        city: 'Jakarta Barat',
        descr: 'Apartemen baru bangun sangat indah sekali',
        price_amount: 1000000,
        price_descr: 'month',
        // _ownerId: data.user1.id,
        address: 'Jakarta barat blok a no 6',
        _categoryId: data.category[1],
        _accessId: [data.access[0], data.access[1]]
      }
      pr2 = {
        name: 'apartemen mewah jakarta selatan',
        image: 'apartemen.jpg',
        city: 'Jakarta Selatan',
        descr: 'Apartemen lama tempat obama waktu kecil',
        price_amount: 1250000,
        price_descr: 'day',
        address: 'Menteng',
        // _ownerId: data.user1.id,
        _categoryId: data.category[1],
        _accessId: [data.access[0], data.access[1]]
      }
      pr3 = {
        name: 'villa mewah jakarta timur',
        image: 'villa.jpg',
        city: 'Jakarta Timur',
        address: 'Jakarta tim',
        descr: 'Villa mewah tempat raja salman menginap di jakarta',
        price_amount: 99999999,
        price_descr: 'hour',
        // _ownerId: data.user2.id,
        _categoryId: data.category[0],
        _accessId: [data.access[0]]
      }
      prUncomplete = {}
      prInvalid = {
        name: 'villa mewah jakarta timur',
        image: 'villa.jpg',
        city: 'Jakarta Timur',
        descr: 'Villa mewah tempat raja salman menginap di jakarta',
        price_amount: 99999999, price_descr: 'hourly',
        // _ownerId: data.user2.id,
        _categoryId: data.category[0].id
      }
      done();
    });
  })

  describe('POST /api/propertyRent', function(done) {
    it('shouldnt create propertyRent -- not login', done => {
      chai.request(server)
      .post('/api/propertyRent')
      .send(pr1)
      .end((err,propertyRent) => {
          propertyRent.should.have.status(200);
          propertyRent.body.should.be.a('object');
          propertyRent.body.should.have.property('err');
          // console.log(propertyRent.body);
          done();
      });
    })
    it('shouldnt create propertyRent -- invalid', done => {
      chai.request(server)
      .post('/api/propertyRent')
      .set('token',data.user1.token)
      .send(prInvalid)
      .end((err,propertyRent) => {
          propertyRent.should.have.status(200);
          propertyRent.body.should.be.a('object');
          propertyRent.body.should.have.property('err');
          // console.log('err:\n'+propertyRent.body.err);
          done();
      });
    })
    it('shouldnt create propertyRent -- uncomplete', done => {
      chai.request(server)
      .post('/api/propertyRent')
      .set('token',data.user1.token)
      .send(prUncomplete)
      .end((err,propertyRent) => {
          propertyRent.should.have.status(200);
          propertyRent.body.should.be.a('object');
          propertyRent.body.should.have.property('err');
          // console.log('err:\n'+propertyRent.body.err);
          done();
      });
    })
    it('should create propertyRent1', done => {
      chai.request(server)
      .post('/api/propertyRent')
      .set('token',data.user1.token)
      .send(pr1)
      .end((err,npropertyRent) => {
        // console.log(npropertyRent.body.err)
        if (err) done(err);
        else if (typeof npropertyRent.body.err !== 'undefined') done(err);
        else {
          npropertyRent.should.have.status(200);
          npropertyRent.body.should.be.a('object');
          npropertyRent.body.should.have.property('image',pr1.image);
          npropertyRent.body.should.have.property('status','rent');
          npropertyRent.body.should.have.property('city',pr1.city);
          npropertyRent.body.should.have.property('descr',pr1.descr);
          npropertyRent.body.should.have.property('_categoryId',pr1._categoryId);
          npropertyRent.body.should.have.property('address',pr1.address);
          npropertyRent.body.should.have.property('name',pr1.name);
          npropertyRent.body.should.have.property('_ownerId',data.user1.id);
          npropertyRent.body.should.have.property('_id');
          data.propertyRent.push(npropertyRent.body._id);
          // console.log('====proprent==================')
          // console.log(npropertyRent.body);
          // console.log(npropertyRent.body._id)
          done();
        }
      })
    })
    it('should create propertyRent2', done => {
      chai.request(server)
      .post('/api/propertyRent')
      .set('token',data.user1.token)
      .send(pr2)
      .end((err,npropertyRent) => {
        if (err) done(err);
        else if (typeof npropertyRent.body.err !== 'undefined') done(err);
        else {
          npropertyRent.should.have.status(200);
          npropertyRent.body.should.be.a('object');
          npropertyRent.body.should.have.property('image',pr2.image);
          npropertyRent.body.should.have.property('status','rent');
          npropertyRent.body.should.have.property('city',pr2.city);
          npropertyRent.body.should.have.property('descr',pr2.descr);
          npropertyRent.body.should.have.property('_categoryId',pr2._categoryId);
          // npropertyRent.body.should.have.property('_accessId',pr2._accessId);
          npropertyRent.body.should.have.property('name',pr2.name);
          npropertyRent.body.should.have.property('_ownerId',data.user1.id);
          npropertyRent.body.should.have.property('_id');
          data.propertyRent.push(npropertyRent.body._id);
          done();
        }
      })
    })
    it('should create propertyRent3', done => {
      chai.request(server)
      .post('/api/propertyRent')
      .set('token',data.user2.token)
      .send(pr3)
      .end((err,npropertyRent) => {
        if (err) done(err);
        else if (typeof npropertyRent.body.err !== 'undefined') done(err);
        else {
          npropertyRent.should.have.status(200);
          npropertyRent.body.should.be.a('object');
          npropertyRent.body.should.have.property('image',pr3.image);
          npropertyRent.body.should.have.property('status','rent');
          npropertyRent.body.should.have.property('city',pr3.city);
          npropertyRent.body.should.have.property('descr',pr3.descr);
          npropertyRent.body.should.have.property('_categoryId',pr3._categoryId);
          // npropertyRent.body.should.have.property('_accessId',pr3._accessId);
          npropertyRent.body.should.have.property('name',pr3.name);
          npropertyRent.body.should.have.property('_ownerId',data.user2.id);
          npropertyRent.body.should.have.property('_id');
          data.propertyRent.push(npropertyRent.body._id);
          done();
        }
      })
    })
  })

  describe('GET /api/propertyRent', function(done) {
    it('should get propertyRent -- not login', done => {
      chai.request(server)
      .get('/api/propertyRent')
      .end((err,propertyRent) => {
        if (err) done(err);
        else if (typeof propertyRent.body.err!== 'undefined') done(err);
        else {
          propertyRent.should.have.status(200);
          propertyRent.body.should.be.a('array');
          done();
        }
      });
    });
  })
  describe('GET /api/propertyRent/:id', function(done) {
    it('should get propertyRent -- not login', done => {
      console.log(data.propertyRent[0]);
      chai.request(server)
      .get(`/api/propertyRent/${data.propertyRent[0]}`)
      .end((err,propertyRent) => {
          // console.log('-------------------------prop rent wo login-------------')
          // console.log(err)
          // console.log(propertyRent.body)
        if (err) done(err);
        else if (typeof propertyRent.body.err!== 'undefined') done(err);
        else {

          propertyRent.should.have.status(200);
          propertyRent.body.should.be.a('object');
          propertyRent.body.should.have.property('name');


          done();
        }
      });
    });
  })

  describe('SEARCH /api/propertyRent', function(done) {
    it('should search & populate propertyRent -- searchPropsENull', done => {
      chai.request(server)
      .get(`/api/propertyRent/searchENull?city=Jakarta Barat&prop=apartment`)
      .end((err,propertyRent) => {
        if (err) done(err);
        else if (typeof propertyRent.body.err!== 'undefined') done(err);
        else {
          propertyRent.should.have.status(200);
          propertyRent.body.should.be.a('array');
          // propertyRent.body.should.have.property('totalResult');

          // console.log(propertyRent.body)
          done();
        }
      });
    });
    // it('should search & populate propertyRent -- searchPropsNNull', done => {});
    it('should search propertyRent -- searchPropENull', done => {
      chai.request(server)
      .get(`/api/propertyRent/searchPropENull?city=`)
      .end((err,propertyRent) => {
        if (err) done(err);
        else if (typeof propertyRent.body.err!== 'undefined') done(err);
        else {
          propertyRent.should.have.status(200);
          propertyRent.body.should.be.a('array');
          // console.log(propertyRent.body)
          done();
        }
      });
    });
  })
  describe('PUT /api/propertyRent/:id', function(done) {
    it('shouldnt put propertyRent -- not login', (done)=> {
      chai.request(server)
      .put(`/api/propertyRent/${data.propertyRent[0]}`)
      .end((err,propertyRent) => {
        propertyRent.should.have.status(200);
        propertyRent.body.should.be.a('object');
        propertyRent.body.should.have.property('err');
        // console.log('err:\n'+propertyRent.body.err);
        done();
      });
    });
    it('shouldnt put propertyRent -- no access', (done)=> {
      chai.request(server)
      .put(`/api/propertyRent/${data.propertyRent[0]}`)
      .set('token',data.user2.token)
      .end((err,propertyRent) => {
          propertyRent.should.have.status(200);
          propertyRent.body.should.be.a('object');
          propertyRent.body.should.have.property('err');
          // console.log('err:\n'+propertyRent.body.err);
          done();
      });
    });
    it('should put propertyRent as owner', (done)=> {
      let newname = 'propertyRent edited'
      chai.request(server)
      .put(`/api/propertyRent/${data.propertyRent[0]}`)
      .send({name: newname})
      .set('token',data.user1.token)
      .end((err,propertyRent) => {
        if (err) done(err);
        else if (typeof propertyRent.body.err !== 'undefined') done(err);
        else {
          propertyRent.should.have.status(200);
          propertyRent.body.should.be.a('object');
          propertyRent.body.should.have.property('name',newname)
          // console.log(propertyRent.body)
          done();
        }
      })
    });
  })
  describe('DELETE /api/propertyRent', function(done) {
    it('shouldnt delete propertyRent -- not login', (done)=> {
      chai.request(server)
      .delete(`/api/propertyRent/${data.propertyRent[2]}`)
      .end((err,propertyRent) => {
        propertyRent.should.have.status(200);
        propertyRent.body.should.be.a('object');
        propertyRent.body.should.have.property('err');
        // console.log('err:\n'+propertyRent.body.err);
        done();
      });
    });
    it('shouldnt delete propertyRent -- no access', (done)=> {
      chai.request(server)
      .delete(`/api/propertyRent/${data.propertyRent[2]}`)
      .set('token',data.user1.token)
      .end((err,propertyRent) => {
          propertyRent.should.have.status(200);
          propertyRent.body.should.be.a('object');
          propertyRent.body.should.have.property('err');
          // console.log('err:\n'+propertyRent.body.err);
          done();
      });
    });
    it('should delete propertyRent as admin', (done)=> {
      chai.request(server)
      .delete(`/api/propertyRent/${data.propertyRent[2]}`)
      .set('token',data.user2.token)
      .end((err,propertyRent) => {
        if (err) done(err);
        else if (typeof propertyRent.body.err !== 'undefined') done(err);
        else {
          propertyRent.should.have.status(200);
          propertyRent.body.should.be.a('object');
          // console.log(propertyRent.body)
          done();
        }
      })
    });
  })

  after( done => {
    global.data = data;
    done();
  });

})