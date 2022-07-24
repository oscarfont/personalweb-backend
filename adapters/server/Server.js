import express from 'express';
import { blogRouter } from "../../controllers/blog/blogRouter.js";
import { userRouter } from '../../controllers/user/userRouter.js';
import { MethodEnum } from "./MethodEnum.js";

/**
 * @author Óscar Font
 * ====================
 * ServerAdapter class
 * ====================
 * @descrption
 * Adapter Pattern applied to the server details.
 * This class works as a wrapper of the server library.
 * Currently uses Express.js, however if the library is wanted to be changed, 
 * the only file needed to modify is this adapter class and the code would still work.
 */
class ServerAdapter {
    #server;
    #port;
    #logger;
    #db;

    constructor(port, logger, dbAdapter) {
        this.#server = express();
        this.#port = port;
        this.#logger = logger;
        this.#db = dbAdapter;
    }

    start() {
        this.#server.listen(this.#port);
        this.#server.use(express.json());
        this.registeRouters();
    }

    registerRoute(router, route) {
        switch (route.method) {
            case MethodEnum.DELETE:
                router.delete(route.path, route.handler.bind(null, this.#logger, this.#db));
                break;
            case MethodEnum.PUT:
                router.put(route.path, route.handler.bind(null, this.#logger, this.#db));
                break;
            case MethodEnum.POST:
                router.post(route.path, route.handler.bind(null, this.#logger, this.#db));
                break;
            default: // GET
                router.get(route.path, route.handler.bind(null, this.#logger, this.#db));
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