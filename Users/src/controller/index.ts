import { Request, Response } from 'express';
import Users from '../models';
import bcrypt from 'bcrypt';
import logger from '../shared/logger';

const controller = {
  signUp: async (req: Request, res: Response) => {
    try {
      const { emailId, password } = req.body;
      const userExist = await Users.findOne({ emailId });
      if (userExist) {
        return res.status(401).json({
          success: false,
          message: 'Email already exist',
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new Users({
        emailId,
        password: hashedPassword,
      });
      await newUser.save();
      logger.info('signUp api - User saved');
      return res.status(201).json({
        success: true,
        message: 'User saved successfully',
      });
    } catch (err: any) {
      logger.error(`Error: ${err.message || err}`);
      return res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
      });
    }
  },
};

export default controller;
