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

import { formatter } from "../../utils/formatter.js";

export const getAllBlogCategories = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res) => {
    try {
        // get all blogs and categories
        const blogs = await dbAdapter.getAllOf('post');

        // get all categories of blogs
        const categories = Object.keys(blogs).filter((key) => key !== 'id');

        return res.json(formatter.formatOKResponse(200, categories));
    } catch (e) {
        return res.status(500).send(formatter.formatErrorResponse(500, e.message));
    }
};


export const getAllBlogsOfCategory = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res) => {
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

export const getBlogDetail = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res) => {
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

export const publishBlogOfCategory = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res) => {
    try {
        // TODO check JWT token

        // get category and blog post
        const post = req.body;
        const category = req.query.category;

        // check if category is created
        const postsOfCategory = await dbAdapter.getAllOf('post', category);

        let dataToInsert = {};
        if (!postsOfCategory) {
            post.id = dbAdapter.generateId();
            dataToInsert[category] = { posts: [post] }
        } else {
            dataToInsert = post;
        }

        // insert object into db
        await dbAdapter.insertInto('post', dataToInsert, postsOfCategory ? null : category);

        return res.json(formatter.formatOKResponse(200, 'Blog post published sucessfully!'));
    } catch (e) {
        return res.status(500).send(formatter.formatErrorResponse(500, e.message));
    }
};

export const removeBlogOfCategory = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res) => {
    try {
        // TODO check JWT token

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