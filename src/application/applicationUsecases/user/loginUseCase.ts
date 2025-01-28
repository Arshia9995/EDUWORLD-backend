import { ILoginData, LoginResponse } from "../../../domain/domainUsecases";
import { Users } from "../../../infrastructure/database/mongoDB/models/user/userSchema";
import { CustomError } from "../../../utils/CustomError";
import { comparePassword } from "../../../utils/bcrypt";
import { ResponseStatus } from "../../../utils/enum";
import { IDependencies } from "../../interfaces/user/IDependencies";
import { generateTokens } from "../../../utils/jwt";

export const loginUseCase = (dependencies: IDependencies) => {
    return {
        execute: async (email: string, password: string): Promise<LoginResponse | null> => {
            try {
                const user = await Users.findOne({ email: email });

                if(!user){
                    throw new CustomError("Invalid credentials", 401, "login");

                }

                const isPasswordValid = await comparePassword(password, user.password);
                if(!isPasswordValid){
                    throw new CustomError("Invalid credentials", 401, "login");
                }

                // Check if user is blocked
                if (user.isBlocked) {
                    throw new CustomError("User is blocked. Please contact support.", 403, "login");
                }
                const { accessToken, refreshToken } = generateTokens(user)
                

                return {
                    status: ResponseStatus.SUCCESS,
                    message: "Login successful",
                    data: {
                    email: user.email,
                    role: user.role,
                    accessToken,
                    refreshToken,

                   },
                };
            } catch (error) {
                throw error;
            }
        }
    }
}



