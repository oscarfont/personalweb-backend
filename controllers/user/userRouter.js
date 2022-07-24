import { MethodEnum } from "../../utils/MethodEnum.js";
import { getAllUsers } from "./userController.js";

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

// Singleton
export const userRouter = new UserRouter();