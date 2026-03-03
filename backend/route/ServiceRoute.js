
const express = require("express");
const {category,insertcategory,insertsubcategory, getSubcategories, insertsmallsubcategory, 
    deletecategory, deleteSubCategory, deleteSmallSubCategory, viewcategory, updatecategory, 
     viewsubcategory, updatesubcategory,
     viewsubsmallcategory,
     updatesubsmallcategory,
     getSubsmallcategories,
     } = require("../controllers/servicecontroller");
const { getUserCount,  countBlogs, getOrderStatusCount } = require("../controllers/UserCountController");

const router = express.Router();

router.get("/api/categories", category);
router.post("/api/addcategory", insertcategory);    
router.post("/api/insertsubcategory", insertsubcategory);
router.post("/api/insertsmallsubcategory", insertsmallsubcategory);
router.get("/api/subcategories/:categoryname", getSubcategories);

router.post("/api/deletecategory", deletecategory);
router.post("/api/deletesubcategory", deleteSubCategory);

router.post("/api/deletesmallsubcategory", deleteSmallSubCategory); 

router.post("/api/view", viewcategory);
router.post("/api/viewsubcategory",viewsubcategory);
router.post("/api/viewsubsmallcategory",viewsubsmallcategory);

router.get("/api/getsubsmallcategory/:categoryname/:subcategoryname", getSubsmallcategories);


router.post("/api/updatecategory",updatecategory)
router.post("/api/updatesubcategory",updatesubcategory)

router.post("/api/updatesubsmallcategory",updatesubsmallcategory)
router.get("/api/count-users",getUserCount)
router.get("/api/count-blogs",countBlogs)
router.get("/api/getorderstatuscount",getOrderStatusCount)



module.exports = router;


