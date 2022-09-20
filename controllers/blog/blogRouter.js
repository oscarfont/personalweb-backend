import { MethodEnum } from "../../adapters/server/MethodEnum.js";
import { getAllBlogCategories, getAllBlogsOfCategory, getBlogDetail, publishBlogOfCategory, removeBlog } from "./blogController.js";

/**
 * @author Óscar Font
 * ==========================
 * BlogRouter Singleton Class
 * ==========================
 * @description 
 * Singleton Pattern applied to the blog router details.
 * This class works as the router of the blog endpoints.
 * A Singleton Pattern was applied given that only one 
 * instance is needed in the application.
 */
class BlogRouter {
    prefix;
    routes;

    constructor() {
        this.prefix = '/blog';
        this.routes = [
            {
                path: '/get/all',
                method: MethodEnum.GET,
                handler: getAllBlogsOfCategory
            },
            {
                path: '/categories/get/all',
                method: MethodEnum.GET,
                handler: getAllBlogCategories
            },
            {
                path: '/get/detail',
                method: MethodEnum.POST,
                handler: getBlogDetail
            },
            {
                path: '/publish',
                method: MethodEnum.POST,
                handler: publishBlogOfCategory
            },
            {
                path: '/remove/:id',
                method: MethodEnum.DELETE,
                handler: removeBlog
            }
        ]
    }
}

export const blogRouter = new BlogRouter();