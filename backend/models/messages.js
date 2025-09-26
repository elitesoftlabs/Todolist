// models/User.js
const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
  Job_ID:{},
  Messenger_ID:{},
  Receiver_ID:{},
  Email_Message:{},
  Messaged_Date:{},
},{
    versionKey: false  
  });

module.exports = mongoose.model("messages", messagesSchema);