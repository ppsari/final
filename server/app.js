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
let upload = require('./routes/upload')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(cors());

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
app.use('/api/upload', upload);


let envi = 'test';
// let env = 'local_dev'
// let env = app.settings.env;
let db_config = {
  // local_dev: 'mongodb://localhost/movie',
  development: 'mongodb://room360:R4A3RKBkXDW4QMmH@cluster0-shard-00-00-6ubhn.mongodb.net:27017,cluster0-shard-00-01-6ubhn.mongodb.net:27017,cluster0-shard-00-02-6ubhn.mongodb.net:27017/room360?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
  test: 'mongodb://room360:R4A3RKBkXDW4QMmH@cluster0-shard-00-00-6ubhn.mongodb.net:27017,cluster0-shard-00-01-6ubhn.mongodb.net:27017,cluster0-shard-00-02-6ubhn.mongodb.net:27017/room360?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
}

mongoose.connect(db_config[envi],(err,res)=>{
  console.log(db_config[envi])
  console.log(err?err:'Berhasil connect ke db '+db_config[envi]);
})


app.set('port', port);
console.log('port : '+app.get('port'))
app.listen(app.get('port'), () => {
  console.log('magic happen at port:',app.get('port'))
})
module.exports = app;
