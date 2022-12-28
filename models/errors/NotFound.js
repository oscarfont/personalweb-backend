/**
 * @author Óscar Font
 * =====================
 * NotFound class
 * =====================
 * @description 
 * 
 * This error class works to represent 
 * a not found event of any error
 * or class.
 * 
 */
class NotFound extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFound';
    }
}

export default NotFound;