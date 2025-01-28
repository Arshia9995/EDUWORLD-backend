import { Request,Response,NextFunction } from "express";
import { verifyOTPUseCase } from "../../../application/applicationUsecases/user";
import { IDependencies } from "../../../application/interfaces/user/IDependencies";
import { dependencies } from "../../../config/dependencies";
import { CustomError } from "../../../utils/CustomError";


const verifyotp = (dependencies: IDependencies) => {
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

            if (response && response.data) {
            res.cookie('accessToken', response.data.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000 
            });
            res.cookie('refreshToken', response.data.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 
            });
           
          
            const { accessToken, refreshToken, ...responseData } = response.data;
           
             
            return res.status(200).json({
                status: response.status,
                message: response.message,
                data: response.data,
              });
            } else {
                return res.status(400).json({
                    status: "error",
                    message: "Invalid OTP or user credentials"
                });
            }

        } catch (error: any) {
            if (error instanceof CustomError) {
                return res.status(error.statusCode || 500).json({
                status: "error",
                message: error.message,
            });
        }
            next(error);
            
        }
    };
};

export {verifyotp}