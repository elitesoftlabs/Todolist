const express=require('express');
const router=express.Router();
const session = require('express-session');
const connectDB = require("./db");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bcryptjs = require('bcryptjs');
dotenv.config();
const cors = require('cors');
const messagesModel = require('./models/messages');
const jobsModel= require('./models/jobs');

const jobseekerRoutes=require('./routes/jobseeker');
const companyRoutes=require('./routes/company');
const commonRoutes=require('./routes/common');
const applicationRoutes=require('./routes/application');
const authRouters=require('./routes/auth');
const jobsRouters=require('./routes/jobs');

const app=express();

app.use(cookieParser());  
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // allow cookies
  })
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
connectDB();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 }
}));
 
app.use('/auth',authRouters);
app.use('/company',companyRoutes);
app.use('/jobseeker',jobseekerRoutes);
app.use('/jobs',jobsRouters);
app.use('/apply',applicationRoutes);


app.use((req, res) => {
  console.log('Not Found Endpoint:', req.method, req.originalUrl);
    res.status(404).json({ message: 'Endpoint not found' });
  });

app.listen(process.env.BACKEND_SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.BACKEND_SERVER_PORT}`);
  });