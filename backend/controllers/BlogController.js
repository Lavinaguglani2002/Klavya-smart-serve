const BlogModel =require("../model/BlogModel")

const blog = async (req, res) => {
    try {
        const { title, photo, content } = req.body;

        if (!title || !photo || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBlog = new BlogModel({ title, photo, content });
        await newBlog.save();

        res.status(201).json({ message: "Blog successfully created", blog: newBlog });

    } catch (error) {
        console.error("Error saving blog:", error.message);
        res.status(500).json({ message: "Error creating blog", error: error.message });
    }
};
const getblog = async (req, res) => {
    try {
        const data = await BlogModel.find();
        res.json(data);
    } catch (error) {
        console.error(error);  
        res.status(500).json({
            message: "Error fetching enquiries"
        });
    }
};
const viewblog = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await BlogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ message: "Error retrieving blog", error: error.message });
    }
};



const deleteBlogs= async (req, res) => {
  try {
    const { id } = req.params; 
    const deleteBlogs = await BlogModel.findByIdAndDelete(id);

    if (!deleteBlogs) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateblog=async(req,res)=>{
    try {
        const updateblog=await BlogModel.updateOne({_id:req.body.id},req.body)
        res.status(200).json({message:"ok",updateblog})
        
    } catch (error) {
        res.status(500).json({message:"errro in updating"})
        
    }
}




module.exports = {blog,getblog,viewblog,deleteBlogs,updateblog};
