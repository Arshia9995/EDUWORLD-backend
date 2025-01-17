import { Role } from "../../utils/enum";
 
export interface IResponse {
    status:string;
    message: string;
    redirectURL?: string;
    data?: {
        [key: string]: string | number | boolean | object | any[];
      }
    };
