import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../axios";

const ViewBlog = () => {
  const { id } = useParams();
  const [item, setItem] = useState();
 

  useEffect(() => {
    const formData = { id };
  
    api.post(`/viewblog/${id}`, formData)
      .then((response) => {
        setItem(response.data);
      })
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);
  

  if (!item) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <img
          src={item.photo}
          className="card-img-top rounded img-fluid"
          alt={item.title}
        />
        <div className="card-body">
          <h3 className="card-title text-center">{item.title}</h3>
          <p className="card-text">{item.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
