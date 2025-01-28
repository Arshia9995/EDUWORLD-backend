
  import { LogoutResponse } from "..";

  interface ILogout {
    execute(): Promise<LogoutResponse>;
  }
  
  export { ILogout, LogoutResponse };
