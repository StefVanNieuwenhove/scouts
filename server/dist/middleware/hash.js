"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
function encrypt(data) {
    const secret_key = crypto_1.default.randomBytes(32);
    // Create an initialization vector
    const iv = crypto_1.default.randomBytes(16);
    if (iv.length !== 16) {
        throw new Error('Invalid IV length');
    }
    console.log({ iv });
    // Create a Cipher instance using AES-256-CBC algorithm
    const cipher = crypto_1.default.createCipheriv('aes-256-cbc', secret_key, iv);
    // Encrypt the data
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    // Return the encrypted data with IV
    return {
        iv,
        data: encrypted.toString('hex'),
        secret_key,
    };
}
exports.encrypt = encrypt;
function decrypt(data, iv, secretKey) {
    if (iv.length !== 16) {
        throw new Error('Invalid IV length');
    }
    // Create a Decipher instance using the same algorithm and key
    let decipher = crypto_1.default.createDecipheriv('aes-256-cbc', secretKey, iv);
    // Decrypt the data
    let decrypted = decipher.update(Buffer.from(data, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    // Return the decrypted data as a string
    return decrypted.toString();
}
exports.decrypt = decrypt;
