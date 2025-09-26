const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const usersModel = require('../models/users');
const nodemailer = require('nodemailer');
const { FormatDate } = require('../utils/dateFormatter');
const jwt = require('jsonwebtoken');
const ApiResponse= require('../utils/response.jsx');
const bcrypt = require('bcryptjs');

// Demo user (in real life -> DB)
const user = { id: 1, username: "admin", password: bcrypt.hashSync("123456", 8) };



router.post('/register', async (req, res) => {
  const { Email_id, password,firstname,lastname,phonenumber,usertype,gender} = req.body;
  if (!Email_id || !password || !firstname || !lastname || !phonenumber || !usertype || !gender) {
    return res.status(400).json({ message: 'E-mail and password are required' });
  }

  const existingUser = await usersModel.findOne({ Email_id });
  if (existingUser) {
    return res.status(409).json({ message: 'E-mail already exists' });
  }

const now=FormatDate();

  await usersModel.insertOne
  ({ Email_id:Email_id, 
    password:password,
    first_name:firstname,
    last_name:lastname,
    phone_number:phonenumber,
    Create_date:now,
    Updated_date:now,
    user_type:usertype,
    gender:gender
});
  res.json({ message: 'Registration successful' });
});


router.post('/login', async (req, res) => {
  try {
    const { Email_id, password } = req.body;

    if (!Email_id || !password) {
      return res.status(400).json({ message: 'Email ID and password are required' });
    }

    const user = await usersModel.findOne({ Email_id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.session.user = { UserID: user._id, Email_id: user.Email_id };

    const payload = { id: user._id, email: user.Email_id };
    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        UserID: user._id,
        Email_id: user.Email_id,
        user_type: user.user_type
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message);
  }
});




function generateTempPassword(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";
  let pass = "";
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
}

router.post('/forgotpassword', async (req, res) => {
  try {
    const { Email_id } = req.body;

    if (!Email_id) {
      return res.status(400).json({
        data: { message: "Email_id is required" },
        responsecode: 400,
        errormessage: "Email_id missing"
      });
    }

    
    const user = await usersModel.findOne({ Email_id });
    if (!user) {
      return res.status(404).json({
        data: { message: "User not found" },
        responsecode: 404,
        errormessage: "No user found with this Email_id"
      });
    }

    const tempPassword = generateTempPassword();

    user.password = tempPassword; 
    await user.save();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS_CODE  
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: Email_id,
      subject: "Temporary Password",
      text: `Your temporary password is: ${tempPassword}\n\nPlease log in and change it immediately.`
    });

   return ApiResponse.success(res, 200, "Success", "Password has been emailed to you ",tempPassword);



  } catch (error) {         
      return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message);
    }
    });


module.exports = router;