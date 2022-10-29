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
        const blogs = await dbAdapter.getAllOf('blogs');

        // get all categories of blogs
        const categories = new Set();
        blogs.forEach((post) => {
            categories.add(post.category);
        });

        return res.json(formatter.formatOKResponse(200, Array.from(categories)));
    } catch (e) {
        return res.status(500).send(formatter.formatErrorResponse(500, e.message));
    }
};


export const getAllBlogsOfCategory = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res) => {
    try {
        // get category of blogs to be retrieved
        const category = req.query.category;

        // get all blogs of category
        const blogs = await dbAdapter.findOf('blogs', { category: category });

        // limit fields to be returned
        const blogSummaries = blogs.map((blog) => { return { id: blog.id, title: blog.title, summary: blog.summary, category: blog.category } });

        return res.json(formatter.formatOKResponse(200, blogSummaries));
    } catch (e) {
        return res.status(500).send(formatter.formatErrorResponse(500, e.message));
    }
};

export const getBlogDetail = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res) => {
    try {
        // get category and id of the post to be retrieved
        const { id, category } = req.body;

        // get all blogs of category
        const blogs = await dbAdapter.findOf('blogs', { category: category });
        const post = blogs.filter((blog) => blog.id === id)[0];

        // if no post has been found return error
        if (!post) throw new Error('Blog post with id: ' + id + ' not found');

        return res.json(formatter.formatOKResponse(200, post));
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

        // add category to post
        post.category = category;

        // insert object into db
        await dbAdapter.insertInto('blogs', post);

        return res.json(formatter.formatOKResponse(200, 'Blog post published sucessfully!'));
    } catch (e) {
        return res.status(500).send(formatter.formatErrorResponse(500, e.message));
    }
};

export const removeBlog = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res) => {
    try {
        // TODO check JWT token

        // get category and id of blog post
        const id = req.params.id;

        // remove element from db
        await dbAdapter.removeElementByIdFrom('blogs', id);

        return res.json(formatter.formatOKResponse(200, 'Blog post removed successfully!'));
    } catch (e) {
        return res.status(500).send(formatter.formatErrorResponse(500, e.message));
    }
};