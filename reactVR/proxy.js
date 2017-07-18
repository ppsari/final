var fs = require('fs');
var http = require('http'),
    httpProxy = require('http-proxy');

httpProxy.createProxyServer(
  {
    target:'http://aws-website-room-23fnj.s3-website-us-east-1.amazonaws.com',
    ssl: {
      key: fs.readFileSync('key.pem', 'utf8'),
      cert: fs.readFileSync('cert.pem', 'utf8'),
      passphrase: 'room360'
    },
  }).listen(8000);
console.log('Running!');
