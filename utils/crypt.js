const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const ENCRYPTION_KEY = ''; // or generate sample key Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64');
const IV_LENGTH = 16;
const key = 'CasteloDev261992PauloCasteloDev1';


exports.encrypt = function (text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    var ivstring = iv.toString('hex').slice(0, 16);
    let cipher = crypto.createCipheriv(algorithm, key, ivstring);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

exports.decrypt = function (text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    var ivstring = iv.toString('hex').slice(0, 16);
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, key , ivstring);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

