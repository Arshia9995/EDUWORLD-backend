import { IResponse } from "../../../domain/domainUsecases";
import { ResponseStatus } from "../../../utils/enum";
import { UserEntity } from "../../../domain/entities/user/UserEntity";
import { hashPassword } from "../../../utils/bcrypt";
import { CustomError } from "../../../utils/CustomError";
import { generateOTP } from "../../../utils/OTPGenarator";
import { IDependencies } from "../../interfaces/user/IDependencies";
import { OTPTemplate, sendMail } from "../../../infrastructure/nodeMailer";



const signupUseCase = (dependencies: IDependencies) => {
    const { repositories: { findByEmail, createOTP } } = dependencies
    
    return {
        execute: async (data: UserEntity): Promise<IResponse> => {
          try {
            const existingUser = await findByEmail(data.email);
    
            if (existingUser) {
              throw new CustomError('Email already exists', 409, 'email');
            }
            // const hashedPassword = await hashPassword(data.password as string);
            const OTP = generateOTP();
    
            await createOTP(data.name,data.email, OTP,data.password,data.role  as "student" | "instructor" | "admin")
    
            await sendMail(data.email, 'OTP verification', OTPTemplate(OTP))
    
            // await signUp({ ...data, password: hashedPassword });
    
            return {
              status: ResponseStatus.SUCCESS,
              message: 'OTP sent  successfully',
              data: { email: data.email }
            }
    
    
          } catch (error) {
            throw error
          }
        }
      }
}
export {signupUseCase}

