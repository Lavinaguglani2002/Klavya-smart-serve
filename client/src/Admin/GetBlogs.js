
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Admin.css";
import api from "../axios";

const GetBlogs = () => {
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
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.photo} alt={item.title} className="blog-thumbnail" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
              </td>
              <td>{item.title}</td>
              <td>{item.content.substring(0, 100)}...</td>

              <button className="btn  " onClick={() => handleDelete(item._id)}>
                    <i className="fa fa-trash"></i>
                  </button>
                  <td>
                    <Link to={`/dashboard/UpdateBlog/${item._id}`}>
                  <button className="btn btn-danger " >
                    <i className="fa fa-edit"></i>
                  </button>
                  </Link>
                  </td>



            </tr>
            
          ))}

        </tbody>

      </table>
      <div className="text-center mt-4">
        <Link to="/dashboard/blogs" className="btn btn-success">
          Add Blogs
        </Link>
      </div>
    </div>
  );
};

export default GetBlogs;
