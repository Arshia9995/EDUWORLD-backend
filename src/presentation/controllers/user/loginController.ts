import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/user/IDependencies";
import { CustomError } from "../../../utils/CustomError";
import { ILoginData } from "../../../domain/domainUsecases";

const login = (dependencies: IDependencies) => {
  const {
    useCases: { loginUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginData;
      // Validate request body
      if (!email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Email and password are required",
        });
      }

      const response = await loginUseCase(dependencies).execute(
        email,
        password,
      );

      if (response && response.data) {
        res.cookie("accessToken", response.data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000, 
        });
        res.cookie("refreshToken", response.data.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, 
        });
        const { accessToken, refreshToken, ...responseData } = response.data;


      return res.status(200).json({
        status: response?.status,
        message: response?.message,
        data: response?.data,
      });
    } else {

      return res.status(400).json({
        status: "error",
        message: "Invalid credentials",
      });
    }
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

export { login };
