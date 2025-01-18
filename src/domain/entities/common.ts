
interface OTPEntity {
    name: string;
    email: string;
    otp: string;
    createdAt: Date;
    password: string;
    role: 'student' | 'instructor' | 'admin';
  }
  
  export {
    OTPEntity
  }