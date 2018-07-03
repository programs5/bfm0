const crypto = require('crypto');
const secp256k1 = require('secp256k1');
const fs = require('fs');

// создаем секретный ключ
let privateKey;
do {
  privateKey = crypto.randomBytes(32);
} while (!secp256k1.privateKeyVerify(privateKey));

// создаем открытый ключ
const publicKey = secp256k1.publicKeyCreate(privateKey);

// записываем ключи на диск
saveKeyFile("private.key", privateKey);
saveKeyFile("public.key", publicKey);

function saveKeyFile(fileName, message) {
  var file = fs.createWriteStream(fileName);
  file.on('error', function(err) { console.log(err); });
  file.write(message);
  file.end(function () { console.log(`${fileName} saved`); });
}
