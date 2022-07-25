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

import { LogLevel } from "../../adapters/logger/LogLevel.js";

export const getAllUsers = (logger, dbAdapter, req, res) => {
    return res.json({ 'data': [{ id: 1, username: 'admin', pass: '***' }, { id: 2, username: 'user', pass: '***1' }] });
};

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

export const signIn = (logger, dbAdapter, req, res) => {
    try {
        const { email, password } = req.body;
        const user = dbAdapter.findOf('user', { email: email });
        const encryptedPass = cryptoAdapter.encrypt(password);
        const jwt = jwtAdapter.generateToken('admin');
        return res.json({ 'data': jwt });
    } catch (e) {
        return res.status(500).send({ 'error': e.message });
    }
};

export const signOut = (logger, dbAdapter, req, res) => {
    return res.json({ 'data': [{ id: 1, username: 'admin', pass: '***' }, { id: 2, username: 'user', pass: '***1' }] });
};