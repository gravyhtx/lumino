import { useEffect, useState } from 'react';
import crypto from 'crypto';

/**
 * A React hook for encrypting and decrypting data using the AES-256-CBC algorithm.
 *
 * @param {string} [key] - The encryption key. If not provided, it will use the `CRYPTO_SECRET_KEY` environment variable.
 * @returns {{ encrypt: (data: string) => { iv: string; hash: string }; decrypt: (data: { hash: string; iv: string | Buffer }) => string }} An object containing the `encrypt` and `decrypt` functions.
 *
 * @example <caption>Using the hook in a React component</caption>
 * const MyComponent = () => {
 *   const { encrypt, decrypt } = useEncryption('secretKey');
 *   const [encryptedData, setEncryptedData] = useState(null);
 *   const [decryptedData, setDecryptedData] = useState(null);
 *
 *   const handleEncrypt = () => {
 *     const data = 'Hello, World!';
 *     const encrypted = encrypt(data);
 *     setEncryptedData(encrypted);
 *   };
 *
 *   const handleDecrypt = () => {
 *     if (encryptedData) {
 *       const decrypted = decrypt(encryptedData);
 *       setDecryptedData(decrypted);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleEncrypt}>Encrypt</button>
 *       <button onClick={handleDecrypt}>Decrypt</button>
 *       <p>Encrypted Data: {JSON.stringify(encryptedData)}</p>
 *       <p>Decrypted Data: {decryptedData}</p>
 *     </div>
 *   );
 * };
 */
const useEncryption = (key?: string) => {
  const [secretKey, setSecretKey] = useState<Buffer | null>(null);

  useEffect(() => {
    const envKey = process.env.CRYPTO_SECRET_KEY;
    const keyBuffer = key ? Buffer.from(key) : envKey ? Buffer.from(envKey) : null;
    setSecretKey(keyBuffer);
  }, [key]);

  const encrypt = (data: string) => {
    if (!secretKey) {
      throw new Error('Secret key not provided');
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    let hash = cipher.update(data, 'utf8', 'base64');
    hash += cipher.final('base64').replace(/=+$/, '');

    return { iv: iv.toString('hex'), hash };
  };

  const decrypt = (data: { hash: string; iv: string | Buffer }) => {
    if (!secretKey) {
      throw new Error('Secret key not provided');
    }

    const iv = Buffer.isBuffer(data.iv) ? data.iv : Buffer.from(data.iv, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
    let decrypted = decipher.update(data.hash, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  };

  return { encrypt, decrypt };
};

export default useEncryption;