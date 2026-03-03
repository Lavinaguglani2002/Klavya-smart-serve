
const ProfileModel = require("../model/ProfileModel");

const createProfile = async (req, res) => {
  try {
    const { pic, user } = req.body;
    const userEmail = req.user.email;

    // Check if profile picture is present
    if (!pic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Validate user ID
    if (!user) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    // Check if profile already exists
    let profile = await ProfileModel.findOne({ email: userEmail });
    if (profile) {
      return res.status(400).json({ message: "Profile already exists!" });
    }

    // Create new profile
    profile = new ProfileModel({
      email: userEmail,
      pic,
      user, // This should be user ID string
    });

    await profile.save();

    res.status(201).json({ message: "Profile created successfully", profile });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// ✅ Update Profile
const updateProfile = async (req, res) => {
  try {
    const {  pic } = req.body;
    const userEmail=req.user.email;


    const updatedProfile = await ProfileModel.findOneAndUpdate(
      { email:userEmail },
      {$set:{pic}},
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", updatedProfile });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get Single Profile


const getProfile = async (req, res) => {
  try {
    console.log("🔍 req.user:", req.user); // 🔴 Add this

    const userEmail = req.user.email;

    const profile = await ProfileModel.findOne({ email: userEmail });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ profile: profile.pic });
  } catch (error) {
    console.log("❌ Error in getProfile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ✅ Get All Profiles
const getAllProfiles = async (req, res) => {
  try {
    // const profiles = await ProfileModel.find();
    const profiles=await ProfileModel.find().populate('user').exec();
    console.log("Profiles:", profiles); // ✅ Debugging ke liye

    
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedProfile = await ProfileModel.findByIdAndDelete(id);

    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





module.exports = { createProfile, updateProfile, getProfile, getAllProfiles ,deleteProfile};








































































































































































