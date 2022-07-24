export const getAllUsers = (logger, req, res) => {
    return res.json({ 'data': [{ id: 1, username: 'admin', pass: '***' }, { id: 2, username: 'user', pass: '***1' }] });
};