import jwt from 'jsonwebtoken';
/**
 * @author Óscar Font
 * ====================
 * JWTAdapter class
 * ====================
 * @description
 * Adapter Pattern applied to the jsonwebtoken details.
 * This class works as a wrapper of the jwt library.
 * Currently uses JWT, however if the library is wanted to be changed, 
 * the only file needed to modify is this adapter class and the code would still work.
 */
class JWTAdapter {
    #logger;
    #jwtInstance;
    algorithm;
    expiresIn;

    constructor(logger) {
        this.#logger = logger;
        this.#jwtInstance = jwt;
        this.algorithm = 'SHA256';
        this.expiresIn = 2 * 60 * 60;
    }

    generateToken(role) {
        try {
            // TODO obtain secret from ENV var
            return this.#jwtInstance.sign({}, 'mysecret', { expiresIn: this.expiresIn });
        } catch (err) {
            throw err;
        }
    }

    verifyToken(jwt) {
        try {
            // TODO obtain secret from ENV var
            const decoded = this.#jwtInstance.verify(jwt, 'mysecret');
            return decoded;
        } catch (err) {
            throw err
        }
    }
}

export default JWTAdapter;