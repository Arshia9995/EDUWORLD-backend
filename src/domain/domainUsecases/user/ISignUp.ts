import { IResponse } from "..";
import { UserEntity } from "../../entities/user/UserEntity";

interface ISignUp {
    execute(data: UserEntity): Promise<IResponse | null>;
  }
  
  export {
    ISignUp
  }