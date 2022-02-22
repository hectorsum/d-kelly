import { Request, Response } from 'express';

interface IUser{
  id: string
}
export interface AuthRequest extends Request {
  user: IUser
}