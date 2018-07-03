const fs = require("fs");
const secp256k1 = require('secp256k1');

var path = "test1.txt";
var fileKey = "private.key";

// загружаем приватный ключ
fs.readFile(fileKey, function (err, data) {
    if (err) {
      return console.log("" + err);
    }
    var privateKey =  data;

    // bufferSize
    var stream = new fs.createReadStream(path, {highWaterMark: 32});

    stream.on('readable', function() {
      var data = stream.read();

      if (data != null) {
        //console.log(data);
        const sig = secp256k1.sign(data, privateKey).signature;
        console.log(sig);
      }
    });
  });




//stream.on('end', function() {
//  console.log('END!');
//});
