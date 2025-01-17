import { Router } from "express";
import { IDependencies } from "../../../application/interfaces/user/IDependencies";
import { userController } from "../../../presentation/controllers/user";


const userRoutes = (dependencies : IDependencies) => {
    const router = Router();

    const { signup } = userController(dependencies)

    //.......................................authRoutes............................................................

    router.route('/signup').post(signup)
    return router


}

export {userRoutes}