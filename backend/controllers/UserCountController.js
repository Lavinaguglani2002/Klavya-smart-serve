
const userModel= require("../model/userModel");
const Blogmodel=require("../model/BlogModel")
const OrderModel=require("../model/OrderModel")
const ProfileModel=require("../model/ProfileModel")

// const getUserCount = async (req, res) => {
//   try {
//     const users = await userModel.find();
//     const filtered = users.filter(u => u.role?.trim().toLowerCase() === "user");
//     res.status(200).json({ count: filtered.length });
//   } catch (err) {
//     res.status(500).json({ message: "Error counting users" });
//   }
// };

// const getUserCount = async (req, res) => {
//   try {
//     const totalUsers = await userModel.countDocuments({ role: "user" });

//     const profiles = await ProfileModel.find().populate("user").exec();

//     const usersWithProfile = profiles.filter(
//       (p) => p.user && p.user.role?.trim().toLowerCase() === "user"
//     );

//     res.status(200).json({ 
//       totalUsers, 
//       usersWithProfile: usersWithProfile.length 
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Error counting users", error: err.message });
//   }
// };

const getUserCount = async (req, res) => {
  try {
    // Count all users with role 'user'
    const totalUsers = await userModel.countDocuments({ role: "user" });

    // Get all profiles, populate related user data
    const profiles = await ProfileModel.find().populate("user");

    // Filter only those profiles whose user role is 'user'
    const usersWithProfile = profiles.filter(
      (profile) => 
        profile.user && 
        profile.user.role && 
        profile.user.role.trim().toLowerCase() === "user"
    );

    res.status(200).json({
      totalUsers,
      usersWithProfile: usersWithProfile.length
    });
  } catch (err) {
    res.status(500).json({
      message: "Error counting users",
      error: err.message
    });
  }
};


const countBlogs = async (req, res) => {
  try {
    const count = await Blogmodel.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error counting blogs", error });
  }
};

const getOrderStatusCount = async (req, res) => {
  try {
    const counts = await OrderModel.aggregate([
      {
        $group: {
          _id: "$deliveryStatus",
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert to object: {Pending: 4, Shipped: 3, Delivered: 2, Rejected: 1}
    const result = {
      Pending: 0,
      Shipped: 0,
      Delivered: 0,
      Rejected: 0
    };

    counts.forEach((item) => {
      result[item._id] = item.count;
    });

    res.json(result);
  } catch (error) {
    console.error("Error getting status count:", error);
    res.status(500).json({ message: "Server Error" });
  }
};






module.exports = {
  getUserCount,countBlogs,getOrderStatusCount
}