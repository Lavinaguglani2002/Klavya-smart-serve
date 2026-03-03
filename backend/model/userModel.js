const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,

        required:true,

    },
    password:{
        type:String,
        required:true
    
    },
    role: { type: String, enum: ["user", "admin"], default: "user" } // ✅ Role added


})
const UserModel=mongoose.model("User",UserSchema)

module.exports=UserModel;