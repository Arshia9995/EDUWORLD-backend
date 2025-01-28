import { IResponse } from "../../../domain/domainUsecases";
import { UserEntity } from "../../../domain/entities/user/UserEntity";
import { OTP } from "../../../infrastructure/database/mongoDB/models/OTPSchema";
import { Users } from "../../../infrastructure/database/mongoDB/models/user/userSchema";
import { hashPassword } from "../../../utils/bcrypt";
import { CustomError } from "../../../utils/CustomError";
import { ResponseStatus } from "../../../utils/enum";
import { IDependencies } from "../../interfaces/user/IDependencies";
import { generateTokens } from "../../../utils/jwt";



const verifyOTPUseCase = (dependencies: IDependencies) => {
    const { repositories: { signUp, findByEmail, verifyOTP } } = dependencies
    
    return {
        execute: async (data: {email:string, otp: string, password:string, role:string}): Promise<IResponse> => {

          try {
           
            const validOTP =  await OTP.findOne({ email: data.email, otp: data.otp })
            .sort({ createdAt: -1 }) 
            .lean();
            console.log(validOTP)
            console.log(data)

            if(!validOTP){
                throw new CustomError('Invalid or expired OTP', 400, 'otp');
                
            }
            const hashedPassword = await hashPassword(validOTP.password);
    
            console.log("OTP verified successfully for email:", data.email);

            const newUser: UserEntity = {
                name: validOTP.name,
                email: validOTP.email,
                password: hashedPassword,
                role: validOTP.role as "student" | "instructor" | "admin",
                verified: true, 
              };

              const createdUser = await Users.create(newUser);
    
            if (!createdUser) {
                throw new CustomError("Failed to create user", 500, "signup");
              }


               
            // Generate both tokens
            const { accessToken, refreshToken } = generateTokens(createdUser);
              await OTP.deleteOne({ email: data.email, otp: data.otp });


           
            return {
              status: ResponseStatus.SUCCESS,
              message: 'user verified and  registered successfully',
              data: { email: createdUser.email,
                 role:createdUser.role,
                 accessToken,
                refreshToken
                 }
            }
    
    
          } catch (error) {
            throw error
          }
        }
      }
}
export { verifyOTPUseCase}