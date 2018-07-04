/*
    node gensig.js <file> <private key>
*/

const crypto = require('crypto');
const secp256k1 = require('secp256k1');
const fs = require('fs');

// читаем аргументы из команндной строки
const file = process.argv[2];
const fileKey = process.argv[3];

// проверяем наличие аргументов
if(file == undefined || fileKey == undefined) {
  console.log("Error: not define input arguments");
  process.exit(1);
}

// загружаем приватный ключ
fs.readFile(fileKey, function (err, data) {
    if (err) {
      return console.log("" + err);
    }
    var privateKey =  data;

    // читаем файл, получаем его хешь и шифруем секретным ключом
    fs.createReadStream(file).
      on('error', function(err) {console.log("" + err);}).
      pipe(crypto.createHash('sha256')).
      on('finish', function () {
        // хешь файла
        var dig = this.read();

        console.log(`File digest [Sha256]:\t ${dig.toString("hex")}`);

        // подписываем хеш файла
        const sig = secp256k1.sign(dig, privateKey).signature;

        // записываем подпись на диск
        fs.writeFile(file + ".dig", sig, function(err) {
          if(err) {
            return console.log(err);
          }
          console.log(`Signature saved in "${file}.dig"`);
        });
      })
});
