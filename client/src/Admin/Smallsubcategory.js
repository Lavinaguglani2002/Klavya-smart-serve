import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios";

const SmallSubCategories = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [smallSubCategoryTitle, setSmallSubCategoryTitle] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [photourl, setPhotourl] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      api.get(`/subcategories/${selectedCategory}`)
        .then((res) => setSubCategories(res.data))
        .catch((err) => console.error("Error fetching subcategories:", err));
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (photo) Upload(photo);
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
    if (!selectedCategory || !selectedSubCategory || !smallSubCategoryTitle || !photourl || !content || !price) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/insertsmallsubcategory", {
        categoryname: selectedCategory,
        subcategoryname: selectedSubCategory,
        smallsubcategoryname: smallSubCategoryTitle,
        smallsubcategoryimage: photourl,
        smallsubcategorycontent: content,
        price: price,
      });

      if (response.status === 201) {
        alert("Small-Sub-Category added successfully");
        setSelectedCategory("");
        setSelectedSubCategory("");
        setSmallSubCategoryTitle("");
        setPhoto("");
        setPhotourl("");
        setContent("");
        setPrice("");
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow p-4">
          <h3 className="text-center mb-4">Add Small-Sub Category</h3>
          <Link to="/dashboard/getsmallsubcategory" className="btn btn-outline-secondary mb-3 w-100">
            View SmallSubCategories
          </Link>
          <form onSubmit={handleSubmit}>
            {/* Category */}
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.categoryname}>{cat.categoryname}</option>
                ))}
              </select>
            </div>

            {/* Subcategory */}
            <div className="mb-3">
              <label className="form-label">Sub-Category Name</label>
              <select
                className="form-select"
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                required
                disabled={!selectedCategory}
              >
                <option value="">Select Sub-Category</option>
                {subCategories.map((sub) => (
                  <option key={sub.id} value={sub.subcategoryname}>{sub.subcategoryname}</option>
                ))}
              </select>
            </div>

            {/* Small-sub-category name */}
            <div className="mb-3">
              <label className="form-label">Small-Sub-Category Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Hair Spa"
                value={smallSubCategoryTitle}
                onChange={(e) => setSmallSubCategoryTitle(e.target.value)}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Upload Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>

            {/* Content */}
            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Write content about the service..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Price */}
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., 299"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Submitting..." : "Add Small-Sub Category"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SmallSubCategories;
