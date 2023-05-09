import { Request, Response } from 'express';
import Users from '../models';
import bcrypt from 'bcrypt';
import logger from '../shared/logger';
import jwt from 'jsonwebtoken';

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
  signIn: async (req: Request, res: Response) => {
    try {
    } catch (error) {}
    const { emailId, password } = req.body;
    const user = await Users.findOne({ emailId });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Email does not exist, sign up first',
      });
    }
    const correctPwd = await bcrypt.compare(password, user.password);
    if (correctPwd && user.isVerified) {
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: accessToken,
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials or unverified user',
    });
  },
};

export default controller;
