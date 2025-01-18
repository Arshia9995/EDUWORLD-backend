import { Router } from "express";
import { IDependencies } from "../../../application/interfaces/user/IDependencies";
import { userController } from "../../../presentation/controllers/user";
import { verifyOtpController } from "../../../presentation/controllers/user/verifyOTPController";


const userRoutes = (dependencies : IDependencies) => {
    const router = Router();

    const { signup } = userController(dependencies)

    //.......................................authRoutes............................................................

    router.route('/signup').post(signup)
    router.post('/verify-otp',verifyOtpController(dependencies));
    return router


}

export {userRoutes}
