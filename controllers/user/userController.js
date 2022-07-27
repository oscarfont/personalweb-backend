/**
 * @author Óscar Font
 * =====================
 * userController module
 * =====================
 * @description 
 * This file works as a controller.
 * It contains the main functions that handle the main requests
 * of the backend server endpoints regarding users of the application.
 */

export const signUp = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res) => {
    try {
        const { email, password } = req.body;
        const encryptedPass = cryptoAdapter.encrypt(password);
        await dbAdapter.insertInto('user', { email: email, pass: encryptedPass });
        const jwt = jwtAdapter.generateToken('admin');
        return res.json({ 'data': jwt });
    } catch (e) {
        return res.status(500).send({ 'error': e.message });
    }
};

export const signIn = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res) => {
    try {
        // get user credentials
        const { email, password } = req.body;

        // obtain users data
        const userData = dbAdapter.findOf('user', { email: email });
        if (!userData) throw new Error('There is no user registered for the current email. Please try again.');

        // check if user can be authenticated
        const isAuthorized = cryptoAdapter.checkEncryption(userData.pass, password);
        if (!isAuthorized) throw new Error('Incorrect password. Please try again.');

        // if user is authenticated generate jwt token
        const jwt = jwtAdapter.generateToken('admin');
        return res.json({ 'data': jwt });
    } catch (e) {
        return res.status(500).send({ 'error': e.message });
    }
};

export const signOut = (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res) => {
    try {
        // client will remove user token and call this endpoint
        return res.json({ 'data': 'sign-out success' });
    } catch (e) {
        return res.status(500).send({ 'error': e.message });
    }
};