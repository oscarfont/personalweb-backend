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

export const getAllBlogs = (logger, req, res) => {
    return res.json({ 'data': [{ id: 1, title: 'how to consume rest api' }, { id: 2, title: 'explain postgresql query' }] });
};