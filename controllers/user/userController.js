import User from "../../models/user.js";
import { formatter } from "../../utils/formatter.js";
import InvalidRequest from "../../models/errors/InvalidRequest.js";
import AuthenticationError from "../../models/errors/AuthenticationError.js";
import { LogLevel } from "../../adapters/logger/LogLevel.js";

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
export const signUp = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res, next) => {
    try {
        //check JWT token
        const authHeader = req.headers.authorization;
        const jwtToken = authHeader?.slice(7, authHeader.length);

        if (!jwtToken || !jwtAdapter.verifyToken(jwtToken)) throw new InvalidRequest("Authorization header must be present and valid");

        // get request user data
        const { name, email, password } = req.body;
        if (!name || !email || !password) throw new InvalidRequest("Missing some of the fields in the request body");

        logger.log("/user/signUp", LogLevel.INFO, `method: POST, params: [], request-body: {${name}, ${email}, ${password}}`);

        // create user model and set encrypted pass
        const user = new User(email, 'admin');
        const encryptedPass = cryptoAdapter.encrypt(password);
        user.setPassword(encryptedPass);
        user.setName(name);

        // insert user model to db
        await dbAdapter.insertInto('user', user);

        // generate jwt token and return user data
        const jwt = jwtAdapter.generateToken(user.role);
        user.setJWT(jwt);

        return res.json(formatter.formatSuccessfulResponse({ name: user.name, email: user.email, role: user.role, jwt: user.getJWT() }));
    } catch (e) {
        next(e);
    }
};

export const signIn = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res, next) => {
    try {
        // get user credentials
        const { email, password } = req.body;

        logger.log("/user/signIn", LogLevel.INFO, `method: POST, params: [], request-body: {${email}, ${password}}`);

        // obtain users data
        const userData = dbAdapter.findOf('user', { email: email })[0];
        if (!userData) throw new AuthenticationError('There is no user registered for the current email. Please try again.');

        // if found create user model
        const user = new User(userData.email, userData.role);
        user.setPassword(userData.password);
        user.setName(userData.name);

        // check if user can be authenticated
        const isAuthorized = cryptoAdapter.checkEncryption(user.getPassword(), password);
        if (!isAuthorized) throw new AuthenticationError('Incorrect password. Please try again.');

        // if user is authenticated generate jwt token
        const jwt = jwtAdapter.generateToken(user.role);
        user.setJWT(jwt);

        return res.json(formatter.formatSuccessfulResponse({ name: user.name, email: user.email, role: user.role, jwt: user.getJWT() }));
    } catch (e) {
        next(e);
    }
};

export const signOut = (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res, next) => {

    logger.log("/user/signOut", LogLevel.INFO, `method: POST, params: [], request-body: {}`);

    try {
        // client will remove user token and call this endpoint
        return res.json(formatter.formatSuccessfulResponse('User signed out successfully'));
    } catch (e) {
        next(e);
    }
};