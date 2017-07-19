const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app');
let should = chai.should();
let PropertySell = require('../models/propertySell');
let data = {};
let pr1,pr2,pr3,prUncomplete,prInvalid;

describe('PropertySell', () => {
  before(done => {
    data = global.data;
    data.propertySell = [];

    PropertySell.remove({}, err=>{
      pr1 = {
        name: 'apartemen mewah jakarta barat',
        image: 'apartemen.jpg',
        city: 'Jakarta Barat',
        descr: 'Apartemen baru bangun sangat indah sekali',
        price_amount: 1000000000000,
        address: 'Jakarta barat blok a no 6',
        // _ownerId: data.user1.id,
        _categoryId: data.category[1],
        _accessId: [data.access[0], data.access[1]]
      }
      pr2 = {
        name: 'apartemen mewah jakarta selatan',
        image: 'apartemen.jpg',
        city: 'Jakarta Selatan',
        descr: 'Apartemen lama tempat obama waktu kecil',
        price_amount: 12500000000000,
        address: 'Menteng Raya',
        // _ownerId: data.user1.id,
        _categoryId: data.category[1],
        _accessId: [data.access[0], data.access[1]]
      }
      pr3 = {
        name: 'villa mewah jakarta timur',
        image: 'villa.jpg',
        city: 'Jakarta Timur',
        descr: 'Villa mewah tempat raja salman menginap di jakarta',
        price_amount: 99999999999999999,
        // _ownerId: data.user2.id,
        address: 'Jaktim address',
        _categoryId: data.category[0],
        _accessId: [data.access[0]]
      }
      prUncomplete = {}
      prInvalid = {
        name: '',
        image: 'villa.jpg',
        city: 'Jakarta Timur',
        descr: 'Villa mewah tempat raja salman menginap di jakarta',
        price_amount: 999999999,
        // _ownerId: data.user2.id,
        _categoryId: data.category[0].id
      }
      done();
    });
  })

  describe('POST /api/propertySell', function(done) {
    it('shouldnt create propertySell -- not login', done => {
      chai.request(server)
      .post('/api/propertySell')
      .send(pr1)
      .end((err,propertySell) => {
          propertySell.should.have.status(200);
          propertySell.body.should.be.a('object');
          propertySell.body.should.have.property('err');
          // console.log(propertySell.body);
          done();
      });
    })
    it('shouldnt create propertySell -- invalid', done => {
      chai.request(server)
      .post('/api/propertySell')
      .set('token',data.user1.token)
      .send(prInvalid)
      .end((err,propertySell) => {
        console.log('invalid propertySell');
        console.log(propertySell.body);
          propertySell.should.have.status(200);
          propertySell.body.should.be.a('object');
          propertySell.body.should.have.property('err');
          // console.log('err:\n'+propertySell.body.err);
          done();
      });
    })
    it('shouldnt create propertySell -- uncomplete', done => {
      chai.request(server)
      .post('/api/propertySell')
      .set('token',data.user1.token)
      .send(prUncomplete)
      .end((err,propertySell) => {
          propertySell.should.have.status(200);
          propertySell.body.should.be.a('object');
          propertySell.body.should.have.property('err');
          // console.log('err:\n'+propertySell.body.err);
          done();
      });
    })
    it('should create propertySell1', done => {
      chai.request(server)
      .post('/api/propertySell')
      .set('token',data.user1.token)
      .send(pr1)
      .end((err,npropertySell) => {
        if (err) done(err);
        else if (typeof npropertySell.body.err !== 'undefined') done(err);
        else {
          npropertySell.should.have.status(200);
          npropertySell.body.should.be.a('object');
          npropertySell.body.should.have.property('image',pr1.image);
          npropertySell.body.should.have.property('status','sell');
          npropertySell.body.should.have.property('city',pr1.city);
          npropertySell.body.should.have.property('descr',pr1.descr);
          npropertySell.body.should.have.property('_categoryId',pr1._categoryId);
          // npropertySell.body.should.have.property('_accessId',pr1._accessId);
          npropertySell.body.should.have.property('name',pr1.name);
          npropertySell.body.should.have.property('_ownerId',data.user1.id);
          npropertySell.body.should.have.property('_id');
          data.propertySell.push(npropertySell.body._id);
          done();
        }
      })
    })
    it('should create propertySell2', done => {
      chai.request(server)
      .post('/api/propertySell')
      .set('token',data.user1.token)
      .send(pr2)
      .end((err,npropertySell) => {
        if (err) done(err);
        else if (typeof npropertySell.body.err !== 'undefined') done(err);
        else {
          npropertySell.should.have.status(200);
          npropertySell.body.should.be.a('object');
          npropertySell.body.should.have.property('image',pr2.image);
          npropertySell.body.should.have.property('status','sell');
          npropertySell.body.should.have.property('city',pr2.city);
          npropertySell.body.should.have.property('descr',pr2.descr);
          npropertySell.body.should.have.property('_categoryId',pr2._categoryId);
          // npropertySell.body.should.have.property('_accessId',pr2._accessId);
          npropertySell.body.should.have.property('name',pr2.name);
          npropertySell.body.should.have.property('_ownerId',data.user1.id);
          npropertySell.body.should.have.property('_id');
          data.propertySell.push(npropertySell.body._id);
          done();
        }
      })
    })
    it('should create propertySell3', done => {
      chai.request(server)
      .post('/api/propertySell')
      .set('token',data.user2.token)
      .send(pr3)
      .end((err,npropertySell) => {
        if (err) done(err);
        else if (typeof npropertySell.body.err !== 'undefined') done(err);
        else {
          npropertySell.should.have.status(200);
          npropertySell.body.should.be.a('object');
          npropertySell.body.should.have.property('image',pr3.image);
          npropertySell.body.should.have.property('status','sell');
          npropertySell.body.should.have.property('city',pr3.city);
          npropertySell.body.should.have.property('descr',pr3.descr);
          npropertySell.body.should.have.property('_categoryId',pr3._categoryId);
          // npropertySell.body.should.have.property('_accessId',pr3._accessId);
          npropertySell.body.should.have.property('name',pr3.name);
          npropertySell.body.should.have.property('_ownerId',data.user2.id);
          npropertySell.body.should.have.property('_id');
          data.propertySell.push(npropertySell.body._id);
          done();
        }
      })
    })
  })

  describe('GET /api/propertySell', function(done) {
    it('should get propertySell -- not login', done => {
      chai.request(server)
      .get('/api/propertySell')
      .end((err,propertySell) => {
        if (err) done(err);
        else if (typeof propertySell.body.err!== 'undefined') done(err);
        else {
          propertySell.should.have.status(200);
          propertySell.body.should.be.a('array');
          // propertySell.body.should.have.property('totalResult');
          done();
        }
      });
    });
  })
  describe('GET /api/propertySell/:id', function(done) {
    it('should get propertySell -- not login', done => {
      chai.request(server)
      .get(`/api/propertySell/${data.propertySell[0]}`)
      .end((err,propertySell) => {
        if (err) done(err);
        else if (typeof propertySell.body.err!== 'undefined') done(err);
        else {
          propertySell.should.have.status(200);
          propertySell.body.should.be.a('object');
          // propertySell.body.should.have.property('name');
          // console.log(propertySell.body)
          done();
        }
      });
    });
  })

  describe('SEARCH /api/propertySell', function(done) {
    it('should search & populate propertySell -- searchPropsENull city', done => {
      chai.request(server)
      .get(`/api/propertySell/searchENull?city=Jakarta Barat`)
      .end((err,propertySell) => {
        if (err) done(err);
        else if (typeof propertySell.body.err!== 'undefined') done(err);
        else {
          propertySell.should.have.status(200);
          propertySell.body.should.be.a('array');
          // propertySell.body.should.have.property('totalResult');
          // console.log(propertySell.body)
          done();
        }
      });
    });
    it('should search & populate propertySell -- searchPropsENull city+prop', done => {
      chai.request(server)
      .get(`/api/propertySell/searchENull?city=Jakarta Selatan&prop=kantor`)
      .end((err,propertySell) => {
        if (err) done(err);
        else if (typeof propertySell.body.err!== 'undefined') done(err);
        else {
          propertySell.should.have.status(200);
          propertySell.body.should.be.a('array');
          // propertySell.body.should.have.property('totalResult');
          // console.log(propertySell.body)
          done();
        }
      });
    });
    it('shouldnt search & populate propertySell -- searchPropsNNull', done => {
      chai.request(server)
      .get(`/api/propertySell/searchPropsNNull?city=`)
      .end((err,propertySell) => {
        propertySell.should.have.status(200);
        propertySell.body.should.be.a('object');
        propertySell.body.should.have.property('err');
        // console.log('err:\n'+propertySell.body.err);
        done();
      });
    });
    // it('should search & populate propertySell -- searchPropsNNull', done => {});
    it('should search propertySell -- searchPropsNNull', done => {
      chai.request(server)
      .get(`/api/propertySell/searchPropsNNull?city=Jakarta`)
      .end((err,propertySell) => {
        if (err) done(err);
        else if (typeof propertySell.body.err!== 'undefined') done(err);
        else {
          propertySell.should.have.status(200);
          propertySell.body.should.be.a('array');
          // console.log(propertySell.body)
          done();
        }
      });
    });
  })
  describe('PUT /api/propertySell/:id', function(done) {
    it('shouldnt put propertySell -- not login', (done)=> {
      chai.request(server)
      .put(`/api/propertySell/${data.propertySell[0]}`)
      .end((err,propertySell) => {
        propertySell.should.have.status(200);
        propertySell.body.should.be.a('object');
        propertySell.body.should.have.property('err');
        // console.log('err:\n'+propertySell.body.err);
        done();
      });
    });
    it('shouldnt put propertySell -- no access', (done)=> {
      chai.request(server)
      .put(`/api/propertySell/${data.propertySell[0]}`)
      .set('token',data.user2.token)
      .end((err,propertySell) => {
          propertySell.should.have.status(200);
          propertySell.body.should.be.a('object');
          propertySell.body.should.have.property('err');
          // console.log('err:\n'+propertySell.body.err);
          done();
      });
    });
    it('should put propertySell as owner', (done)=> {
      let newname = 'propertySell edited'
      chai.request(server)
      .put(`/api/propertySell/${data.propertySell[0]}`)
      .send({name: newname})
      .set('token',data.user1.token)
      .end((err,propertySell) => {
        if (err) done(err);
        else if (typeof propertySell.body.err !== 'undefined') done(err);
        else {
          propertySell.should.have.status(200);
          propertySell.body.should.be.a('object');
          propertySell.body.should.have.property('name',newname)
          console.log(propertySell.body)
          done();
        }
      })
    });
  })
  describe('DELETE /api/propertySell', function(done) {
    it('shouldnt delete propertySell -- not login', (done)=> {
      chai.request(server)
      .delete(`/api/propertySell/${data.propertySell[2]}`)
      .end((err,propertySell) => {
        propertySell.should.have.status(200);
        propertySell.body.should.be.a('object');
        propertySell.body.should.have.property('err');
        // console.log('err:\n'+propertySell.body.err);
        done();
      });
    });
    it('shouldnt delete propertySell -- no access', (done)=> {
      chai.request(server)
      .delete(`/api/propertySell/${data.propertySell[2]}`)
      .set('token',data.user1.token)
      .end((err,propertySell) => {
          propertySell.should.have.status(200);
          propertySell.body.should.be.a('object');
          propertySell.body.should.have.property('err');
          // console.log('err:\n'+propertySell.body.err);
          done();
      });
    });
    it('should delete propertySell as admin', (done)=> {
      chai.request(server)
      .delete(`/api/propertySell/${data.propertySell[2]}`)
      .set('token',data.user2.token)
      .end((err,propertySell) => {
        if (err) done(err);
        else if (typeof propertySell.body.err !== 'undefined') done(err);
        else {
          propertySell.should.have.status(200);
          propertySell.body.should.be.a('object');
          // console.log(propertySell.body)
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