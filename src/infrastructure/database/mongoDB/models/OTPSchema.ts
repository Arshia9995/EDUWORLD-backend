import { model, Schema } from "mongoose";
import { OTPEntity } from "../../../../domain/entities/common";

const OTPSchema = new Schema<OTPEntity>({
    name: {
        type: String,
        required: true
    },
    email: {
      type: String,
      required: true
    },
    otp: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 2
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'instructor', 'admin']
    },
  
  });

  export const OTP = model<OTPEntity>('OTP', OTPSchema);