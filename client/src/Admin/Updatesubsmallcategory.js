





import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./BlogsForm.css";
import api from "../axios";

const UpdateSubSmallCategoryForm = () => {
  const navigate = useNavigate();
  const { categoryId,subcategoryId,smallsubcategoryId } = useParams(); 
  const [items,setItems]=useState({})
  const [smallsubcategoryname, setSmallSubCategoryName] = useState("");
  const [smallsubcategoryimage, setSmallSubCategoryImage] = useState("");
  const [smallsubcategorycontent,setSmallSubContent]=useState("")
  const[price,setPrice]=useState("")
  const [photourl, setPhotourl] = useState("");


  useEffect(() => {
    const formData = {
      CategoryId: categoryId,
      SubcategoryId: subcategoryId,
      SmallsubcategoryId: smallsubcategoryId,
    };
    console.log(formData);
  
    api.post("/viewsubsmallcategory", formData)
      .then((response) => {
        console.log("fetched category", response.data);
        setItems(response.data);
      })
      .catch((err) => console.log("Error fetching sub-small category:", err));
  }, [smallsubcategoryId]);
  

useEffect(() => {
    if (items && Object.keys(items).length > 0) {
      setSmallSubCategoryName(items.smallsubcategoryname);
      setPhotourl(items.smallsubcategoryimage);
      setSmallSubContent(items.smallsubcategorycontent)
      setPrice(items.price)
    }
  }, [items]);
  
useEffect(()=>{
  console.log("photo",smallsubcategoryimage)
  if(smallsubcategoryimage){
    Upload(smallsubcategoryimage)
  }
},[smallsubcategoryimage])

  // ✅ Image Upload Function
  const Upload = async(smallsubcategoryimage) => {
    if (!smallsubcategoryimage) {
      alert("Please select a photo");
      return;
    }

    const data = new FormData();
    data.append("file", smallsubcategoryimage);
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

    if (!smallsubcategoryname || !photourl) {
      alert("All fields are required");
      return;
    }

    try {
      const formData = {categoryId,subcategoryId,smallsubcategoryId, smallsubcategoryname, smallsubcategoryimage: photourl,smallsubcategorycontent,price };

      const response = await api.post(`/updatesubsmallcategory`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("SmallsubCategory updated successfully!");
        setSmallSubCategoryName("")
        setSmallSubCategoryImage("")
        setSmallSubContent("")
        setPrice("")
        navigate("/dashboard/getsmallsubcategory");
      }
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Failed to update category");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <Link to="/getsmallsubcategory">Get Small SubCategory</Link>
        <div className="col-md-8">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center">Update Small Sub Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Small Sub Category Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category title"
                  value={smallsubcategoryname}
                  onChange={(e) => setSmallSubCategoryName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setSmallSubCategoryImage(e.target.files[0])}
                />
              </div>

              {photourl && (
                <div className="mb-3 text-center">
                  <img src={photourl} alt="Uploaded" width="150" className="rounded" />
                </div>
              )}

<div className="mb-3">
                <label className="form-label">Small Category Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category title"
                  value={smallsubcategorycontent}
                  onChange={(e) => setSmallSubContent(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category title"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>



              <button type="submit" className="btn btn-primary w-100">
                Update SubSmallCategory
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubSmallCategoryForm;
