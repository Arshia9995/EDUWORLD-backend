import { UserEntity } from "../../../../../domain/entities/user/UserEntity";
import { Users } from "../../models/user/userSchema";


const findByEmail = async (email: string): Promise<UserEntity | null> => {

    try {
      const existingUser = await Users.findOne({ email }).lean();
  
      return existingUser as UserEntity;
    } catch (error) {
      throw error
    }
  
  }
  export {
    findByEmail
  }