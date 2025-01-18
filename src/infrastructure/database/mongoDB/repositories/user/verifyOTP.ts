import { OTPEntity } from "../../../../../domain/entities/common";
import { OTP } from "../../models/OTPSchema";


const verifyOTP = async (email:string, otp: string): Promise<OTPEntity | null> => {

    try {


        const currentTime = new Date();
        console.log("Current time:", currentTime);



      const validOtp = await OTP.findOne({ email, otp,createdAt: { 
        $gt: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes
    }, }).lean();

      if(!validOtp) return null;
      console.log("Valid OTP found:", validOtp);


      await OTP.deleteOne({email, otp})
      return validOtp;
    } catch (error) {
      throw error
    }
  
  }
  export {
    verifyOTP
  }