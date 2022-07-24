import { MethodEnum } from "../../adapters/server/MethodEnum.js";
import { getAllBlogs } from "./blogController.js";

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
                handler: getAllBlogs
            }
        ]
    }
}

export const blogRouter = new BlogRouter();