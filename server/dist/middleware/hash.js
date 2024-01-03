"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const HASH_SECRET = process.env.HASH_SECRET || 'secret';
const HASH_ALGORITHM = process.env.HASH_ALGORITHM || 'aes-256-ccm';
const IV_SECRET = process.env.IV_SECRET || 'secret';
const key = crypto_1.default
    .createHash('sha512')
    .update(HASH_SECRET)
    .digest('hex')
    .substring(0, 32);
const encryptionIV = crypto_1.default
    .createHash('sha512')
    .update(IV_SECRET)
    .digest('hex')
    .substring(0, 16);
const encrypt = (text) => {
    try {
        if (!IV_SECRET || !HASH_SECRET || !HASH_ALGORITHM)
            throw new Error('Missing environment variables');
        const cipher = crypto_1.default.createCipheriv(HASH_ALGORITHM, key, encryptionIV);
        return Buffer.from(cipher.update(text, 'utf8', 'hex') + cipher.final('hex')).toString('base64');
    }
    catch (error) {
        console.error(error);
    }
};
exports.encrypt = encrypt;
const decrypt = (hash) => {
    const buff = Buffer.from(hash, 'base64');
    const decipher = crypto_1.default.createDecipheriv(HASH_ALGORITHM, key, encryptionIV);
    return (decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8'));
};
exports.decrypt = decrypt;
