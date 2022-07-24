import express from 'express';
import { blogRouter } from "../controllers/blog/blogRouter.js";
import { userRouter } from '../controllers/user/userRouter.js';
import { MethodEnum } from "../utils/MethodEnum.js";

class ServerAdapter {
    #server;
    #port;
    #logger;

    constructor(port, logger) {
        this.#server = express();
        this.#port = port;
        this.#logger = logger;
    }

    start() {
        this.#server.listen(this.#port);
        this.#server.use(express.json());
        this.registeRouters();
    }

    registerRoute(router, route) {
        switch (route.method) {
            case MethodEnum.DELETE:
                router.delete(route.path, route.handler.bind(null, this.#logger));
                break;
            case MethodEnum.PUT:
                router.put(route.path, route.handler.bind(null, this.#logger));
                break;
            case MethodEnum.POST:
                router.post(route.path, route.handler.bind(null, this.#logger));
                break;
            default: // GET
                router.get(route.path, route.handler.bind(null, this.#logger));
                break;
        }
    }

    registeRouters() {
        // create user and blog routes
        const bgRouter = express.Router();
        blogRouter.routes.forEach((route) => {
            this.registerRoute(bgRouter, route);
        });

        const usrRouter = express.Router();
        userRouter.routes.forEach((route) => {
            this.registerRoute(usrRouter, route);
        });


        this.#server.use(blogRouter.prefix, bgRouter);
        this.#server.use(userRouter.prefix, usrRouter);
    }

    // getters
    get server() {
        return this.#server;
    }
    get port() {
        return this.#port;
    }

    // setters
    set server(server) {
        this.#server = server;
    }
    set port(port) {
        this.#port = port;
    }
}

export default ServerAdapter;