const express=require("express")
const router=express.Router()
const {blog,getblog, viewblog, deleteBlogs, updateblog} = require("../controllers/BlogController")
const {submitUserBlog,getUserBlogs} = require("../controllers/userBlogController")
const authMiddleware = require("../authMiddleware")

router.post("/api/blog",blog)
router.get("/api/getblog",getblog)
router.post("/api/viewblog/:id",viewblog)
router.post("/api/updateblog",updateblog)


router.delete("/api/deleteblog/:id",deleteBlogs)

//userblogs
router.post("/api/submitblog",authMiddleware,submitUserBlog)

router.get("/api/getuserblog",authMiddleware,getUserBlogs)


module.exports=router;