// models/jobs.js
const { JsonWebTokenError } = require("jsonwebtoken");
const mongoose = require("mongoose");
const jobsModel = require('../models/jobs');

const jobsSchema = new mongoose.Schema({
  Job_Title:{},
  Job_Responsibilities:{},
  Experience_Level:{},
  Job_Location:{},
  Job_Type:{},
  Job_Timing:{},
  Work_From_Location:{},
  Expected_Availability:{},
  Number_Of_Position:{},
  Job_Status:{},
  Created_Date:{},
  Updated_Date:{}
},
{
    versionKey: false  
  });

module.exports = mongoose.model("jobs", jobsSchema);