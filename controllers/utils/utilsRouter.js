import { MethodEnum } from "../../adapters/server/MethodEnum.js";
import { sendMail } from "./utilsController.js";

/**
 * @author Óscar Font
 * ==========================
 * UtilsRouter Singleton Class
 * ==========================
 * @description 
 * Singleton Pattern applied to the utils router details.
 * This class works as the router of the utils endpoints.
 * A Singleton Pattern was applied given that only one 
 * instance is needed in the application.
 */
class UtilsRouter {
    prefix;
    routes;

    constructor() {
        this.prefix = '/utils';
        this.routes = [
            {
                path: '/sendMail',
                method: MethodEnum.POST,
                handler: sendMail
            }
        ]
    }
}

export const utilsRouter = new UtilsRouter();