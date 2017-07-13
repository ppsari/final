const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app');
let should = chai.should();

let Category = require('../models/category');
let data = {};

describe('Category', () => {
  before(done => {
    data = global.data;
    data.category = [];
    Category.remove({}, err=>{done();});
  })
  describe('POST /api/category', function(done) {
    let category = {
      icon: 'villa.jpg',
      name: 'villa'
    }
    let category2 = {
      icon: 'apartment.jpg',
      name: 'apartment'
    }
    let category3 = {
      icon: 'hotel.jpg',
      name: 'hotel'
    }
    let invalidCategory = {
      icon: 'ap.jpg',
      name: 'ap'
    }
    let uncompleteCategory = {}
    it('shouldnt create category -- not login', done => {
      chai.request(server)
      .post('/api/category')
      .send(category)
      .end((err,category) => {
          category.should.have.status(200);
          category.body.should.be.a('object');
          category.body.should.have.property('err');
          // console.log('err:\n'+category.body.err);
          done();
      });
    });
    it('shouldnt create category -- not admin', done => {
      chai.request(server)
      .post('/api/category')
      .set('token',data.user1.token)
      .send(category)
      .end((err,category) => {
          category.should.have.status(200);
          category.body.should.be.a('object');
          category.body.should.have.property('err');
          // console.log('err:\n'+category.body.err);
          done();
      });
    });
    it('shouldnt create category -- invalidCategory', done => {
      chai.request(server)
      .post('/api/category')
      .set('token',data.admin.token)
      .send(invalidCategory)
      .end((err,category) => {
          category.should.have.status(200);
          category.body.should.be.a('object');
          category.body.should.have.property('err');
          // console.log('err:\n'+category.body.err);
          done();
      });
    })
    it('shouldnt create category -- uncompleteCategory', done => {
      chai.request(server)
      .post('/api/category')
      .set('token',data.admin.token)
      .send(uncompleteCategory)
      .end((err,category) => {
          category.should.have.status(200);
          category.body.should.be.a('object');
          category.body.should.have.property('err');
          // console.log('err:\n'+category.body.err);
          done();
      });
    })
    it('should create category as admin', done => {
      chai.request(server)
      .post('/api/category')
      .set('token',data.admin.token)
      .send(category)
      .end((err,ncategory) => {
        if (err) done(err);
        else if (typeof ncategory.body.err !== 'undefined') done(err);
        else {
          ncategory.should.have.status(200);
          ncategory.body.should.be.a('object');
          ncategory.body.should.have.property('icon',category.icon);
          ncategory.body.should.have.property('name',category.name);
          ncategory.body.should.have.property('_id');
          data.category.push(ncategory.body._id);
          // console.log(ncategory.body);
          done();
        }
      })
    })
    it('should create category2 as admin', done => {
      chai.request(server)
      .post('/api/category')
      .set('token',data.admin.token)
      .send(category2)
      .end((err,ncategory) => {
        if (err) done(err);
        else if (typeof ncategory.body.err !== 'undefined') done(err);
        else {
          ncategory.should.have.status(200);
          ncategory.body.should.be.a('object');
          ncategory.body.should.have.property('icon',category2.icon);
          ncategory.body.should.have.property('name',category2.name);
          ncategory.body.should.have.property('_id');
          data.category.push(ncategory.body._id);
          // console.log(ncategory.body);
          done();
        }
      })
    })
    it('should create category3 as admin', done => {
      chai.request(server)
      .post('/api/category')
      .set('token',data.admin.token)
      .send(category3)
      .end((err,ncategory) => {
        if (err) done(err);
        else if (typeof ncategory.body.err !== 'undefined') done(err);
        else {
          ncategory.should.have.status(200);
          ncategory.body.should.be.a('object');
          ncategory.body.should.have.property('icon',category3.icon);
          ncategory.body.should.have.property('name',category3.name);
          ncategory.body.should.have.property('_id');
          data.category.push(ncategory.body._id);
          // console.log(ncategory.body);
          done();
        }
      })
    })
    it('shouldnt create category -- duplicate name', done => {
      chai.request(server)
      .post('/api/category')
      .set('token',data.admin.token)
      .send(category)
      .end((err,ncategory) => {
          ncategory.should.have.status(200);
          ncategory.body.should.be.a('object');
          ncategory.body.should.have.property('err');
          // console.log('err:\n'+ncategory.body.err);
          done();
      });
    })
  })

  describe('GET /api/category', function(done) {
    it('should get category -- not login', done => {
      chai.request(server)
      .get('/api/category')
      .end((err,category) => {
        if (err) done(err);
        else if (typeof category.body.err!== 'undefined') done(err);
        else {
          category.should.have.status(200);
          category.body.should.be.a('array');
          // console.log(category.body)
          done();
        }
      });
    });
  })
  describe('GET /api/category/:id', function(done) {
    it('should get category -- not login', done => {
      chai.request(server)
      .get(`/api/category/${data.category[0]}`)
      .end((err,category) => {
        if (err) done(err);
        else if (typeof category.body.err!== 'undefined') done(err);
        else {
          category.should.have.status(200);
          category.body.should.be.a('object');
          // console.log(category.body)
          done();
        }
      });
    });
  })

  describe('PUT /api/category', function(done) {
    it('shouldnt put category -- not login', (done)=> {
      chai.request(server)
      .put(`/api/category/${data.category[0]}`)
      .end((err,category) => {
        category.should.have.status(200);
        category.body.should.be.a('object');
        category.body.should.have.property('err');
        // console.log('err:\n'+category.body.err);
        done();
      });
    });
    it('shouldnt put category -- no access', (done)=> {
      chai.request(server)
      .put(`/api/category/${data.category[0]}`)
      .set('token',data.user1.token)
      .end((err,category) => {
          category.should.have.status(200);
          category.body.should.be.a('object');
          category.body.should.have.property('err');
          // console.log('err:\n'+category.body.err);
          done();
      });
    });
    it('should put category as admin', (done)=> {
      let newname = 'category edited'
      chai.request(server)
      .put(`/api/category/${data.category[0]}`)
      .send({name: newname})
      .set('token',data.admin.token)
      .end((err,category) => {
        if (err) done(err);
        else if (typeof category.body.err !== 'undefined') done(err);
        else {
          category.should.have.status(200);
          category.body.should.be.a('object');
          category.body.should.have.property('name',newname)
          // console.log(category.body)
          done();
        }
      })
    });
  })
  describe('DELETE /api/category', (done) => {
    it('shouldnt delete category -- not login', (done)=> {
      chai.request(server)
      .delete(`/api/category/${data.category[2]}`)
      .end((err,category) => {
        category.should.have.status(200);
        category.body.should.be.a('object');
        category.body.should.have.property('err');
        // console.log('err:\n'+category.body.err);
        done();
      });
    });
    it('shouldnt delete category -- no access', (done)=> {
      chai.request(server)
      .delete(`/api/category/${data.category[2]}`)
      .set('token',data.user1.token)
      .end((err,category) => {
          category.should.have.status(200);
          category.body.should.be.a('object');
          category.body.should.have.property('err');
          // console.log('err:\n'+category.body.err);
          done();
      });
    });
    it('should delete category as admin', (done)=> {
      chai.request(server)
      .delete(`/api/category/${data.category[2]}`)
      .set('token',data.admin.token)
      .end((err,category) => {
        if (err) done(err);
        else if (typeof category.body.err !== 'undefined') done(err);
        else {
          category.should.have.status(200);
          category.body.should.be.a('object');
          // console.log(category.body)
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