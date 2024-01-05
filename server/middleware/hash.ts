import crypto, { CipherKey, BinaryLike, CipherCCM } from 'crypto';
/*
// Environment variables for secrets and algorithm
const HASH_SECRET = process.env.HASH_SECRET || 'secret';
const HASH_ALGORITHM = process.env.HASH_ALGORITHM || 'aes-256-gcm';
const IV_SECRET = process.env.IV_SECRET || 'secret';

// Create a key for AES-256-CCM
const key: CipherKey = crypto
  .createHash('sha512')
  .update(HASH_SECRET)
  .digest('hex')
  .substring(0, 32);

// Create an initialization vector (IV)
const encryptionIV: BinaryLike = crypto
  .createHash('sha512')
  .update(IV_SECRET)
  .digest('hex')
  .substring(0, 12);

// Encryption function
const encrypt = (text: string): { encryptedData: string; authTag: Buffer } => {
  if (!HASH_SECRET || !IV_SECRET || !HASH_ALGORITHM) {
    throw new Error('Missing environment variables');
  }

  const cipher = crypto.createCipheriv(
    HASH_ALGORITHM,
    key,
    encryptionIV
  ) as CipherCCM;

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return {
    encryptedData: Buffer.from(encrypted, 'hex').toString('base64'),
    authTag: cipher.getAuthTag(),
  };
};

// Decryption function
const decrypt = (encryptedData: string, authTag: Buffer): string => {
  if (!HASH_SECRET || !IV_SECRET || !HASH_ALGORITHM) {
    throw new Error('Missing environment variables');
  }

  console.log({ encryptedData, authTag });

  const decipher = crypto.createDecipheriv(
    HASH_ALGORITHM,
    key,
    encryptionIV
  ) as CipherCCM;

  //decipher.setAAD(authTag, { plaintextLength: encryptedData.length });
  decipher.getAuthTag();

  const buff = Buffer.from(encryptedData, 'base64');
  let decrypted = decipher.update(buff.toString('hex'), 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

export { encrypt, decrypt };
 */

const SECRET_KEY: string = 'secret';

interface EncryptedData {
  iv: Buffer;
  data: string;
  secret_key: Buffer;
}

function encrypt(data: string): EncryptedData {
  const secret_key = crypto.randomBytes(32);

  // Create an initialization vector
  const iv = crypto.randomBytes(16);

  if (iv.length !== 16) {
    throw new Error('Invalid IV length');
  }
  console.log({ iv });

  // Create a Cipher instance using AES-256-CBC algorithm
  const cipher = crypto.createCipheriv('aes-256-cbc', secret_key, iv);

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

function decrypt(data: string, iv: Buffer, secretKey: Buffer): string {
  if (iv.length !== 16) {
    throw new Error('Invalid IV length');
  }

  // Create a Decipher instance using the same algorithm and key
  let decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);

  // Decrypt the data
  let decrypted = decipher.update(Buffer.from(data, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // Return the decrypted data as a string
  return decrypted.toString();
}

export { encrypt, decrypt };
