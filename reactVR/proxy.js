var fs = require('fs');
var http = require('http'),
    httpProxy = require('http-proxy');

httpProxy.createProxyServer(
  {
    target:'http://localhost:8081',
    ssl: {
      key: fs.readFileSync('key.pem', 'utf8'),
      cert: fs.readFileSync('cert.pem', 'utf8'),
      passphrase: '<ADD YOUR PASSPHRASE HERE>'
    },
  }).listen(8000);
console.log('Running!');
