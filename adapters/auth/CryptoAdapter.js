import crypto from 'node:crypto';
import { cryptoKey } from '../../utils/config.js';
/**
 * @author Óscar Font
 * ====================
 * CryptoAdapter class
 * ====================
 * @description
 * Adapter Pattern applied to the cryptography details.
 * This class works as a wrapper of the crytpography library.
 * Currently uses node:crytpo, however if the library is wanted to be changed, 
 * the only file needed to modify is this adapter class and the code would still work.
 */
class CryptoAdapter {
    #logger;
    #crytpoInstance;
    #algorithm;
    #key;
    #iv;
    #cipher;

    constructor(logger) {
        this.#logger = logger;
        this.#crytpoInstance = crypto;
        this.#key = Buffer.from(cryptoKey, 'hex');
        this.#iv = this.#crytpoInstance.randomBytes(12);
        this.#algorithm = 'aes-256-gcm';
        this.#cipher = this.#crytpoInstance.createCipheriv(this.#algorithm, Buffer.from(this.#key, 'utf-8'), Buffer.from(this.#iv, 'utf-8'));
    }

    encrypt(text) {
        let encrypted = this.#cipher.update(text, 'utf-8', 'base64');
        encrypted += this.#cipher.final('base64');

        return { iv: this.#iv.toString('base64'), data: encrypted };
    }

    checkEncryption(encryption, text) {
        const cipher = this.#crytpoInstance.createCipheriv(this.#algorithm, Buffer.from(this.#key, 'utf-8'), Buffer.from(encryption.iv, 'base64'));
        let encrypted = cipher.update(text, 'utf-8', 'base64');
        encrypted += cipher.final('base64');
        return encryption.data === encrypted;
    }
}

export default CryptoAdapter;