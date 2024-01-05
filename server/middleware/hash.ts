import crypto, { CipherKey, BinaryLike, CipherCCM } from 'crypto';

type EncryptedData = {
  iv: Buffer;
  data: string;
  secret_key: Buffer;
};

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
