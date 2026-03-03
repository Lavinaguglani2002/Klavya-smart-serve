// const mongoose=require("mongoose")
// const BlogSchema=new mongoose.Schema({
//     title:{
//         type:String,
//         required:true,
//     },
//     photo:{
//         type:String,
//         required:true
//     },
//     content:{
//         type:String,
//         required:true,
//     },


// })
// const BlogModel=mongoose.model("blogs",BlogSchema)
// module.exports=BlogModel




// models/BlogModel.js
const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  photo: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = BlogModel;
