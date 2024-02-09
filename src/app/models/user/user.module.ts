import {Role} from "./role.module";

export interface User {
  id: number,
  email: string,
  role: Role
}
