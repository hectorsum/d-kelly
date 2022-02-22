import { NextFunction,Request, Response } from "express";
import { IUser } from "../models/user.model";
import { AuthRequest } from "../types";
import jwt from 'jsonwebtoken';
import config from 'config';

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
      userId: string
  }
}

export default function (req: AuthRequest, res: Response, next: NextFunction) {
  try{
    //* Getting token from header
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json({ msg: 'No token, authorization denied' });    
    
    //* Verify Token
    const {userId} = <jwt.UserIDJwtPayload>jwt.verify(token,config.get('jwtSecret'));
    req.user.id = userId;
    next();
  }catch(err){
    res.status(401).json({msg: 'Token is not valid'});
  }
}