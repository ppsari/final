const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app');
let should = chai.should();

let Transaction = require('../models/transaction');
let data = {};

describe('Transaction', () => {
  before(done => {
    data = global.data;
    data.transaction = [];
    Transaction.remove({}, err=>{done();});
  })
})