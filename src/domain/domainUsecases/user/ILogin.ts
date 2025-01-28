import { LoginResponse } from "..";
import { UserEntity } from "../../entities/user/UserEntity";

interface ILogin {
  execute(email: string, password: string): Promise<LoginResponse | null>;
}

export { ILogin, LoginResponse };
