/* 
	криптографический модуль [ npm install --save crypto ], описание [ https://js-node.ru/site/article?id=17 ]
*/
const crypto = require('crypto');

// читаем текст из ввода команндной строки
const msg = process.argv[2]; 

// создание хешей 
console.log(`message:\t${msg}\n`);

var msgMd5 = crypto.createHash('md5').update(msg).digest("hex");
console.log(`digest message md5:\t${msgMd5}`);

var msgSha256 = crypto.createHash('sha256').update(msg).digest("hex");
console.log(`digest message sha256:\t${msgSha256}\n`);

/* 
	модуль симметричное шифрование (ECDSA curve used in Bitcoin) [ npm install --save secp256k1 ]
	
	электронные подписи и их проверка, примеры кода   [https://gist.github.com/akirattii/1ccb30c3aa67876c232adfe9540c6ed6]
*/
const secp256k1 = require('secp256k1');

// создаем хешь для переданного текста
//function digest(str, algo = "sha256") {
//  return crypto.createHash(algo).update(str).digest();
//}
//const digested = digest(msg);

//console.log(`\nmessage:\t${msg} 
//message_digest:\t${digested.toString("hex")}`);


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

console.log(`privateKey:\t${privateKey.toString("hex")}`);
console.log(`publicKey:\t${publicKey.toString("hex")}\n`);

/*
 Sign the message
*/
var messageSha256 = crypto.createHash('sha256').update(msg).digest();

const sigObj = secp256k1.sign(messageSha256, privateKey);
const sig = sigObj.signature;
console.log(`Signature:\t${sig.toString("hex")}\n`);

/*
 Verify
*/
let verified = secp256k1.verify(messageSha256, sig, publicKey);

console.log(`\nverifi signature:\t${verified}`);
// => true










