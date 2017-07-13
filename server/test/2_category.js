const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app');