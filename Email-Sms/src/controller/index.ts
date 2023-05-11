import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import logger from '../shared/logger';

const controller = {
  sendEmail: async (req: Request, res: Response) => {
    try {
      const { to, subject, text, html } = req.body;
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const mailOptions = {
        from: `${process.env.EMAIL_USER}`,
        to: to,
        subject: subject,
        text: text,
        html: html,
      };
      transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
          logger.error('Email not sent', error);
          return res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
          });
        } else {
          console.info('Email sent: ' + info.response);
          return res.status(200).json({
            success: true,
            message: `Email sent to ${to}`,
          });
        }
      });
    } catch (err: any) {
      logger.error(err.message);
      return res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
      });
    }
  },
};

export default controller;
