import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Admin.css";
import api from "../axios";

const FrontendBlogs = () => {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("/getblog");
      console.log("Blogs Data:", response.data);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await api.delete(`/deleteblog/${id}`);
      alert("Blog deleted successfully");
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete blog:", error);
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Blogs</h2>
      <div className="row">
        {items.map((item) => (
          <div key={item._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={item.photo} alt={item.title} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.content.substring(0, 100)}...</p>
                <div className="d-flex justify-content-between">
                  <Link to={`/viewblog/${item._id}`} className="btn btn-primary btn-sm">
                    Read More
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
  );
};

export default FrontendBlogs;
