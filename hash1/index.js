/* 
	криптографический модуль [ npm install --save crypto ], описание [ https://js-node.ru/site/article?id=17 ]
*/

const crypto = require('crypto');

// создание хешей 
var str = '1111';
console.log(`string:\t${str}`);

var strMd5 = crypto.createHash('md5').update(str).digest("hex");
console.log(`digest md5:\t${strMd5}`);

var strSha256 = crypto.createHash('sha256').update(str).digest("hex");
console.log(`digest sha256:\t${strSha256}`);

/* 
	модуль симметричное шифрование (ECDSA curve used in Bitcoin) [ npm install --save secp256k1 ]
	
	электронные подписи и их проверка, примеры кода   [https://gist.github.com/akirattii/1ccb30c3aa67876c232adfe9540c6ed6]
*/

const secp256k1 = require('secp256k1');

// читаем текст из ввода команндной строки
const msg = process.argv[2]; 

// создаем хешь для переданного текста
function digest(str, algo = "sha256") {
  return crypto.createHash(algo).update(str).digest();
}
const digested = digest(msg);

console.log(`\nmessage:\t${msg} 
message_digest:\t${digested.toString("hex")}`);

/*
 Generate keypairs
*/
// generate privateKey
let privateKey;
do {
  privateKey = crypto.randomBytes(32);
  //console.log(privateKey);  
} while (!secp256k1.privateKeyVerify(privateKey)); // проверка возможности использования созданного ключа

// get the public key in a compressed format
const publicKey = secp256k1.publicKeyCreate(privateKey);

console.log(`\npublicKey:\t${publicKey.toString("hex")}
privateKey:\t${privateKey.toString("hex")}`);

/*
 Sign the message
*/
const sigObj = secp256k1.sign(digested, privateKey);
const sig = sigObj.signature;
console.log(`\nSignature:\t${sig.toString("hex")}`);

/*
 Verify
*/
let verified = secp256k1.verify(digested, sig, publicKey);

console.log(`\nverifi signature:\t${verified}`);
// => true










