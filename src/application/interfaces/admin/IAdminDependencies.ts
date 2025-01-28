import { IAdminUseCase } from "./IAdminUseCase";
import { IAdminRepositories } from "./IAdminRepositories";

interface IAdminDependencies {
    adminRepositories: IAdminRepositories;
    adminUsecase: IAdminUseCase
}

export {
    IAdminDependencies
}