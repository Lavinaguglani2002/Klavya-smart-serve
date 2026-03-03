const BlogModel = require("../model/BlogModel");
const jwt = require("jsonwebtoken");

// Function to submit user blog
const submitUserBlog = async (req, res) => {
    try {
      const { title, photo, content } = req.body;
      const userId = req.user.userId;  // Access the userId from the decoded token
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is missing" });
      }
  
      const newBlog = new BlogModel({
        title,
        photo,
        content,
        author: userId,
      });
  
      await newBlog.save();
      res.status(201).json({ message: "Blog submitted successfully for review!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to submit blog" });
    }
  };
  

// Function to get blogs for the logged-in user
const getUserBlogs = async (req, res) => {
    try {
      // Get the userId from the decoded JWT (from authMiddleware)
      const userId = req.user.userId;
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is missing" });
      }
  
      // Find all blogs written by the user
      const blogs = await BlogModel.find({ author: userId });
  
      if (!blogs || blogs.length === 0) {
        return res.status(404).json({ message: "No blogs found" });
      }
  
      res.status(200).json({ blogs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve blogs" });
    }
  };
  
module.exports = { submitUserBlog, getUserBlogs };
