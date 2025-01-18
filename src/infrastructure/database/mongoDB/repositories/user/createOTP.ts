import { log } from "console";
import { OTPEntity } from "../../../../../domain/entities/common";
import { OTP } from "../../models/OTPSchema";


const createOTP = async (name:string,email: string, otp: string, password: string, role: "student" | "instructor" | "admin"): Promise<void> => {
    try {
      const savedOtp =await OTP.create({ name,email, otp, password, role });
      console.log('created otp document in database: ',savedOtp)
     
  
      return
    } catch (error) {
      throw error
    }
  }
   
  export {
    createOTP
  }