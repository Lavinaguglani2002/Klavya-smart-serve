import React, { useEffect, useState } from "react";
import api from "../axios";

const GetUserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const token = localStorage.getItem("TOKEN");

        const response = await api.get("/getuserblog", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBlogs(response.data.blogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err.response?.data?.message || "Failed to fetch user blogs");
      }
    };

    fetchUserBlogs();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Your Blogs</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {blogs.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Photo</th>
              <th style={thStyle}>Content</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td style={tdStyle}>{blog.title}</td>
                <td style={tdStyle}>
                  {blog.photo && (
                    <img
                      src={blog.photo}
                      alt="Blog"
                      style={{ width: "100px", borderRadius: "8px" }}
                    />
                  )}
                </td>
                <td style={tdStyle}>{blog.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No blogs found.</p>
      )}
    </div>
  );
};

// Inline styles
const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  backgroundColor: "#f2f2f2",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
};

export default GetUserBlogs;
