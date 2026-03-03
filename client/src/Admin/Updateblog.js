import React, { useEffect, useState } from "react";
import "./BlogsForm.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../axios";

const Updateblog = () => {
    const navigate=useNavigate()
  const [items, setItems] = useState({});
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [photourl, setPhotourl] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await api.post(`/viewblog/${id}`);

      console.log("Blogs Data:", response.data);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

//   useEffect(() => {
//     if (items.length>0) {
//       setTitle(items[0].title);
//       setContent(items[0].content);
//       setPhotourl(items[0].photo);
//     }
//   }, [items]);

useEffect(() => {
    if (items && Object.keys(items).length > 0) {
      setTitle(items.title);
      setContent(items.content);
      setPhotourl(items.photo);
    }
  }, [items]);
  

  useEffect(() => {
    if (photo) {
      Upload(photo);
    }
  }, [photo]);

  const Upload = (photo) => {
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

    if (!title || !content || !photourl) {
      alert("All fields are required");
      return;
    }

    alert("Submitting Blog...");

    try {
      const formData = { id, title, photo: photourl, content };

      const response = await api.post("/updateblog", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("Blog updated successfully");
        navigate("/dashboard/getblogs")

        setTitle("");
        setPhoto("");
        setContent("");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Failed to submit blog");
    }
  };

  return (
    <>
      <button className="btn btn-secondary mb-3">
        <Link to="/dashboard/getblogs" className="text-white text-decoration-none">View Blogs</Link>
      </button>
      
      <div className="blog-container container mt-4 mb-4">
        <div className="row justify-content-center m-4">
          
          <div className="col-md-8 col-lg-6">
            <div className="card px-4 py-3 shadow-sm">
              <h2 className="text-center mb-3">Update Blog Post</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Blog Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter blog title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Image </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Blog Content</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Write your blog..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Update Blog
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-6 mt-3 d-flex flex-column align-items-center">
            <img
              src="https://elearningindustry.com/wp-content/uploads/2013/09/how-to-use-blogs-in-the-classroom.jpg"
              alt="Blog"
              className="blog-image img-fluid rounded shadow"
            />
            <img
              src="https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg"
              alt="Blog"
              className="blog-image img-fluid rounded shadow mt-4 d-none d-md-block"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Updateblog;
