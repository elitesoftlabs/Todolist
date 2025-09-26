const express = require('express');
const router = express.Router();
const ObjectId=require('mongodb')
const mongoose = require('mongoose');
const { FormatDate } = require('../utils/dateFormatter');
const applicationModel=require('../models/application');
const jobsModel= require('../models/jobs');
const ApiResponse= require('../utils/response.jsx');

router.get('/list', async (req, res) => {

const applications = [
  { id: 1, Job_Title: "Frontend Developer", Experience_Level: "Tech Corp", Job_Location: "Bangalore" },
  { id: 2, Job_Title: "Backend Engineer", Experience_Level: "Code Ltd", Job_Location: "Hyderabad" },
  { id: 3, Job_Title: "Project Manager", Experience_Level: "BizSoft", Job_Location: "Pune" },
];
  res.json(applications);
});

router.get('/listapplicant', async (req, res) => {
  let responseText = { data: '', message: '', status: '', code: "", error: '' };

  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    let skip = (page - 1) * limit;

    const totalApplicants = await applicationModel.countDocuments();

    let users = await applicationModel.find({})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); 
    if (!users || users.length === 0) {
      return ApiResponse.success(res, 200, "No Data", "No applicants found", []);
    }
    const pagination = {
      totalRecords: totalApplicants,
      currentPage: page,
      totalPages: Math.ceil(totalApplicants / limit),
      pageSize: limit
    };

    return ApiResponse.success(
      res,
      200,
      "Success",
      "All Applicants listed successfully",
      { users, pagination }
    );

  } catch (error) {
    return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message);
  }
});

router.put('/jobconfirmation', async (req, res) => {
  let responseText = { data: '', message: '', status: '', code: '', error: '' };

  try {
    const { Job_ID, Job_Seeker_ID } = req.body;

    if (!Job_ID || !Job_Seeker_ID) {
      return res.status(400).json({
        data: '',
        message: 'Job ID and Job Seeker ID are required',
        status: 400,
        code: '400',
        error: 'Missing Job_ID or Job_Seeker_ID'
      });
    }

    const date =  FormatDate();
    const status = ['Select'];
    const autoStatus = status[Math.floor(Math.random() * status.length)];

    const result = await applicationModel.findOneAndUpdate(
      { Job_ID: Job_ID, Job_Seeker_ID: Job_Seeker_ID },
      { 
        $set: { 
          Application_Status: autoStatus,
          Updated_Date: date
        } 
      },
      { new: true } 
    );

    if (!result) {
      responseText.datanew = '';
      responseText.message = "Application not found for given Job_ID and Job_Seeker_ID";
      responseText.status = 404;
      responseText.code = "404";
    } else {
      return ApiResponse.success(res, 200, "Success", "List the company Successfully ", result);

    }

  } catch (error) {
       return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message);
      }
  });


router.post('/applyjob', async (req, res) => {
  let responseText = { data: '', message: '', status: '', code: '', error: '' };
 
  const date = FormatDate();
  try {

    let application = await applicationModel.create({
      Job_ID: req.body.Job_ID,
      Job_Seeker_ID: req.body.Job_Seeker_ID,
      Expected_CTC: req.body.Expected_CTC,
      Joining_Availability: req.body.Joining_Availability,
      Applied_Date: date ,
      Updated_Date: date ,
      Application_Status: req.body.Application_Status || "Applied" 
    });

    if (!application) {
      responseText.data = '';
      responseText.message = "Application not created";
      responseText.status = 400;
      responseText.code = "400";
      return res.type('application/json').send(JSON.stringify(responseText));
    }
    return ApiResponse.success(res, 200, "Success", "Application Created Successfully ",application);

  } catch (error) {
       return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message);
 }
});

// Job Seeker to see all his/her applied jobs with Job_Id and _id(in the jobs collection) list (Rajesh applied to which are all the companies)
router.get('/listappliedjobs', async (req, res) => {
  try {
    const { Job_Seeker_ID } = req.query; 

    let filter = {};
    if (Job_Seeker_ID) {
      filter.Job_Seeker_ID = _id;
    }
    const applications = await applicationModel.find(filter)
      .populate("job_id", "title description location salary") 
      .populate("jobseeker_id", "FullName Email_id")          
      .sort({ createdAt: -1 });

    if (!applications || applications.length === 0) {
      return ApiResponse.success(res, 200, "No Data", "No applied jobs found", []);
    }

    return ApiResponse.success(
      res,
      200,
      "Success",
      "Applied jobs fetched successfully",
      applications
    );

  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return ApiResponse.error(res, 500, "Internal Server Error", "An error occurred", error.message);
  }
});



module.exports = router;