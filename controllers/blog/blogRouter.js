import { MethodEnum } from "../../utils/MethodEnum.js";
import { getAllBlogs } from "./blogController.js";

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

// Singleton
export const blogRouter = new BlogRouter();