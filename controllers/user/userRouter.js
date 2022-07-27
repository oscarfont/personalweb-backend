import { MethodEnum } from "../../adapters/server/MethodEnum.js";
import { signIn, signOut, signUp } from "./userController.js";

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
                path: '/signIn',
                method: MethodEnum.POST,
                handler: signIn
            },
            {
                path: '/signUp',
                method: MethodEnum.POST,
                handler: signUp
            },
            {
                path: '/signOut',
                method: MethodEnum.POST,
                handler: signOut
            }
        ]
    }
}

export const userRouter = new UserRouter();