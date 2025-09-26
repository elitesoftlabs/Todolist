const express = require('express');
const router = express.Router();
const { FormatDate } = require('../utils/dateFormatter');
const nodemailer = require("nodemailer");
const usersModel = require('../models/users');
const jobsModel = require('../models/jobs');
const ApiResponse= require('../utils/response.jsx');

router.get('/list', async (req, res) => {
const seekers = [
  { id: 1, first_name: "John", last_name: "Doe", Email_id: "john@example.com", Total_experience: "5 years", Skills: "JavaScript, React" },
  { id: 2, first_name: "Jane", last_name: "Smith", Email_id: "jane@example.com", Total_experience: "3 years", Skills: "Python, Django" },
  { id: 3, first_name: "Alice", last_name: "Johnson", Email_id: "alice@example.com", Total_experience: "4 years", Skills: "Java, Spring" },
];
  res.json(seekers);
});

router.get('/listnew', async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        let skip = (page - 1) * limit;

        const totalJobseekers = await usersModel.countDocuments({ user_type: 'jobseeker' });

        let users = await usersModel.find({ user_type: 'jobseeker' })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        if (!users || users.length === 0) {
            return ApiResponse.success(res, 200, "No Data", "No jobseeker profiles found", []);
        }
        const pagination = {
            totalRecords: totalJobseekers,
            currentPage: page,
            totalPages: Math.ceil(totalJobseekers / limit),
            pageSize: limit
        };

        return ApiResponse.success(
            res,
            200,
            "Success",
            "Jobseeker profiles fetched successfully",
            { users, pagination }
        );

    } catch (error) {
        return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message);
    }
});


 router.put('/updatejobseekerprofile', async (req, res) => {
     try {
         const { seeker_id, firstname, lastname, phonenumber,totalexperience,skills,currentdesignation,currentctc } = req.body;
         if (!seeker_id) {
             return res.status(400).json({ message: 'jobseeker-id is required for update' });
         }
         
         const date = FormatDate();
 
         let result = await usersModel.updateOne(
             { _id:seeker_id},
             { $set: { first_name:firstname, 
              last_name:lastname, 
              phone_number:phonenumber, 
              Total_experience:totalexperience,
              Skills:skills,
              current_designation:currentdesignation,
              current_CTC:currentctc,
              Create_date:date,
              Updated_date:date
            }}
         );
 
         if (result.matchedCount === 0) {
             responseText.message = "No user found";
             responseText.status = 404;
             responseText.code = "404";
         } else {
         return ApiResponse.success(res, 200, "Success", "Updatejobseekerprofile Successfully", result);
         }
     } catch (error) {
        
       return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message);
     }
 });

router.get('/searchjob', async (req, res) => {
let responseText = { data: '', message: '', status: '', code: '', error: '' };
  try {
    const { location, jobtitle, experience, page = 1, limit = 10, sortField = 'Created_Date', sortOrder = 'desc' } = req.query;

    let query = {};
    if (location) query.Job_Location = { $regex: location, $options: "i" };
    if (jobtitle) query.Job_Title = { $regex: jobtitle, $options: "i" };
    if (experience) query.Experience_Level = { $regex: experience, $options: "i" };

    const sort = {};
    sort[sortField] = sortOrder === 'asc' ? 1 : -1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const jobs = await jobsModel.find(query).sort(sort).skip(skip).limit(parseInt(limit));
    const totalJobs = await jobsModel.countDocuments(query);

    if (!jobs || jobs.length === 0) {
      responseText.data = [];
      responseText.status = 404;
      responseText.message = `No jobs found with given filters`;
      responseText.code = "404";
    } else {
      responseText.data = {
        jobs,
        pagination: {
          total: totalJobs,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(totalJobs / limit)
        }
      };
    }

    return ApiResponse.success(res, 200, "Success", "Search job Successfully", jobs);

  } catch (error) {
    return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message);
  }
});


router.post("/emailcompany", async (req, res) => {

  try {
    const { _id1,_id2} = req.body; 

    if (!_id1 || !_id2) {
      return res.status(400).json({
        success: false,
        message: "Sender _id and Receiver _id are required",
      });
    }

    const senderUser = await usersModel.findById(_id1)
    const receiverUser = await usersModel.findById(_id2)

    if (!_id1 || !_id2) {
      return res.status(404).json({
        success: false,
        message: "Sender or Receiver not found",
      });
    }
    const senderEmail = senderUser.Email_id;
    const receiverEmail =receiverUser.Email_id;

    const transporter = nodemailer.createTransport({
      service:"gmail", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS_CODE,
      },
    });

    const mailOptions = {
      from: senderEmail,
      to: receiverEmail,
      subject: "Elite Soft Lab",
      text: `Hello ${receiverUser.name || "User"}, this is an email from ${senderUser.name || "Elite Soft Lab"} Training Institute.`,
    };

    let info = await transporter.sendMail(mailOptions);

    return ApiResponse.success(res, 200, "Success", "Email sent Successfully ", mailOptions);


  } catch (error) {
               return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message);
      }
});


module.exports = router;