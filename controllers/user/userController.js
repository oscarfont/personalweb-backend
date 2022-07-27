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

import User from "../../models/user.js";
import { formatter } from "../../utils/formatter.js";

export const signUp = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res) => {
    try {
        // get request user data
        const { email, password } = req.body;

        // create user model and set encrypted pass
        const user = new User(email, 'admin');
        const encryptedPass = cryptoAdapter.encrypt(password);
        user.setPassword(encryptedPass);

        // insert user model to db
        await dbAdapter.insertInto('user', user);

        // generate jwt token and return user data
        const jwt = jwtAdapter.generateToken(user.role);
        user.setJWT(jwt);

        return res.json(formatter.formatOKResponse(200, { email: user.email, role: user.role, jwt: user.getJWT() }));
    } catch (e) {
        return res.status(500).send(formatter.formatErrorResponse(500, e.message));
    }
};

export const signIn = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res) => {
    try {
        // get user credentials
        const { email, password } = req.body;

        // obtain users data
        const userData = dbAdapter.findOf('user', { email: email });
        if (!userData) throw new Error('There is no user registered for the current email. Please try again.');

        // if found create user model
        const user = new User(userData.email, userData.role);
        user.setPassword(userData.password);

        // check if user can be authenticated
        const isAuthorized = cryptoAdapter.checkEncryption(user.getPassword(), password);
        if (!isAuthorized) throw new Error('Incorrect password. Please try again.');

        // if user is authenticated generate jwt token
        const jwt = jwtAdapter.generateToken(user.role);
        user.setJWT(jwt);

        return res.json(formatter.formatOKResponse(200, { email: user.email, role: user.role, jwt: user.getJWT() }));
    } catch (e) {
        return res.status(500).send(formatter.formatErrorResponse(500, e.message));
    }
};

export const signOut = (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res) => {
    try {
        // client will remove user token and call this endpoint
        return res.json(formatter.formatOKResponse(200, 'User signed out successfully'));
    } catch (e) {
        return res.status(500).send(formatter.formatErrorResponse(500, e.message));
    }
};