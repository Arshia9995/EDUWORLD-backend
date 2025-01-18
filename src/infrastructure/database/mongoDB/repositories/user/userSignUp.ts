import { Users } from "../../models/user/userSchema";
import { UserEntity } from "../../../../../domain/entities/user/UserEntity";

const signUp = async(data: UserEntity): Promise<UserEntity | null> => {
    try {
        const user = await Users.create(data)
        

        if (!user) {
            throw new Error("Failed to create or update user");
          }

        return user as UserEntity;
        
    } catch (error) {
        throw error;
    }
}

export { signUp }