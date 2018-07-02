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

// get the public key
const publicKey = secp256k1.publicKeyCreate(privateKey);

writeKey(privateKey, "private.key");
writeKey(publicKey, "public.key");

function writeKey(strKey, fileName) {
  fs.writeFile(fileName, strKey, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log(`${fileName} was saved.`);
  });
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

fs.readFile('private.key', function(err, contents) {
    console.log("\nReaded: " + contents);
});

console.log("END.");

/*
fs.createReadStream(fileName).
  pipe(crypto.createHash('sha256').setEncoding('hex')).
  on('finish', function () {
    var digest = this.read();
    console.log(digest);
  })
*/
