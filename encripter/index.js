const fs = require("fs");
const secp256k1 = require('secp256k1');

var file = "test1.txt";
var fileKey = "private.key";

const blockSize = 32;

let encriptText = new Buffer.alloc(0);

// загружаем приватный ключ
fs.readFile(fileKey, function (err, data) {
    if (err) {
      return console.log("" + err);
    }
    var privateKey =  data;

    var stream = new fs.createReadStream(file, {highWaterMark: blockSize});

    // readable
    stream.on('readable', function() {
      var data = stream.read();

      if (data != null) {
         if(data.length < blockSize) {
            data = Buffer.concat([data,  new Buffer.alloc(blockSize - data.length)]);
         }
         const sig = secp256k1.sign(data, privateKey).signature;
         encriptText = Buffer.concat([encriptText, sig]);
      }
    });

    // end
    stream.on('end', function() {
      // записываем зашифрованный текст в файл
      fs.writeFile(file + ".enc", encriptText, function(err) {
        if(err) {
          return console.log(err);
        }
        console.log(`Encripted text saved in "${file}.enc"`);
      });
    });
  });
