import { ISignUp } from "../../../domain/domainUsecases/user/ISignUp";
import { IDependencies } from "./IDependencies"; 

interface IUseCases {
    signupUseCase: (dependencies: IDependencies) => ISignUp;
}

export {
    IUseCases
}