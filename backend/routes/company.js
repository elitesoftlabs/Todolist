const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const usersModel = require('../models/users');
const jobsModel = require('../models/jobs');
const { FormatDate } = require('../utils/dateFormatter');
const ApiResponse= require('../utils/response.jsx');


router.get('/list', async (req, res) => {
const company = [
  { id: 1, Company_Name: "Frontend ", Company_Location: "Tech Corp" },
  { id: 2, Company_Name: "Backend ", Company_Location: "Code Ltd" },
  { id: 3, Company_Name: "Project ", Company_Location: "BizSoft" },
];
  res.json(company);
});

router.get('/listnew', async (req, res) => {
    try {

        let company = await usersModel.find({ user_type: 'company' }); 

        if (!company || company.length === 0) {
            //return ApiResponse.success(res, 200, "No Data", "No company users found", []);
            res.json([]);
        }
        res.json(company);
        //return ApiResponse.success(res,200,"Success","List of companies details successfully",company);

    } catch (error) {
        //return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message);
        res.json([]);
    }
});


router.put('/updatecompany', async (req, res) => {

    try {
        const { comp_id, firstname, lastname, phonenumber,password,totalexperience,skills,} = req.body;
        if (!comp_id) {
            return res.status(400).json({ message: 'company-id is required for update' });
        }

       const date = FormatDate();

        let result = await usersModel.updateOne(
            { _id:comp_id},
            { $set: { 
              first_name:firstname, 
              last_name:lastname,
              phone_number:phonenumber,
              password:password,
              Total_experience:totalexperience,
              Skills:skills,
              Create_date:date,
              Updated_date:date
              }}  
        );

        if (result.matchedCount === 0) {
            responseText.message = "No user found";
            responseText.status = 404;
            responseText.code = "404";
        } else {
           return ApiResponse.success(res, 200, "Success", "update Company Sucessfully ", result);
        }
        
    } catch (error) {
        return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message);
    }
});

router.post('/addjobpost', async (req, res) => {

  const date = FormatDate();
      try {
     const job = await jobsModel.create({
      Job_Title: req.body.Job_Title,
      Job_Responsibilities: req.body.Job_Responsibilities,
      Experience_Level: req.body.Experience_Level,
      Job_Location: req.body.Job_Location,
      Job_Type: req.body.Job_Type,
      Job_Timing: req.body.Job_Timing,
      Work_From_Location: req.body.Work_From_Location,
      Expected_Availability: req.body.Expected_Availability,
      Number_Of_Position: req.body.Number_Of_Position,
      Job_Status: req.body.Job_Status,
      Created_Date:date,
      Updated_Date:date
    });

    if (!job) {
      responseText.message = "Failed to create job post";
      responseText.status = 400;
      responseText.code = "400";
      return res.type('application/json').send(JSON.stringify(responseText));
    }
    return ApiResponse.success(res, 200, "Success", "Add the jobpost Successfully ", job);

  } catch (error) {

      return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message)
  }
});


router.get('/listjobs', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || 'Created_Date';
    const order = req.query.order === 'asc' ? 1 : -1;
    const sortObj = {};
    sortObj[sortBy] = order;

    const totalJobs = await jobsModel.countDocuments();

    const jobs = await jobsModel.find()
      .skip(skip)
      .limit(limit)
      .sort(sortObj);

    if (!jobs || jobs.length === 0) {
      return ApiResponse.error(res, 404, "Not Found", "No jobs found");
    }
    return ApiResponse.success(
      res,
      200,
      "Success",
      "Jobs fetched successfully",
      {
        totalJobs,
        currentPage: page,
        totalPages: Math.ceil(totalJobs / limit),
        jobs
      }
    );

  } catch (error) {
    return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message);
  }
});


router.put('/updatejobstatus', async (req, res) => {

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        data: '',
        message: 'Job ID is required',
        status: 400,
        code: '400',
        error: 'Missing job id'
      });
    }
const result = await jobsModel.findByIdAndUpdate(
  id,
  { $set: { Job_Status: "Archieve" } },
  { new: true } 
);

    if (!result || result.matchedCount === 0) {
      responseText.data = '';
      responseText.message = "Job not found";
      responseText.status = 404;
      responseText.code = "404";
    } else {
     return ApiResponse.success(res, 200, "Success", "Job status updated to Archieve ", result);
    }

  } catch (error) {
      return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message);
  }
});

router.delete('/remove', async (req, res) => {

  try {
    const { _id} = req.body;
    if (!_id) {
      return res.status(400).json({
        data: '',
        message: 'Either Job ID is required to delete a job',
        status: 400,
        code: '400',
        error: 'Missing required fields'
      });
    }
   const removed = {};
    if (_id) removed._id = _id;

    const result = await jobsModel.deleteOne(removed);
    if (result.deletedCount === 0) {
      return res.status(404).json({
        data: '',
        message: 'Job not found',
        status: 404,
        code: '404',
        error: 'No job matched the given criteria'
      });
    }

   return ApiResponse.success(res, 200, "Success", "Removed the job Successfully ", result);

  } catch (error) {
         return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message);
        }
  });


router.get('/viewjobdetails', async (req, res) => {

  try {
    const { job_id } = req.query; 

    if (!job_id) {
      responseText.message = "Job ID is required";
      responseText.status = 400;
      responseText.code = "400";
      return res.json(responseText);
    }

    if (!(job_id)) {
      responseText.message = "Invalid Job ID";
      responseText.status = 400;
      responseText.code = "400";
      return res.json(responseText);
    }

    const job = await jobsModel.findById(job_id);
    if (!job) {
      responseText.message = "No job found with the given ID";
      responseText.status = 404;
      responseText.code = "404";
    } else {
      return ApiResponse.success(res, 200, "Success", "view jobdetails Successfully ", job);
    }

  } catch (error) {
     return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message);
  }
});


router.post("/emailapplicant", async (req, res) => {

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