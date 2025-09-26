// models/User.js
const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  user_type: {} ,
  first_name:{},
  last_name: {},
  gender: {},
  Email_id:{},
  password:{},
  phone_number:{},
  Total_experience:{},
  Skills:{},
  current_designation:{},
  current_CTC:{},
  Create_date:{},
  Updated_date:{},
  User_status:{},
  activate:{},
  deactivate:{},
  archive:{},
  company_status:{},
  Company_Name:{},
  Company_Location:{}
},{
    versionKey: false  
  });

module.exports = mongoose.model("users", usersSchema);