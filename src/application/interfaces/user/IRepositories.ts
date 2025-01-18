import { ObjectId } from "mongoose";
import { UserEntity } from "../../../domain/entities/user/UserEntity";
import { OTPEntity } from "../../../domain/entities/common";

export interface IRepositories {
    signUp: (data:UserEntity) => Promise<UserEntity | null>;
    findByEmail: (data: string) => Promise<UserEntity | null>;
    createOTP: (name: string, email: string, otp: string, password: string, role: "student" | "instructor" | "admin") => Promise<void>;
    verifyOTP: (eamil:string,OTP: string) => Promise<OTPEntity | null>;
    
}

