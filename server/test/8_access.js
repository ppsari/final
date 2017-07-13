const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app');
let should = chai.should();

let Access = require('../models/access');
let data = {};

describe('Access', () => {
  before(done => {
    data = global.data;
    data.access = [];
    Access.remove({}, err=>{done();});
  })
  describe('POST /api/access', function(done) {
    let access = {
      icon: 'rumahsakit.jpg',
      name: 'rumah sakit'
    }
    let access2 = {
      icon: 'indomaret.jpg',
      name: 'indomaret'
    }
    let access3 = {
      icon: 'warnet.jpg',
      name: 'warnet'
    }
    let invalidAccess = {
      icon: 'ap.jpg',
      name: 'ap'
    }
    let uncompleteAccess = {}
    it('shouldnt create access -- not login', done => {
      chai.request(server)
      .post('/api/access')
      .send(access)
      .end((err,access) => {
          access.should.have.status(200);
          access.body.should.be.a('object');
          access.body.should.have.property('err');
          // console.log('err:\n'+access.body.err);
          done();
      });
    });
    it('shouldnt create access -- not admin', done => {
      chai.request(server)
      .post('/api/access')
      .set('token',data.user1.token)
      .send(access)
      .end((err,access) => {
          access.should.have.status(200);
          access.body.should.be.a('object');
          access.body.should.have.property('err');
          // console.log('err:\n'+access.body.err);
          done();
      });
    });
    it('shouldnt create access -- invalidAccess', done => {
      chai.request(server)
      .post('/api/access')
      .set('token',data.admin.token)
      .send(invalidAccess)
      .end((err,access) => {
          access.should.have.status(200);
          access.body.should.be.a('object');
          access.body.should.have.property('err');
          // console.log('err:\n'+access.body.err);
          done();
      });
    })
    it('shouldnt create access -- uncompleteAccess', done => {
      chai.request(server)
      .post('/api/access')
      .set('token',data.admin.token)
      .send(uncompleteAccess)
      .end((err,access) => {
          access.should.have.status(200);
          access.body.should.be.a('object');
          access.body.should.have.property('err');
          // console.log('err:\n'+access.body.err);
          done();
      });
    })
    it('should create access as admin', done => {
      chai.request(server)
      .post('/api/access')
      .set('token',data.admin.token)
      .send(access)
      .end((err,naccess) => {
        if (err) done(err);
        else if (typeof naccess.body.err !== 'undefined') done(err);
        else {
          naccess.should.have.status(200);
          naccess.body.should.be.a('object');
          naccess.body.should.have.property('icon',access.icon);
          naccess.body.should.have.property('name',access.name);
          naccess.body.should.have.property('_id');
          data.access.push(naccess.body._id);
          // console.log(naccess.body);
          done();
        }
      })
    })
    it('should create access2 as admin', done => {
      chai.request(server)
      .post('/api/access')
      .set('token',data.admin.token)
      .send(access2)
      .end((err,naccess) => {
        if (err) done(err);
        else if (typeof naccess.body.err !== 'undefined') done(err);
        else {
          naccess.should.have.status(200);
          naccess.body.should.be.a('object');
          naccess.body.should.have.property('icon',access2.icon);
          naccess.body.should.have.property('name',access2.name);
          naccess.body.should.have.property('_id');
          data.access.push(naccess.body._id);
          // console.log(naccess.body);
          done();
        }
      })
    })
    it('should create access3 as admin', done => {
      chai.request(server)
      .post('/api/access')
      .set('token',data.admin.token)
      .send(access3)
      .end((err,naccess) => {
        if (err) done(err);
        else if (typeof naccess.body.err !== 'undefined') done(err);
        else {
          naccess.should.have.status(200);
          naccess.body.should.be.a('object');
          naccess.body.should.have.property('icon',access3.icon);
          naccess.body.should.have.property('name',access3.name);
          naccess.body.should.have.property('_id');
          data.access.push(naccess.body._id);
          // console.log(naccess.body);
          done();
        }
      })
    })
    it('shouldnt create access -- duplicate name', done => {
      chai.request(server)
      .post('/api/access')
      .set('token',data.admin.token)
      .send(access)
      .end((err,naccess) => {
          naccess.should.have.status(200);
          naccess.body.should.be.a('object');
          naccess.body.should.have.property('err');
          // console.log('err:\n'+naccess.body.err);
          done();
      });
    })
  })

  describe('GET /api/access', function(done) {
    it('should get access -- not login', done => {
      chai.request(server)
      .get('/api/access')
      .end((err,access) => {
        if (err) done(err);
        else if (typeof access.body.err!== 'undefined') done(err);
        else {
          access.should.have.status(200);
          access.body.should.be.a('array');
          // console.log(access.body)
          done();
        }
      });
    });
  })
  describe('GET /api/access/:id', function(done) {
    it('should get access -- not login', done => {
      chai.request(server)
      .get(`/api/access/${data.access[0]}`)
      .end((err,access) => {
        if (err) done(err);
        else if (typeof access.body.err!== 'undefined') done(err);
        else {
          access.should.have.status(200);
          access.body.should.be.a('object');
          // console.log(access.body)
          done();
        }
      });
    });
  })

  describe('PUT /api/access', function(done) {
    it('shouldnt put access -- not login', (done)=> {
      chai.request(server)
      .put(`/api/access/${data.access[0]}`)
      .end((err,access) => {
        access.should.have.status(200);
        access.body.should.be.a('object');
        access.body.should.have.property('err');
        // console.log('err:\n'+access.body.err);
        done();
      });
    });
    it('shouldnt put access -- no access', (done)=> {
      chai.request(server)
      .put(`/api/access/${data.access[0]}`)
      .set('token',data.user1.token)
      .end((err,access) => {
          access.should.have.status(200);
          access.body.should.be.a('object');
          access.body.should.have.property('err');
          // console.log('err:\n'+access.body.err);
          done();
      });
    });
    it('should put access as admin', (done)=> {
      let newname = 'access edited'
      chai.request(server)
      .put(`/api/access/${data.access[0]}`)
      .send({name: newname})
      .set('token',data.admin.token)
      .end((err,access) => {
        if (err) done(err);
        else if (typeof access.body.err !== 'undefined') done(err);
        else {
          access.should.have.status(200);
          access.body.should.be.a('object');
          access.body.should.have.property('name',newname)
          // console.log(access.body)
          done();
        }
      })
    });
  })
  describe('DELETE /api/access', (done) => {
    it('shouldnt delete access -- not login', (done)=> {
      chai.request(server)
      .delete(`/api/access/${data.access[2]}`)
      .end((err,access) => {
        access.should.have.status(200);
        access.body.should.be.a('object');
        access.body.should.have.property('err');
        // console.log('err:\n'+access.body.err);
        done();
      });
    });
    it('shouldnt delete access -- no access', (done)=> {
      chai.request(server)
      .delete(`/api/access/${data.access[2]}`)
      .set('token',data.user1.token)
      .end((err,access) => {
          access.should.have.status(200);
          access.body.should.be.a('object');
          access.body.should.have.property('err');
          // console.log('err:\n'+access.body.err);
          done();
      });
    });
    it('should delete access as admin', (done)=> {
      chai.request(server)
      .delete(`/api/access/${data.access[2]}`)
      .set('token',data.admin.token)
      .end((err,access) => {
        if (err) done(err);
        else if (typeof access.body.err !== 'undefined') done(err);
        else {
          access.should.have.status(200);
          access.body.should.be.a('object');
          // console.log(access.body)
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