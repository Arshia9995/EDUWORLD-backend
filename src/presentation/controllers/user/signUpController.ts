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

       
      validateName(name);
      validateEmail(email);

       const newUser = {
        name,
        email,
        password,
        role: role || 'student', 
    };


       

      const response = await signupUseCase(dependencies).execute(newUser )

      return res.status(201).json({
        status: response?.status,
        message: response?.message,
        data:response?.data,
      });

    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
          status: 'error',
          message: error.message,
          field: error.field,
        });
      }  
     next(error)
    }
  }
}



export {
  signup
}