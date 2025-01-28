import { dependencies } from "../../../config/dependencies";
import { IDependencies } from "../../interfaces/user/IDependencies";
import { LogoutResponse } from "../../../domain/domainUsecases";


export const logoutUseCase = (dependencies: IDependencies) => {
    return {
        execute: ():Promise<LogoutResponse> => {
            return Promise.resolve({
                status: "success",
                message: "Logged out successfully",
              });
        },
    };
};