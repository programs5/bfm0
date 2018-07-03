/*
    node verifysig.js <file> <signature> <public key>
*/

const crypto = require('crypto');
const secp256k1 = require('secp256k1');
const fs = require('fs');

// читаем аргументы из команндной строки
const file = process.argv[2];
const fileSig = process.argv[3];
const fileKey = process.argv[4];

// проверяем наличие аргументов
if(process.argv[2] == undefined || process.argv[3] == undefined) {
  console.log("Error: not define input arguments");
  process.exit(1);
}

// загружаем открытый ключ
fs.readFile(fileKey, function (err, data) {
    if (err) {
      return console.log("" + err);
    }
    var pubKey =  data;

    // загружаем файл и получаем его хешь
    fs.createReadStream(file).
      on('error', function(err) {console.log("" + err);}).
      pipe(crypto.createHash('sha256')).
      on('finish', function () {
        var dig = this.read();

        // загружаем подпись
        fs.readFile(fileSig, function (err, data) {
            if (err) {
              return console.log("" + err);
            }
            var sig =  data;

            // проверяем подпись
            console.log(`Signature for file "${file}" is ${secp256k1.verify(dig, sig, pubKey)}`);
        });
      });
})
