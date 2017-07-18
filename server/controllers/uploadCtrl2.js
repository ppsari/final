let aws = require('aws-sdk');

aws.config.update({
    accessKeyId: 'AKIAJYLOGZUUG25RI4VQ',
    secretAccessKey: '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'
});


const upload = (req,res) => {
  let filename = req.body.filename;
  let filetype = req.body.filetype;
  //  var s3 = new aws.S3();
  var s3 = new aws.S3({apiVersion: '2006-03-01',signatureVersion: 'v4',region:'ohio'});

  console.log(filename);
  console.log(filetype);
  // console.log('----------------------------------')
  let params = {
    Bucket: 'room360img',
    Key: filename,
    Expires: 60,
    ContentType: filetype
  }

  // var params = {Bucket: 'room360img', Key: 'key', Expires: 60};
  // var url = s3.getSignedUrl('getObject', params);
  // console.log('The URL is', url); // expires in 60 seconds


  // console.logc(s3);

    s3.getSignedUrl('putObject', params, function (err, url) {
      if (err) {
        console.log(err)
        res.send({err:err});
      }
      else
      {
        console.log('The URL is', url);
        res.send({signedUrl:url})
      }
    });

  // s3.getSignedUrl(‘putObject’, params, function(err, data) {
  //   if (err) {
  //     console.log(err);
  //     return err;
  //   } else {
  //     console.log(data)
  //     return data;
  //   }
  // })

}


module.exports = {
  upload
}