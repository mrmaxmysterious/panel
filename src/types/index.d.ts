import { User } from "@prisma/client";

declare module "express" {
  export interface Request {
    user?: User;
  }
}

export type Response = {
  error: boolean;
  message: any;
  [key: string]: any;
};
