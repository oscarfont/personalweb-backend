import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../utils/config';
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
            return this.#jwtInstance.sign({
                role: role
            }, jwtSecret, { expiresIn: this.expiresIn });
        } catch (err) {
            throw err;
        }
    }

    verifyToken(jwt) {
        try {
            const decoded = this.#jwtInstance.verify(jwt, jwtSecret);
            return decoded;
        } catch (err) {
            throw err
        }
    }
}

export default JWTAdapter;