/**
 * @author Óscar Font
 * =====================
 * blogController module
 * =====================
 * @description 
 * This file works as a controller.
 * It contains the main functions that handle the main requests
 * of the backend server endpoints regarding blog posts.
 */

export const getAllBlogs = async (logger, dbAdapter, req, res) => {
    try {
        const blogs = await dbAdapter.getAllOf('asds');
        return res.json({ 'data': blogs });
    } catch (e) {
        return res.status(500).send({ 'error': e.message });
    }
};