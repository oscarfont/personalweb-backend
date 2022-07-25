import crypto from 'node:crypto';
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
    #hmac;

    constructor(logger) {
        this.#logger = logger;
        this.#crytpoInstance = crypto;
        this.#key = this.#crytpoInstance.randomBytes(32); // TODO read from ENV vars
        this.#iv = this.#crytpoInstance.randomBytes(16);
        this.#algorithm = 'aes-256-cbc';
        this.#cipher = this.#crytpoInstance.createCipheriv(this.#algorithm, Buffer.from(this.#key), this.#iv);
        console.log(this.#cipher);
    }

    encrypt(text) {
        // encrypt the text
        let encrypted = this.#cipher.update(text);
        encrypted = Buffer.concat([encrypted, Buffer.from(this.#cipher.final('hex'))]);

        return { iv: this.#iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    }
}

export default CryptoAdapter;