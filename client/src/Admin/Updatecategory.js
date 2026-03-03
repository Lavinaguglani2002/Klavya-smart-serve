





import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./BlogsForm.css";
import api from "../axios";

const UpdateCategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [items,setItems]=useState({})
  const [categoryname, setCategoryName] = useState("");
  const [categoryimage, setCategoryImage] = useState("");
  const [photourl, setPhotourl] = useState("");



  useEffect(() => {
    const formData = { id: id };  // Form data object (not stringified here)
  
    api.post("/view", formData)  // Using axios to send POST request
      .then((response) => {
        console.log("fetched category", response.data);
        setItems(response.data);  // Set the fetched data to the state
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, [id]);
  

useEffect(() => {
    if (items && Object.keys(items).length > 0) {
      setCategoryName(items.categoryname);
      setPhotourl(items.categoryimage);
    }
  }, [items]);
  
useEffect(()=>{
  console.log("photo",categoryimage)
  if(categoryimage){
    Upload(categoryimage)
  }
},[categoryimage])

  // ✅ Image Upload Function
  const Upload = async(categoryimage) => {
    if (!categoryimage) {
      alert("Please select a photo");
      return;
    }

    const data = new FormData();
    data.append("file", categoryimage);
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
          alert("Photo uploaded successfully");
        } else {
          alert("Failed to upload photo");
        }
      })
      .catch((err) => {
        console.error("Upload error:", err);
        alert("Error uploading photo");
      });
  };

  // ✅ Form Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryname || !photourl) {
      alert("All fields are required");
      return;
    }

    try {
      const formData = {id, categoryname, categoryimage: photourl };

      const response = await api.post(`/updatecategory`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("Category updated successfully!");
        setCategoryName("")
        setCategoryImage("")
        navigate("/dashboard/getcategory");
      }
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Failed to update category");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <Link to="/getcategory">Get Category</Link>
        <div className="col-md-8">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center">Update Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Category Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category title"
                  value={categoryname}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setCategoryImage(e.target.files[0])}
                />
              </div>

              {photourl && (
                <div className="mb-3 text-center">
                  <img src={photourl} alt="Uploaded" width="150" className="rounded" />
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100">
                Update Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryForm;
