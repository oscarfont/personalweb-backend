/**
 * @author Óscar Font
 * =====================
 * AuthenticationError class
 * =====================
 * @description 
 * 
 * This error class works to represent Authentication errors.
 * Any kind of request that has wrong credentials or missing
 * user sign up or sign in errors.
 * 
 */
class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Authentication';
    }
}

export default AuthenticationError;