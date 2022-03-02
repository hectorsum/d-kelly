import { NextFunction, Request, Response } from 'express'
import { IUser, User } from '../models/user.model'
import { AuthRequest } from '../types'
import bcrypt from 'bcrypt'
import { generateJWT } from '../middlewares/jwt.middleware';

export class AuthController {
  constructor() {}
  async getOne(req: any, res: Response) {
    try {
      const user = await User.findById(req.user.id).select("-password") as IUser;
      res.status(200).json({
        data: user
      });
    } catch (error) {
      res.status(500).send("Server Error: "+error)
    }
  }
  async login (req: Request, res: Response){
    try {
      const {email, password} = req.body;
      const user = await User.findOne({email}).exec() as IUser;
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credencials" }] });
      }
      const {_id, password: usrPass} = user;
      console.log({
        "user":user,
        "req.body":req.body
      })
      const isMatch = await bcrypt.compare(password, usrPass);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credencials" }] });
      }
      const token = await generateJWT(_id);
      return res.json({
        ok: true,
        msg: "User logged",
        data: token,
      });
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }
}