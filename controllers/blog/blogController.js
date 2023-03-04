import FroalaAdapter from "../../adapters/imageManager/ImageManager.js";
import BlogPost from "../../models/blogpost.js";
import InvalidRequest from "../../models/errors/InvalidRequest.js";
import NotFound from "../../models/errors/NotFound.js";
import { LogLevel } from "../../adapters/logger/LogLevel.js";

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

export const getAllBlogCategories = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res, next) => {

    logger.log("/blog/categories/get/all", LogLevel.INFO, 'method: GET, params: [], request-body: {}');

    try {
        // get all blogs and categories
        const blogs = await dbAdapter.getAllOf('blog');

        // get all categories of blogs
        const categories = new Set();
        blogs.forEach((post) => {
            categories.add(post.category);
        });

        return res.json(formatter.formatSuccessfulResponse(Array.from(categories)));
    } catch (e) {
        next(e);
    }
};


export const getAllBlogsOfCategory = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res, next) => {

    try {
        // get category of blogs to be retrieved
        const category = req.query.category;
        if (!category) throw new InvalidRequest("Missing category request parameter");

        logger.log("/blog/get/all?category", LogLevel.INFO, `method: GET, params: [${category}], request-body: {}`);

        // get all blogs of category
        const blogs = await dbAdapter.findOf('blog', { category: category });

        // limit fields to be returned
        const blogSummaries = blogs.map((blog) => {
            const post = new BlogPost(blog.category, blog.title, blog.summary, undefined, blog.id);
            post.setCreatedAt(blog.createdAt);
            return post;
        }).sort((postA, postB) => postB.createdAt - postA.createdAt);

        return res.json(formatter.formatSuccessfulResponse(blogSummaries));
    } catch (e) {
        next(e);
    }
};

export const getBlogDetail = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res, next) => {
    try {
        // get category and id of the post to be retrieved
        const { id, category } = req.body;
        if (!id || !category) throw new InvalidRequest("Missing id and category fields in the request body");

        logger.log("/blog/get/detail", LogLevel.INFO, `method: POST, params: [], request-body: {${category} , ${id}}`);

        // get all blogs of category
        const blogs = await dbAdapter.findOf('blog', { category: category });

        // if no post has been found return error
        if (!blogs.length) throw new NotFound('Blog post with id: ' + id + ' not found');

        const { title, summary, content, createdAt, media } = blogs?.filter((blog) => blog.id === id)[0];

        // create model object of the post
        const blogPost = new BlogPost(category, title, summary, content);
        blogPost.setCreatedAt(createdAt);
        blogPost.setMedia(media);

        return res.json(formatter.formatSuccessfulResponse(blogPost));
    } catch (e) {
        next(e);
    }
};

export const publishBlogOfCategory = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res, next) => {
    try {
        //check JWT token
        const authHeader = req.headers.authorization;
        const jwtToken = authHeader?.slice(7, authHeader.length);

        if (!jwtToken || !jwtAdapter.verifyToken(jwtToken)) throw new InvalidRequest("Authorization header must be present and valid");

        // get category and blog post
        const { title, summary, content, media } = req.body;
        const category = req.query.category;

        if (!category || !title || !summary || !content || !media) throw new InvalidRequest("The request is missing some parameters");

        logger.log("/blog/publish?category", LogLevel.INFO, `method: POST, params: [${category}], request-body: {${title}, ${summary}, ${content}, ${media}}`);

        const blogPost = new BlogPost(category, title, summary, content);

        // add date to the post
        blogPost.setCreatedAt(new Date().getTime())
        blogPost.setMedia(media);

        // insert object into db
        await dbAdapter.insertInto('blog', blogPost);

        return res.json(formatter.formatSuccessfulResponse('Blog post published sucessfully!'));
    } catch (e) {
        next(e);
    }
};

export const removeBlog = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res, next) => {
    try {
        // check JWT token
        const authHeader = req.headers.authorization;
        const jwtToken = authHeader?.slice(7, authHeader.length);

        if (!jwtToken || !jwtAdapter.verifyToken(jwtToken)) throw new InvalidRequest("Authorization header must be present and valid");

        // get category and id of blog post
        const id = req.params.id;
        if (!id) throw new InvalidRequest("The request is missing the id parameter");

        logger.log("/blog/remove", LogLevel.INFO, `method: DELETE, params: [${id} ], request-body: {}`);

        // find blog to remove in db
        const blogs = await dbAdapter.getAllOf('blog');

        // if no post has been found return error
        if (!blogs.length) throw new NotFound('Blog post with id: ' + id + ' not found');

        const { category, title, summary, content, createdAt, media } = blogs.filter((blog) => blog.id === id)[0];

        // create model object of the post
        const blogPost = new BlogPost(category, title, summary, content);
        blogPost.setCreatedAt(createdAt);
        blogPost.setMedia(media);

        // remove media from server
        if (blogPost?.media && blogPost?.media.length > 0) {
            const froalaAdapter = new FroalaAdapter();
            for (let i = 0; i < blogPost.media.length; i++) {
                await froalaAdapter.deleteImage(blogPost.media[i]);
            }
        }

        // remove element from db
        await dbAdapter.removeElementByIdFrom('blog', id);

        return res.json(formatter.formatSuccessfulResponse('Blog post removed successfully!'));
    } catch (e) {
        next(e);
    }
};