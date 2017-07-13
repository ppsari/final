const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app');
let should = chai.should();

const login = require('../helpers/login');
let User = require('../models/user');

let data = {
  admin : {token: '', id:''},
  admin2 : {token: '', id:''},
  user1 : {token: '', id:''},
  user2 : {token: '', id:''},
  user3 : {token: '', id:''}
}
describe('User', () => {
  before( done => {
    User.remove({}, err=>{done();});
  })

  describe('POST /user', () => {

    let user1 = {
      email : 'poppymighty@gmail.com',
      username: 'ppsari',
      password: 'password',
      name: 'poppy',
      phone: '+6285813372797'
    }
    let user2 = {
      email : 'red.alpacca@gmail.com',
      username: 'redalpacca',
      password: 'password',
      name: 'reda',
      phone: '+6285813372797'
    }
    let user3 = {
      email : 'holie.nait@gmail.com',
      username: 'holie',
      password: 'password',
      name: 'holien',
      phone: '+6285813372797'
    }
    let admin = {
      email : 'poppy_mighty@yahoo.com',
      username: 'admin',
      password: 'password',
      name: 'admin nama',
      phone: '+6285813372797',
      role: 'admin'
    }

    let admin2 = {
      email : 'poppy.puspasari@yahoo.com',
      username: 'admin2',
      password: 'password',
      name: 'admin nama2',
      phone: '+6285813372797',
      role: 'admin'
    }

    let incompleteUser = {
      name: 'name',
      phone: '+6285813372797',
      role: 'user'
    }

    let invalidUser = {
      name: 'na',
      password: 'a',
      username: 't',
      phone:'6285813372797',
      email:'popz'
    }

    it('should seed new admin', (done)=> {
      chai.request(server)
      .post('/seedUser')
      .send(admin)
      .end((err,user) => {
        if (err) done(err);
        else if (typeof user.body.err !== 'undefined') done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('email',admin.email);
          user.body.should.have.property('password');
          user.body.should.have.property('role',admin.role);
          user.body.should.have.property('phone',admin.phone);
          user.body.should.have.property('_id');

          data.admin.id = user.body._id;
          done();
        }
      })
    })
    it('should login as admin', done => {
      chai.request(server)
      .post('/login')
      .send(admin)
      .end((err,user) => {
        if (err) done(err);
        else if (typeof user.body.err !== 'undefined') done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('token');
          data.admin.token = user.body.token;
          data.admin.id = user.body.id;
          // console.log(data.admin.token)
          done();
        }
      })
    })
    it('shouldnt login -- empty data', done => {
      chai.request(server)
      .post('/login')
      .send({})
      .end((err,user) => {
        if (err) done(err);
        else if (typeof user.body.err === 'undefined') done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          // console.log('err:\n'+user.body.err);
          done();
        }
      })
    })
    it('shouldnt login as admin -- invalid password', done => {
      let wrongAdmin = {email: admin.email, password: 'wrongPassword'}
      chai.request(server)
      .post('/login')
      .send(wrongAdmin)
      .end((err,user) => {
        if (err) done(err);
        else if (typeof user.body.err === 'undefined') done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          // console.log('err:\n'+user.body.err);
          done();
        }
      })
    })
    it('shouldnt login as admin -- invalid username', done => {
      let wrongAdmin = {email: 'email@gmail.com', password: 'password'}
      chai.request(server)
      .post('/login')
      .send(wrongAdmin)
      .end((err,user) => {
        if (err) done(err);
        else if (typeof user.body.err === 'undefined') done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          // console.log('err:\n'+user.body.err);
          done();
        }
      })
    })

    it('should create user1 as admin', done => {
      chai.request(server)
      .post('/api/user')
      .set('token',data.admin.token)
      .send(user1)
      .end((err,user) => {
        if (err) done(err);
        else if (typeof user.body.err !== 'undefined') done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('email',user1.email);
          user.body.should.have.property('password');
          user.body.should.have.property('role', 'user');
          user.body.should.have.property('phone',user1.phone);
          user.body.should.have.property('_id');

          data.user1.id = user.body._id;
          done();
        }
      })
    })
    it('should create user2 as admin', done => {
      chai.request(server)
      .post('/api/user')
      .set('token',data.admin.token)
      .send(user2)
      .end((err,user) => {
        if (err) done(err);
        else if (typeof user.body.err !== 'undefined') done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('email',user2.email);
          user.body.should.have.property('password');
          user.body.should.have.property('role', 'user');
          user.body.should.have.property('phone',user2.phone);
          user.body.should.have.property('_id');
          data.user2.id = user.body._id;
          done();
        }
      })
    })
    it('should create user3 as admin', done => {
      chai.request(server)
      .post('/api/user')
      .set('token',data.admin.token)
      .send(user3)
      .end((err,user) => {
        if (err) done(err);
        else if (typeof user.body.err !== 'undefined') done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('email',user3.email);
          user.body.should.have.property('password');
          user.body.should.have.property('role', 'user');
          user.body.should.have.property('phone',user3.phone);
          user.body.should.have.property('_id');

          data.user3.id = user.body._id;
          done();
        }
      })
    })
    it('should create admin2 as admin', done => {
      chai.request(server)
      .post('/api/user')
      .set('token',data.admin.token)
      .send(admin2)
      .end((err,user) => {
        if (err) done(err);
        else if (typeof user.body.err !== 'undefined') done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          // console.log(user.body)
          user.body.should.have.property('email',admin2.email);
          user.body.should.have.property('password');
          user.body.should.have.property('role', 'admin');
          user.body.should.have.property('phone',admin2.phone);
          user.body.should.have.property('_id');

          data.admin2.id = user.body._id;
          done();
        }
      })
    })
    it('shouldnt create user -- incomplete Data', done => {
      chai.request(server)
      .post('/api/user')
      .set('token',data.admin.token)
      .send(incompleteUser)
      .end((err,user) => {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          // console.log('err:\n'+user.body.err);
          done();
      });
    })
    it('shouldnt create user -- invalid rules', done => {
      chai.request(server)
      .post('/api/user')
      .set('token',data.admin.token)
      .send(invalidUser)
      .end((err,user) => {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          // console.log('err:\n'+user.body.err);
          done();
      });
    })
    it('shouldnt create user -- not login', done => {
      chai.request(server)
      .post('/api/user')
      .send(invalidUser)
      .end((err,user) => {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          // console.log('err:\n'+user.body.err);
          done();
      });
    })
    it('shouldnt create user -- duplicate email Data', done => {
      chai.request(server)
      .post('/api/user')
      .set('token',data.admin.token)
      .send(user1)
      .end((err,user) => {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          // console.log('err:\n'+user.body.err);
          done();
      });
    })

    it('should login as user1', done => {
      chai.request(server)
      .post('/login')
      .send(user1)
      .end((err,user) => {
        if (err) done(err);
        else if (typeof user.body.err !== 'undefined') done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('token');
          data.user1.token = user.body.token;
          // console.log(data.user1.token)
          done();
        }
      })
    })
    it('shouldnt create user -- not login', done => {
      chai.request(server)
      .post('/api/user')
      .set('token',data.user1.token)
      .send(invalidUser)
      .end((err,user) => {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          // console.log('err:\n'+user.body.err);
          done();
      });
    })
    it('should login as user2', done => {
      chai.request(server)
      .post('/login')
      .send(user2)
      .end((err,user) => {
        if (err) done(err);
        else if (typeof user.body.err !== 'undefined') done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('token');
          data.user2.token = user.body.token;
          console.log(data.user2.token)
          done();
        }
      })
    })
    it('should login as user3', done => {
      chai.request(server)
      .post('/login')
      .send(user3)
      .end((err,user) => {
        if (err) done(err);
        else if (typeof user.body.err !== 'undefined') done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('token');
          data.user3.token = user.body.token;
          // console.log(data.user3.token)
          done();
        }
      })
    })

  })

  describe('GET /user', () => {
    it('shouldnt get users -- not login', (done)=> {
      chai.request(server)
      .get('/api/user')
      .end((err,users) => {
        users.should.have.status(200);
        users.body.should.be.a('object');
        users.body.should.have.property('err');
        // console.log('err:\n'+users.body.err);
        done();
      });
    });
    it('shouldnt get users -- no access', (done)=> {
      chai.request(server)
      .get('/api/user')
      .set('token',data.user1.token)
      .end((err,user) => {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          // console.log('err:\n'+user.body.err);
          done();
      });
    });
    it('should get users as admin', (done)=> {
      chai.request(server)
      .get(`/api/user`)
      .set('token',data.admin.token)
      .end((err,user) => {
        if (err) done(err);
        else if (typeof user.body.err!== 'undefined') done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('array');
          // console.log(user.body)
          done();
        }
      })
    });

  })

  describe('GET /user :id', () => {
    it('should get user as admin', (done)=> {
      chai.request(server)
      .get(`/api/user/${data.user1.id}`)
      .set('token',data.admin.token)
      .end((err,user) => {
        if (err) done(err);
        else if (typeof user.body.err!== 'undefined') done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          // console.log(user.body)
          done();
        }
      })
    });
    it('should get user as user', (done)=> {
      chai.request(server)
      .get(`/api/user/${data.user1.id}`)
      .set('token',data.user1.token)
      .end((err,user) => {
        if (err) done(err);
        else if (typeof user.body.err!== 'undefined') done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          done();
        }
      })
    });
  })

  // it('should success to delete', (done)=> {});
    describe('PUT /user', () => {
      it('shouldnt put user -- not login', (done)=> {
        chai.request(server)
        .put(`/api/user/${data.user3.id}`)
        .end((err,user) => {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          // console.log('err:\n'+user.body.err);
          done();
        });
      });
      it('shouldnt put user -- no access', (done)=> {
        chai.request(server)
        .put(`/api/user/${data.user3.id}`)
        .set('token',data.user1.token)
        .end((err,user) => {
            user.should.have.status(200);
            user.body.should.be.a('object');
            user.body.should.have.property('err');
            // console.log('err:\n'+user.body.err);
            done();
        });
      });
      it('should put user as user', (done)=> {
        let newname = 'user edited'
        chai.request(server)
        .put(`/api/user/${data.user3.id}`)
        .send({name: newname})
        .set('token',data.user3.token)
        .end((err,user) => {
          if (err) done(err);
          else if (typeof user.body.err !== 'undefined') done(err);
          else {
            user.should.have.status(200);
            user.body.should.be.a('object');
            user.body.should.have.property('name',newname)
            // console.log(user.body)
            done();
          }
        })
      });
      it('should put user as admin', (done)=> {
        let newname = 'user'
        chai.request(server)
        .put(`/api/user/${data.user3.id}`)
        .send({name: newname})
        .set('token',data.admin.token)
        .end((err,user) => {
          if (err) done(err);
          else if (typeof user.body.err !== 'undefined') done(err);
          else {
            user.should.have.status(200);
            user.body.should.be.a('object');
            user.body.should.have.property('name',newname)
            // console.log(user.body)
            done();
          }
        })
      });
    })

    describe('DELETE /user', () => {
      it('shouldnt delete user -- not login', (done)=> {
        chai.request(server)
        .delete(`/api/user/${data.user3.id}`)
        .end((err,user) => {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          // console.log('err:\n'+users.body.err);
          done();
        });
      });
      it('shouldnt delete user -- no access', (done)=> {
        chai.request(server)
        .delete(`/api/user/${data.user3.id}`)
        .set('token',data.user1.token)
        .end((err,user) => {
            user.should.have.status(200);
            user.body.should.be.a('object');
            user.body.should.have.property('err');
            // console.log('err:\n'+user.body.err);
            done();
        });
      });
      it('should delete user as admin', (done)=> {
        chai.request(server)
        .delete(`/api/user/${data.user3.id}`)
        .set('token',data.admin.token)
        .end((err,user) => {
          if (err) done(err);
          else if (typeof user.body.err !== 'undefined') done(err);
          else {
            user.should.have.status(200);
            user.body.should.be.a('object');
            // console.log(user.body)
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