import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { blogRouter } from "../../controllers/blog/blogRouter.js";
import { userRouter } from '../../controllers/user/userRouter.js';
import { utilsRouter } from '../../controllers/utils/utilsRouter.js';
import { MethodEnum } from "./MethodEnum.js";
import { LogLevel } from '../logger/LogLevel.js';

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
    #jwt;
    #crypto;
    #errorHandler;
    apiPrefix;

    constructor(port, logger, dbAdapter, jwtAdapter, cryptoAdapter, errorHandler) {
        this.#server = express();
        this.#port = port;
        this.#logger = logger;
        this.#db = dbAdapter;
        this.#jwt = jwtAdapter;
        this.#crypto = cryptoAdapter;
        this.#errorHandler = errorHandler;
        this.apiPrefix = '/api';
    }

    start() {
        this.#server.listen(this.#port);
        this.#logger.log(ServerAdapter.name, LogLevel.DEBUG, `Server started successfully at port ${this.#port}`);
        this.#server.use(express.json({ limit: "10mb" }));
        this.#server.use(bodyParser.urlencoded({ extended: false }));
        this.#server.use('/public', express.static('public'));
        this.#server.use(helmet())
        this.#server.use(cors({
            origin: ['localhost', 'https://ofontg.dev', 'https://www.ofontg.dev']
        }));
        this.registeRouters();
        this.#server.use(this.#errorHandler);
    }

    registerRoute(router, route) {
        switch (route.method) {
            case MethodEnum.DELETE:
                router.delete(route.path, route.handler.bind(null, this.#logger, this.#db, this.#jwt, this.#crypto));
                break;
            case MethodEnum.PUT:
                router.put(route.path, route.handler.bind(null, this.#logger, this.#db, this.#jwt, this.#crypto));
                break;
            case MethodEnum.POST:
                router.post(route.path, route.handler.bind(null, this.#logger, this.#db, this.#jwt, this.#crypto));
                break;
            default: // GET
                router.get(route.path, route.handler.bind(null, this.#logger, this.#db, this.#jwt, this.#crypto));
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

        const utlsRouter = express.Router();
        utilsRouter.routes.forEach((route) => {
            this.registerRoute(utlsRouter, route);
        });


        this.#server.use(this.apiPrefix + blogRouter.prefix, bgRouter);
        this.#server.use(this.apiPrefix + userRouter.prefix, usrRouter);
        this.#server.use(this.apiPrefix + utilsRouter.prefix, utlsRouter)
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