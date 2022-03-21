import { Request, Response } from 'express'
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
export class UserController {
  constructor(){}
  async add(req: Request, res: Response){
    try {
      const {email,password} = req.body; 
      //* Encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt); //* Hashing password
      console.log("hashedPassword: ",hashedPassword);
      const user = await User.create({
        email,
        password: hashedPassword
      })
      
      res.json({
        ok: true,
        msg:"Usuario agregado satisfactoriamente!",
        data: user
      })
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  async update(req: Request, res: Response){
    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});
      return res.json({
        ok: true,
        msg:"Usuario actualizado satisfactoriamente!",
        data: updatedUser,
      });
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }
  async delete(req: Request, res: Response){
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      return res.json({
        ok: true,
        msg:"Usuario eliminado satisfactoriamente!",
      });
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }
  async getOne(req: Request, res: Response){
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      return res.json({
        data: user,
      });
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }
  async getAll(req: Request, res: Response){
    try {
      const users = await User.find();
      return res.json({
        ok: true,
        data: users
      });
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }

}