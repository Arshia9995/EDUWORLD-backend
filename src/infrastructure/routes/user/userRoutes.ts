import { Router } from "express";
import { IDependencies } from "../../../application/interfaces/user/IDependencies";
import { userController } from "../../../presentation/controllers/user";

// import { verifyotp } from "../../../presentation/controllers/user/verifyOTPController";


const userRoutes = (dependencies : IDependencies) => {
    const router = Router();

    const { signup,verifyotp,login,logout } = userController(dependencies)

    //.......................................authRoutes............................................................

    router.route('/signup').post(signup);
    router.route('/verify-otp').post(verifyotp)
    // router.post('/verify-otp',verifyOtpController(dependencies));
    router.route('/login').post(login);
    router.route('/logout').post(logout);
    return router


}

export {userRoutes}
