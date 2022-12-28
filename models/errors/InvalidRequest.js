/**
 * @author Óscar Font
 * =====================
 * InvalidRequest class
 * =====================
 * @description 
 * 
 * This error class works to represent InvalidRequest errors.
 * Any kind of request that is missing parameters or that 
 * includes parameters that are not valid will send this error.
 * 
 */
class InvalidRequest extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidRequest';
    }
}

export default InvalidRequest;