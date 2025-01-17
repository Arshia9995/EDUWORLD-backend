import nodemailer from "nodemailer";
import { config } from "../config/envConfig";
import { CustomError } from "../utils/CustomError";
import { verifyEmailDomain } from "../utils/validator";

const isProduction = config.app.node_env === "production";

const transporter = nodemailer.createTransport({
    host: config.app.email_service,
    port: isProduction ? 465 : 587,
    secure: isProduction,
    auth: {
      user: config.app.email,
      pass: config.app.password,
    },
  });


  async function verifyMail(email:string) {
    try {
      const res = await transporter.verify();
      await verifyEmailDomain(email)
      console.log("smtp verification successfull", res);
    } catch (error) { 
      if(error instanceof CustomError){
        throw error
      }
      throw new CustomError('cannot send otp',500,'email')
    }
  }

  const sendMail = async (email: string, action: string, template: string) => {
    try {
  
      await verifyMail(email);
  
      let info = await transporter.sendMail({
        from: "EDUWORLD",
        to: email,
        subject: action,
        html: template
      });
      console.log(info.envelope);
      console.log(info);
    } catch (error) {
      console.log(error)
      throw error;
    }
  };



  const OTPTemplate = (OTP: string) => {
    return `<html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
              }
              h1 {
                color: #007bff;
              }
              p {
                line-height: 1.6;
              }
            </style>
          </head>
          <body>
            <h1>Please confirm your OTP</h1>
            <p>Dear Cinepass customer,</p>
            <p>Here is your OTP code for verification: <strong>${OTP}</strong></p>
            <p>This OTP is required to complete your verification process.</p>
          </body>
        </html>`;
  };

  export { sendMail, OTPTemplate };
