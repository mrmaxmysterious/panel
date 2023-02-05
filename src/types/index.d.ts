import { User } from "@prisma/client";

declare module "express" {
  export interface Request {
    user?: User;
  }
export interface Request {
  user?: User;
}
export interface Response {
  [key: String]: Any
}
}

export type APIRequest = {
message: String,
data: Any[],
[key: String]: Any
}
