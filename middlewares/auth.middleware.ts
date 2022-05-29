import { NextFunction,Request, Response } from "express";
import { IUser } from "../models/user.model";
import { AuthRequest } from "../types";
import jwt, { VerifyCallback } from 'jsonwebtoken';
import config from 'config';

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
      userId: string
  }
}

module.exports = function (req: AuthRequest, res: Response, next: NextFunction) {
  try{
    //* Getting token from header
    const token = req.header('x-auth-token');
    console.log("token: ",token)
    if(!token) return res.status(401).json({ msg: 'No token, authorization denied' });    
    
    //* Verify Token
    jwt.verify(token,config.get('jwtSecret'), (error, decoded: any) => {
      if(error){
        return res.status(401).json({ msg: 'Token is not valid' });
      }else{
        console.log("decoded.user: ", decoded.user)
        req.user = decoded.user;
        next();
      }
    });
  }catch(err){
    res.status(401).json({msg: 'Token is not valid: '+err});
  }
}