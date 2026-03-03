const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true, 
    required: true,
  },
  pic: {
    type: String, 
    required: true,
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" ,
    required:true,
  },
}, { timestamps: true });

const ProfileModel = mongoose.model("Profile", ProfileSchema);
module.exports = ProfileModel;
