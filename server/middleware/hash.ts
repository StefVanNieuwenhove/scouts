import crypto from 'crypto';

const HASH_SECRET = process.env.HASH_SECRET || 'secret';
const HASH_ALGORITHM = process.env.HASH_ALGORITHM || 'aes-256-ccm';
const IV_SECRET = process.env.IV_SECRET || 'secret';

const key = crypto
  .createHash('sha512')
  .update(HASH_SECRET)
  .digest('hex')
  .substring(0, 32);

const encryptionIV = crypto
  .createHash('sha512')
  .update(IV_SECRET)
  .digest('hex')
  .substring(0, 16);

const encrypt = (text: string) => {
  try {
    if (!IV_SECRET || !HASH_SECRET || !HASH_ALGORITHM)
      throw new Error('Missing environment variables');
    const cipher = crypto.createCipheriv(HASH_ALGORITHM, key, encryptionIV);
    return Buffer.from(
      cipher.update(text, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64');
  } catch (error) {
    console.error(error);
  }
};

const decrypt = (hash: string) => {
  const buff = Buffer.from(hash, 'base64');
  const decipher = crypto.createDecipheriv(HASH_ALGORITHM, key, encryptionIV);
  return (
    decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
    decipher.final('utf8')
  );
};

export { encrypt, decrypt };
