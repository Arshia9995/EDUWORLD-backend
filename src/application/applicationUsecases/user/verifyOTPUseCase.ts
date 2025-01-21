import { IResponse } from "../../../domain/domainUsecases";
import { UserEntity } from "../../../domain/entities/user/UserEntity";
import { OTP } from "../../../infrastructure/database/mongoDB/models/OTPSchema";
import { Users } from "../../../infrastructure/database/mongoDB/models/user/userSchema";
import { hashPassword } from "../../../utils/bcrypt";
import { CustomError } from "../../../utils/CustomError";
import { ResponseStatus } from "../../../utils/enum";
import { IDependencies } from "../../interfaces/user/IDependencies";



const verifyOTPUseCase = (dependencies: IDependencies) => {
    const { repositories: { signUp, findByEmail, verifyOTP } } = dependencies
    
    return {
        execute: async (data: {email:string, otp: string, password:string, role:string}): Promise<IResponse> => {

          try {
            // const existingUser = await findByEmail(data.email)
            
            // if(!existingUser){
            //     throw new CustomError('Not valid email', 404, 'email');
            // }
            // const validOTP = await verifyOTP(data.email, data.otp)
            const validOTP =  await OTP.findOne({ email: data.email })
            .sort({ createdAt: -1 }) // Sort by 'createdAt' in descending order
            .lean();
            console.log(validOTP)
            console.log(data)

            if(!validOTP){
                throw new CustomError('Invalid or expired OTP', 400, 'otp');
            }
            const hashedPassword = await hashPassword(validOTP.password);
    
            console.log("OTP verified successfully for email:", data.email);

             // Create and verify the user
        // const newUser = await signUp({
        //     name: existingUser.name,
        //     email: existingUser.email,
        //     // password: hashedPassword,
        //     // role: data.role as  "student" | "instructor" | "admin",
        //     verified: true, // Mark user as verified
        //   });
            // await signUp({ ...data, password: hashedPassword });

            const newUser: UserEntity = {
                name: validOTP.name,
                email: validOTP.email,
                password: validOTP.password,
                role: validOTP.role as "student" | "instructor" | "admin",
                verified: true, // Mark as verified
              };

              const createdUser = await Users.create(newUser);
    
            if (!newUser) {
                throw new CustomError("Failed to create user", 500, "signup");
              }
              await OTP.deleteOne({ email: data.email, otp: data.otp });

            // await OTP.deleteOne({ email: data.email, otp: data.otp });
            return {
              status: ResponseStatus.SUCCESS,
              message: 'user verified and  registered successfully',
            //   redirectURL: '/otp-verification',
              data: { email: createdUser.email, role:createdUser.role }
            }
    
    
          } catch (error) {
            throw error
          }
        }
      }
}
export { verifyOTPUseCase}