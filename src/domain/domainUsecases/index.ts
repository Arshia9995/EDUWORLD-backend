import { Role } from "../../utils/enum";
 
 interface IResponse {
    status:string;
    message: string;
    redirectURL?: string;
    data?: {
        [key: string]: string | number | boolean | object | any[];
      }
    };

    interface ILoginData  {
      email: string,
      password: string
    }

    interface LoginResponse extends IResponse {
      data?: {
        email: string;
        role: string;
        accessToken?: string;
        refreshToken?: string;
    }
    }
    interface LogoutResponse {
      status: "success" | "error";
      message: string;
    }

    export {
      IResponse,
      ILoginData,
      LoginResponse,
      LogoutResponse,
      

    }