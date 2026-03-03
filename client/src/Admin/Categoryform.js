
import React, { useEffect, useState } from "react";
import "./BlogsForm.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios";

const CategoryForm = () => {
  const navigate = useNavigate();
  const [categoryname, setCategoryName] = useState("");
  const [categoryimage, setCategoryImage] = useState("");
  const [photourl, setPhotourl] = useState("");

  useEffect(() => {
    if (categoryimage) {
      uploadImage(categoryimage);
    }
  }, [categoryimage]);

  const uploadImage = (image) => {
    if (!image) {
      alert("Please select a photo");
      return;
    }

    const data = new FormData();
    data.append("file", image);
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
          localStorage.setItem("image", data.url);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryname || !photourl) {
      alert("All fields are required");
      return;
    }

    alert("Submitting Category...");

    try {
      const formData = { categoryname, categoryimage: photourl };

      const response = await api.post("/addcategory", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        alert("Category posted successfully");
        setCategoryName("");
        setCategoryImage("");
        navigate("/dashboard/subcategory");
      }
    } catch (error) {
      console.error("Error submitting category:", error);
      alert("Failed to submit category");
    }
  };

  return (
    <div className="blog-container container mt-4 mb-4">
      <div className="row justify-content-center m-4">
        {/* Keep side images as is */}
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="m-0">Add Category</h2>
              <Link to="/getcategory" className="btn btn-outline-primary btn-sm">
                View Categories
              </Link>
            </div>

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

              {/* OPTIONAL: Show uploaded image preview */}
              {photourl && (
                <div className="mb-3 text-center">
                  <img
                    src={photourl}
                    alt="Uploaded"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100">
                Publish Category
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar images stay SAME */}
        <div className="col-md-6 mt-3 d-flex flex-column align-items-center">
          <img
            src="https://media.istockphoto.com/id/2050449564/photo/small-business-owner-stock-photo.jpg?s=1024x1024&w=is&k=20&c=5BN2z8tGel9jb5EgppPX3gvzAnovL6wGP7zuCo9YvlA="
            alt="Blog"
            className="blog-image img-fluid rounded shadow"
          />
          <img
            src="https://media.istockphoto.com/id/1783214748/photo/processional-hair-dresser-styling-hair-of-young-woman-in-beauty-salon.jpg?s=1024x1024&w=is&k=20&c=HV9FxmQBdlGBQPt-TTWgW6Jh-JzH1hr01odBWXQkEK8="
            alt="Blog"
            className="blog-image img-fluid rounded shadow mt-4 d-none d-md-block"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
