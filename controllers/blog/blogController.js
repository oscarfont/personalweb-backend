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

export const getAllBlogsOfCategory = async (logger, dbAdapter, req, res) => {
    try {
        // get category of blogs to be retrieved
        const category = req.query.category;

        // get all blogs of category
        const blogs = await dbAdapter.getAllOf('post', category);

        return res.json(formatter.formatOKResponse(200, blogs));
    } catch (e) {
        return res.status(500).send(formatter.formatErrorResponse(500, e.message));
    }
};

export const getBlogDetail = async (logger, dbAdapter, req, res) => {
    try {
        // get category and id of the post to be retrieved
        const category = req.query.category;
        const id = req.query.id;

        // get all blogs of category
        const blogs = await dbAdapter.getAllOf('post', category);
        const post = blogs.find(blog => blog.id == id);

        // if no post has been found return error
        if (!post) throw new Error('Blog post with id: ' + id + ' not found');

        return res.json(formatter.formatOKResponse(200, blogs));
    } catch (e) {
        return res.status(500).send(formatter.formatErrorResponse(500, e.message));
    }
};

export const publishBlogOfCategory = async (logger, dbAdapter, req, res) => {
    try {
        // get category and blog post
        const post = req.body;
        const category = req.query.category;

        // insert object into db
        await dbAdapter.insertInto('post', post, category);

        return res.json(formatter.formatOKResponse(200, 'Blog post published sucessfully!'));
    } catch (e) {
        return res.status(500).send(formatter.formatErrorResponse(500, e.message));
    }
};

export const removeBlogOfCategory = async (logger, dbAdapter, req, res) => {
    try {
        // get category and id of blog post
        const category = req.query.category;
        const id = req.query.id;

        // remove element from db
        await dbAdapter.removeElementByIdFrom('post', id, category);

        return res.json(formatter.formatOKResponse(200, 'Blog post removed successfully!'));
    } catch (e) {
        return res.status(500).send(formatter.formatErrorResponse(500, e.message));
    }
};