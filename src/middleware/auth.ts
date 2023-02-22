import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export function auth(pReq: Request, res: Response, next: NextFunction) {
  const req = pReq as Request;
  if (!req.user) {
    res.send("Unauthorized");
    return;
  }
  next();
}

export function isStaff(pReq: any, res: Response, next: NextFunction): void {
  const req = pReq as Request;
  const user = req.user as User;

  if (!user || user.role !== "staff") {
    res.send("Unauthorized");
    return;
  }
  next();
}
