import { MethodEnum } from "../../utils/MethodEnum.js";
import { getAllUsers } from "./userController.js";

/**
 * @author Óscar Font
 * ==========================
 * UserRouter Singleton Class
 * ==========================
 * @description 
 * Singleton Pattern applied to the user router details.
 * This class works as the router of the user endpoints.
 * A Singleton Pattern was applied given that only one 
 * instance is needed in the application.
 */
class UserRouter {
    prefix;
    routes;

    constructor() {
        this.prefix = '/user';
        this.routes = [
            {
                path: '/get/all',
                method: MethodEnum.GET,
                handler: getAllUsers
            }
        ]
    }
}

export const userRouter = new UserRouter();