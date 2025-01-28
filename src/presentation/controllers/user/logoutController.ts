import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/user/IDependencies";
import { CustomError } from "../../../utils/CustomError";
import { dependencies } from "../../../config/dependencies";

const logout = (dependencies: IDependencies) => {
    const { useCases: { logoutUseCase} } = dependencies;
    return async (req:Request, res:Response, next: NextFunction) => {
        try {
            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", 
                sameSite: "strict",
            });

            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
              });

              const response = await logoutUseCase(dependencies).execute();
             
              return res.status(200).json(response);

        } catch (error: any) {
            if (error instanceof CustomError) {
                return res.status(error.statusCode).json({
                  status: "error",
                  message: error.message,
                });
        }
        next(error);
    }

};
};

export { logout };
