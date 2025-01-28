import { IResponse } from "..";
import { OTPEntity } from "../../entities/common";

interface IVerifyOtp {
    execute(data: OTPEntity): Promise<IResponse | null>;
  }
  
  export {
    IVerifyOtp
  }