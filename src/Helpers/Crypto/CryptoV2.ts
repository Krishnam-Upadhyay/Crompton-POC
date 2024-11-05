import {
  pbkdf2Sync,
  createCipheriv,
  createDecipheriv,
  Buffer,
} from 'browser-crypto';
import Config from 'react-native-config';
import { log } from '../CommonFunctions/FileLogger';

// var algoParams = {
//   ResponseEk: Config.CRYPTO_KEY || 'RTQV7tfsHk9eHug5rCcHxQyBhJ6xZjQG',
//   saltSize: parseInt(Config.CRYPTO_SALTSIZE) || 32,
//   ivSize: parseInt(Config.CRYPTO_IVSIZE) || 16,
//   keySize: parseInt(Config.CRYPTO_KEYSIZE) || 32,
//   iterations: parseInt(Config.CRYPTO_ITERATIONS) || 1000,
// };
var algoParams = {
  ResponseEk: Config.CRYPTO_KEY,
  saltSize: parseInt(Config.CRYPTO_SALTSIZE),
  ivSize: parseInt(Config.CRYPTO_IVSIZE),
  keySize: parseInt(Config.CRYPTO_KEYSIZE),
  iterations: parseInt(Config.CRYPTO_ITERATIONS),
};

/**
 * Generates a hashed value using PBKDF2 with a specified input and optional salt.
 *
 * @param {string} input - The input string to be hashed.
 * @param {string | undefined} salt - Optional salt value. If not provided, a default salt is used.
 * @returns {string} - The hashed value as a hexadecimal string.
 *
 * @throws {Error} - If there is an error during the hashing process.
 * @returns {string} - JSON-formatted string with an error message if hashing fails.
 */
const getHashV2 = function (input: string, salt: Buffer): Buffer | string {
  if (salt === void 0) {
    salt = undefined;
  }
  var hashed;
  try {
    const hashedBuffer = pbkdf2Sync(
      input,
      salt ? salt : algoParams.ResponseEk,
      algoParams.iterations,
      algoParams.keySize,
      'sha256',
    );
    hashed = salt ? hashedBuffer : hashedBuffer.toString('hex');
  } catch (err) {
    console.error('Error while hashing', err);
  }
  return hashed;
};

/**
 * Encrypts a given input using AES-256-CBC encryption.
 *
 * @param {string} input - The input string to be encrypted.
 * @returns {string} - The base64-encoded string containing the encrypted data.
 *
 * @throws {Error} - If there is an error during the encryption process.
 * @returns {string} - JSON-formatted string with an error message if encryption fails.
 */
export const encryptV2 = function (input: string): string {
  var combinedStr = '';
  try {
    //console.log("algoParams : " + JSON.stringify(algoParams, null, 2));
    // Generate random salt
    var salt = Buffer.from(
      crypto.getRandomValues(new Uint8Array(algoParams.saltSize)),
    ); //randomBytes(algoParams.saltSize);
    //console.log(`salt : ${arrayBufferToHexString(salt)}`);
    // Generate key using the getHash function
    var key = getHashV2(algoParams.ResponseEk, salt);
    //console.log(`key : ${arrayBufferToHexString(key)}`);
    // Generate random iv
    var iv = Buffer.from(
      crypto.getRandomValues(new Uint8Array(algoParams.ivSize)),
    ); //randomBytes(algoParams.ivSize);
    //console.log(`iv : ${arrayBufferToHexString(iv)}`);

    // Create AES cipher using crypto module
    var cipher = createCipheriv('aes-256-cbc', key, iv);
    // Encrypt data
    var encrypted = Buffer.concat([
      cipher.update(input, 'utf8'),
      cipher.final(),
    ]);

    // Combine bytes of salt + iv + encrypted
    combinedStr = Buffer.concat([salt, iv, encrypted]).toString('base64');
    //combinedStr = btoa(mergeCrypto(salt, iv, encrypted));
  } catch (err) {
    console.error('Error while encrypting', err);
    log.info('encryptV2 err: ', JSON.stringify(err))
  }
  return combinedStr;
};

/**
 * Decrypts a given input using AES-256-CBC encryption.
 *
 * @param {string} input - The base64-encoded input string to be decrypted.
 * @returns {string} - The decrypted UTF-8 string.
 *
 * @throws {Error} - If there is an error during the decryption process.
 * @returns {string} - JSON-formatted string with an error message if decryption fails.
 */
export const decryptV2 = function (input: string): string {
  var decryptedString = '';
  // console.log("Inside decryptV2", input);
  try {
    //console.log("input", input);
    // Convert base64 input to Buffer
    var inputBuffer = Buffer.from(input, 'base64');
    // Split salt, iv, and encrypted text from input Buffer
    var salt = inputBuffer.slice(0, algoParams.saltSize);
    var iv = inputBuffer.slice(
      algoParams.saltSize,
      algoParams.saltSize + algoParams.ivSize,
    );
    var encrypted = inputBuffer.slice(algoParams.saltSize + algoParams.ivSize);

    // Generate key using the getHash function
    var key = getHashV2(algoParams.ResponseEk, salt);
    // Create AES decipher using crypto module
    var decipher = createDecipheriv('aes-256-cbc', key, iv);
    // Decrypt data
    var decryptedBuffer = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    // Convert decrypted Buffer to UTF-8 string
    decryptedString = decryptedBuffer.toString('utf8');
    //console.log("decryptedString", decryptedString);
  } catch (err) {
    console.error('Error while decrypting', err, input);
    log.info('decryptV2 err: ', JSON.stringify(err))
    return JSON.stringify({
      status: 'error',
      message: err?.message,
      exception: err?.stack,
    });
  }
  return decryptedString;
};

/**
 * Converts an ArrayBuffer to a hexadecimal string representation.
 *
 * @param {ArrayBuffer} buffer - The ArrayBuffer to convert.
 * @returns {string} - The hexadecimal string representation of the ArrayBuffer.
 */
// function arrayBufferToHexString(buffer) {
//   return Array.from(new Uint8Array(buffer))
//     .map(b => b.toString(16).padStart(2, '0'))
//     .join('');
// }

// function mergeCrypto(salt, iv, encrypted) {
//   var mergedArray = new Uint8Array(salt.length + iv.length + encrypted.length);
//   mergedArray.set(salt, 0);
//   mergedArray.set(iv, salt.length);
//   mergedArray.set(encrypted, salt.length + iv.length);
//   return mergedArray;
// }
