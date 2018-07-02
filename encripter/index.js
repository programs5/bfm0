const crypto = require('crypto');
const secp256k1 = require('secp256k1');
const fs = require('fs');

// читаем имя файла из команндной строки
const fileName = process.argv[2];


// get private key
let privateKey;
do {
  privateKey = crypto.randomBytes(32);
} while (!secp256k1.privateKeyVerify(privateKey));
//console.log("privateKey:" + privateKey.toString("hex"));

// get the public key
const publicKey = secp256k1.publicKeyCreate(privateKey);
//console.log("publicKey:" + publicKey.toString("hex"));

saveKeyFile("private.key", privateKey);
saveKeyFile("public.key", publicKey);

function saveKeyFile(fileName, message) {
  var file = fs.createWriteStream(fileName);
  file.on('error', function(err) { console.log(err); });
  file.write(message);
  file.end(function () { console.log(`${fileName} saved`); });
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// read stream:
// http://codewinds.com/blog/2013-08-04-nodejs-readable-streams.html







/*
fs.createReadStream(fileName).
  pipe(crypto.createHash('sha256').setEncoding('hex')).
  on('finish', function () {
    var digest = this.read();
    console.log(digest);
  })
*/
