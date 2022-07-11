import crypto from 'crypto';

class Crypto {
  private readonly _algorithm: string;
  private readonly _secret: string;
  private readonly _iv: string; // = crypto.randomBytes(16);

  constructor(algorithm: string, secret: string, iv: string) {
    this._algorithm = algorithm;
    this._secret = secret;
    this._iv = iv;
  }

  public encrypt(text: string) {
    const ivBuffer = Buffer.from(this._iv, 'hex');
    const cipher = crypto.createCipheriv(this._algorithm, this._secret, ivBuffer);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString('hex');
  }

  public decrypt(hash: string) {
    const decipher = crypto.createDecipheriv(this._algorithm, this._secret, Buffer.from(this._iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);
    return decrypted.toString();
  }

  public static generateKeyPairSync() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
    });

    const publicKeyString = publicKey.export({ type: 'pkcs1', format: 'pem' });
    const privateKeyString = privateKey.export({ type: 'pkcs1', format: 'pem' });

    return {
      publicKeyString,
      privateKeyString,
    };
  }

  public static publicEncrypt(publicKey: string, data: string) {
    const key = crypto.createPublicKey(publicKey);
    const encryptedData = crypto.publicEncrypt(
      {
        key,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      Buffer.from(data)
    );
    return encryptedData.toString('base64');
  }

  public static privateDecrypt(privateKey: string, encryptedData: string) {
    const key = crypto.createPrivateKey(privateKey);
    const decryptedData = crypto.privateDecrypt(
      {
        key,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      Buffer.from(encryptedData, 'base64')
    );
    return decryptedData.toString();
  }
}

export default Crypto;
