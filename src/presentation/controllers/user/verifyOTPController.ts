import { Request,Response,NextFunction } from "express";
import { verifyOTPUseCase } from "../../../application/applicationUsecases/user";
import { IDependencies } from "../../../application/interfaces/user/IDependencies";
import { dependencies } from "../../../config/dependencies";

const verifyOtpController = (dependencies: IDependencies) => {
    return async (req: Request, res: Response,next: NextFunction) => {
        try {
            const {otp, email,password,role } = req.body;

            if(!otp || !email || !password || !role ){
                return res.status(400).json({
                    status: "error",
                    message: "OTP, email, password, and role are required",
                  });
            }

            const response = await verifyOTPUseCase(dependencies).execute({
                otp,
                email,
                password,
                role
                
            });
            return res.status(200).json({
                status: response.status,
                message: response.message,
                data: response.data,
              });
        } catch (error) {
            next(error);
            
        }
    };
};

export {verifyOtpController}