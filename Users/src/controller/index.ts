import { Request, Response } from 'express';
import Users from '../models';
import bcrypt from 'bcrypt';
import logger from '../shared/logger';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { USER_CONSTANTS } from './user.constants';

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
      const emailToken = jwt.sign(
        {
          emailId,
          password,
        },
        process.env.EMAIL_JWT,
        { expiresIn: '1d' }
      );
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new Users({
        emailId,
        password: hashedPassword,
        emailVerificationToken: emailToken,
      });
      await newUser.save();
      await axios.post(`http://email-sms:3001/api/user/sendEmail`, {
        to: emailId,
        subject: 'Email verification',
        text: 'Email verification',
        html: USER_CONSTANTS.emailVerificationMessage(emailToken),
      });
      logger.info('signUp api - User saved');
      return res.status(201).json({
        success: true,
        message: 'Signup successful',
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
        logger.info('Login successful');
        return res.status(200).json({
          success: true,
          message: 'Login successful',
          data: accessToken,
        });
      }
      logger.error('Invalid creds or user unverified');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials or unverified user',
      });
    } catch (err: any) {
      logger.error(err.message);
      return res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
      });
    }
  },

  verifyEmail: async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.EMAIL_JWT, (err: any, response: any) => {
          if (err) {
            return reject(err);
          }
          resolve(response);
        });
      });

      await Users.updateOne(
        { emailVerificationToken: token },
        { $set: { isVerified: true } }
      );
      logger.info('Email verified successfully');
      return res.status(200).json({
        success: true,
        message: 'Email verified successfully',
      });
    } catch (err: any) {
      logger.error(err.message);
      return res.status(401).json({
        success: false,
        message: err.message || 'Something went wrong',
      });
    }
  },
};

export default controller;
