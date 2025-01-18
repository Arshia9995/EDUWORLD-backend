import { UserEntity } from "../../../../../domain/entities/user/UserEntity";
import { Users } from "../../models/user/userSchema";


const findByEmail = async (email: string): Promise<UserEntity | null> => {

    try {
      const user = await Users.findOne({ email }).lean();
  
      return user as UserEntity;
    } catch (error) {
      throw error
    }
  
  }
  export {
    findByEmail
  }