const express = require("express");
const {
    createProfile,
    updateProfile,
    getProfile,
    getAllProfiles,
    deleteProfile,
} = require("../controllers/profileController");
const authMiddleware = require("../authMiddleware");



const router = express.Router();

router.post("/createprofile",authMiddleware, createProfile);
router.put("/update", authMiddleware, updateProfile);
router.post("/getprofilepic", authMiddleware, getProfile);
router.get("/getallprofiles", getAllProfiles);
router.delete("/delete/:id", deleteProfile);


module.exports = router;
