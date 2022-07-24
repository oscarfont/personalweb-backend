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

export const getAllUsers = (logger, dbAdapter, req, res) => {
    return res.json({ 'data': [{ id: 1, username: 'admin', pass: '***' }, { id: 2, username: 'user', pass: '***1' }] });
};