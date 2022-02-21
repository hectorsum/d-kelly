import { Request, Response } from 'express';

export interface CustomRequest extends Request {
  user: string
}