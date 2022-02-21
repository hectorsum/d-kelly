import { NextFunction,Request, Response } from "express";
import { IUser } from "../models/user.model";
import { CustomRequest } from "../types";
import jwt from 'jsonwebtoken';
import config from 'config';

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
      userId: string
  }
}

export default function (req: CustomRequest, res: Response, next: NextFunction) {
  //* Getting token from header
  const token = req.header('x-auth-token');
  //* Check if not token
  if(!token){
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  //* Verify Token
  try{
    const {userId} = <jwt.UserIDJwtPayload>jwt.verify(token,config.get('jwtSecret'));
    req.user = userId;
    next();
  }catch(err){
    res.status(401).json({msg: 'Token is not valid'});
  }
}