require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 3000
let index = require('./routes/index');
let transaction = require('./routes/transaction')
let propertySell = require('./routes/propertySell')
let propertyRent = require('./routes/propertyRent')
let request = require('./routes/request')
let access = require('./routes/access')
let category = require('./routes/category')
let user = require('./routes/user')
let admin = require('./routes/admin')
let roomRent = require('./routes/roomRent')
let roomSell = require('./routes/roomSell')
let testimony = require('./routes/testimony')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', index);
app.use('/api/transaction', transaction);
app.use('/api/propertySell', propertySell);
app.use('/api/propertyRent', propertyRent);
app.use('/api/request', request);
app.use('/api/access', access);
app.use('/api/category', category);
app.use('/api/user', user);
app.use('/api/admin', admin);
app.use('/api/roomRent', roomRent);
app.use('/api/roomSell', roomSell);
app.use('/api/testimony', testimony);


app.use(cors());

var env = app.settings.env;
var db_config = {
  development: process.env.DATABASE_URL,
  test: process.env.DATABASE_TEST_URL
}

mongoose.connect(db_config[env],(err,res)=>{
  console.log(err?err:'Berhasil connect ke db '+db_config[env]);
})


app.set('port', port);
console.log('port : '+app.get('port'))
app.listen(app.get('port'), () => {
  console.log('magic happen at http://localhost:',app.get('port'))
})
module.exports = app;
