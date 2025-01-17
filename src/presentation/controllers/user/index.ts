import { IDependencies } from "../../../application/interfaces/user/IDependencies";
import { signup } from "./signUpController";


const userController = (dependencies: IDependencies) => {
    return {
        signup: signup(dependencies),
    }
}

export {
    userController
  }
