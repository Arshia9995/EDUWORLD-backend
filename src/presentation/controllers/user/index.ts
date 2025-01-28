import { IDependencies } from "../../../application/interfaces/user/IDependencies";
import { login } from "./loginController";
import { logout } from "./logoutController";
import { signup } from "./signUpController";
import { verifyotp } from "./verifyOTPController";


const userController = (dependencies: IDependencies) => {
    return {
        signup: signup(dependencies),
        verifyotp: verifyotp(dependencies),
        login: login(dependencies),
        logout:logout(dependencies)
    }
}

export {
    userController
  }
