import { ObjectId } from "mongoose";
import { UserEntity } from "../../../domain/entities/user/UserEntity";
import { OTPEntity } from "../../../domain/entities/common";

export interface IRepositories {
    signUp: (data:UserEntity) => Promise<UserEntity | null>;
    findByEmail: (data: string) => Promise<UserEntity | null>;
    createOTP: (email: string, OTP: string) => Promise<void>;
}

