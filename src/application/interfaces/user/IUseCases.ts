import { ISignUp } from "../../../domain/domainUsecases/user/ISignUp";
import { ILogout, IVerifyOtp } from "../../../domain/domainUsecases/user";
import { ILogin } from "../../../domain/domainUsecases/user/ILogin";
import { IDependencies } from "./IDependencies"; 

interface IUseCases {
    signupUseCase: (dependencies: IDependencies) => ISignUp;
    verifyOTPUseCase:(dependencies: IDependencies) => IVerifyOtp;
    loginUseCase:(dependencies: IDependencies) => ILogin;
    logoutUseCase:(dependencies: IDependencies) => ILogout;
}

export {
    IUseCases
}