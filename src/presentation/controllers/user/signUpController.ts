import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/user/IDependencies";
import { validateEmail,validateName } from "../../../utils/validator";
import { CustomError } from "../../../utils/CustomError";

import { UserEntity } from "../../../domain/entities/user/UserEntity";
import { dependencies } from "../../../config/dependencies";
const signup = (dependencies: IDependencies) => {

  const {useCases: { signupUseCase } } = dependencies
  return async(req: Request, res: Response, next: NextFunction) => {


    try {
      const { name, email, password,role } = req.body

      //validating name
      validateName(name);
      

      //validating email
       validateEmail(email);

       const newUser = {
        name,
        email,
        password,
        role: role || 'student', // Default role if not provided
        // profile: {
        //     dob: '',
        //     first_name: '',
        //     last_name: '',
        //     gender: 'other' as const,
        //     profile_picture: ''
        // },
        // created_at: new Date(),
        // updated_at: new Date(),
        // isBlocked: false
    };


       

      const response = await signupUseCase(dependencies).execute(newUser )

      return res.status(201).json({
        status: response?.status,
        message: response?.message,
        data:response?.data,
      });

    } catch (error) {
      next(error)
    }

  }
}

// const verifyOtp = (dependencies : IDependencies)=>{
//   return async(req: Request, res: Response, next: NextFunction)=>{
//     const {useCases : {}}
//   }
// }

export {
  signup
}