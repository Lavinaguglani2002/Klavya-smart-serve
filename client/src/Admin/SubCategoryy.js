


import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import api from '../axios';
const SubCategories = () => {
  const navigate=useNavigate()
  const [categories, setCategories] = useState([]); // State for storing categories
  const [categorytitle, setCategoryTitle] = useState(""); // Selected category
  const [subcategorytitle, setSubcategoryTitle] = useState(""); // Subcategory name
  const [photo, setPhoto] = useState("");
  const [photourl, setPhotourl] = useState("");
  const [content, setContent] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");  // Using axios to send GET request
      setCategories(response.data);  // Store categories in state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    

};

  useEffect(() => {
    console.log("Selected Photo:", photo);
    if (photo) {
      Upload(photo);
    }
  }, [photo]);

  const Upload = async (photo) => {
    if (!photo) {
      alert("Please select a photo");
      return;
    }
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "bloggs");
    data.append("cloud_name", "dnrels1zh");

    fetch("https://api.cloudinary.com/v1_1/dnrels1zh/image/upload", {

    
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          setPhotourl(data.url);
          localStorage.setItem("photo", data.url);
        } else {
          alert("Failed to upload photo");
        }
      })
      .catch((err) => {
        console.error("Upload error:", err);
        alert("Error uploading photo");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("categorytitle:", categorytitle);
    console.log("subcategorytitle:", subcategorytitle);
    console.log("photourl:", photourl);

    if (!categorytitle || !subcategorytitle || !photourl || !content) {
      alert("All fields are required");
      return;
    }
    alert("Submitting Sub-Category...");

    
    try {
      const response = await api.post("/insertsubcategory", {
        categoryname: categorytitle,
        subcategoryname: subcategorytitle,
        subcategoryimage: photourl,
        content: content
      });
    

      if (response.status === 201) {
        alert("Sub-Category added successfully");
        navigate("/dashboard/smallcategory")
        setCategoryTitle("");
        setSubcategoryTitle("");
        setPhoto("");
        setPhotourl("");
        setContent("");
      }
    } catch (error) {
      console.error("Error submitting sub-category:", error);
      alert("Failed to submit sub-category");
    }
  };

  return (
    <div className="container mt-5 mb-4">
      <div className="row justify-content-center m-4">
      <Link to="/dashboard/getsmallsubcategory">Get SubCategory</Link>

        <div className="col-lg-6">
          <div className="card px-4 py-3 shadow-sm">
            <h2 className="text-center mb-3">Add Sub-Category</h2>
            <form onSubmit={handleSubmit}>
              
              {/* Dropdown for selecting category */}
              <div className="mb-3">
                <label className="form-label">Select Category</label>
                <select 
                  className="form-control" 
                  value={categorytitle} 
                  onChange={(e) => setCategoryTitle(e.target.value)}
                  required
                >
                  <option value="">-- Select a Category --</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.categoryname}> 
                    {cat.categoryname}
                  </option>
                  
                  ))}
                </select>
              </div>

              {/* Subcategory Name */}
              <div className="mb-3">
                <label className="form-label">Sub-Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter sub-category"
                  value={subcategorytitle}
                  onChange={(e) => setSubcategoryTitle(e.target.value)}
                  required
                />
              </div>

              {/* Upload Image */}
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>

              {/* Subcategory Description */}
              <div className="mb-3">
                <label className="form-label">Sub-Category Description</label>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Write your description..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Add Sub-Category
              </button>
            </form>
          </div>
        </div>

        {/* Blog Images */}
        <div className="col-lg-6 mt-3 d-flex flex-column align-items-center">
          <img
            src="https://www.elegantthemes.com/blog/wp-content/uploads/2017/08/featuredimage-10.jpg"
            alt="Blog"
            className="img-fluid rounded shadow"
          />
          <img
            src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_1193,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1745848847729-4acd92.jpeg"
            alt="Blog"
            className="img-fluid rounded shadow mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default SubCategories;


