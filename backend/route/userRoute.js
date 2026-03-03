const express=require("express")
const router=express.Router()
const {signup,login, forgotPassword, ResetPassword}=require("../controllers/userController")
router.post("/api/signup",signup)

router.post("/api/login",login)
// router.get("/api/viewenquiries",vewEnquiries)
router.post("/api/forgotpassword",forgotPassword)
router.post("/api/resetpassword/:id/:token",ResetPassword)
module.exports=router