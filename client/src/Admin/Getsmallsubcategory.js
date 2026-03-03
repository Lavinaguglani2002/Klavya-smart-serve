import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios";

const ViewSmallSubCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Use axios to fetch categories
    api.get('/categories')
      .then((response) => {
        setCategories(response.data);  // Set the categories from the response
      })
      .catch((err) => {
        console.log("Error fetching categories:", err);  // Handle error
      });
  }, []);
  

  // Delete subcategory

  const deleteSubCategory = async (categoryid, subcategoryid, smallsubcategoryid) => {
    const formData = { categoryid, subcategoryid, smallsubcategoryid };  // Data to send in the request body
  
    try {
      const response = await api.post(
        "/deletesmallsubcategory",  // Endpoint for the request
        formData,  // Send form data as the request body
        { headers: { "Content-Type": "application/json" } }  // Set headers
      );
  
      if (response.status === 200) {
        alert("Small Subcategory deleted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        alert("Error deleting small subcategory.");
      }
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };
  
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">View Small Sub-Categories</h1>

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Category</th>
              <th>Sub-Category</th>
              <th>Small Sub-Category</th>
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
              <th>Created At</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) =>
              category.subcategories.map((subcategory) =>
                subcategory.smallsubcategories.map((smallsubcategory) => (
                  <tr key={smallsubcategory._id}>
                    <td>{category.categoryname}</td>
                    <td>{subcategory.subcategoryname}</td>
                    <td>{smallsubcategory.smallsubcategoryname}</td>
                    <td>
                      <img
                        src={smallsubcategory.smallsubcategoryimage}
                        alt={smallsubcategory.smallsubcategoryname}
                        className="img-fluid rounded-circle"
                        style={{ height: "50px", width: "50px", objectFit: "cover" }}
                      />
                    </td>
                    <td>{smallsubcategory.smallsubcategorycontent}</td>
                    <td>{smallsubcategory.price}</td>
                    <td>{new Date(smallsubcategory.createdAt).toLocaleDateString()}</td>

                    {/* Delete Button - Separate TD */}
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          deleteSubCategory(category._id, subcategory._id, smallsubcategory._id)
                        }
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>

                    {/* Edit Button - Separate TD */}
                    <td>
                      <Link
                        to={`/dashboard/updatesmallsubcategory/${category._id}/${subcategory._id}/${smallsubcategory._id}`}
                      >
                        <button className="btn btn-warning btn-sm">
                          <i className="fa fa-edit"></i>
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-3">
        <Link to="/dashboard/smallcategory" className="btn btn-primary">
          <i className="fa fa-plus-circle"></i> Add Small Sub Category
        </Link>
      </div>
    </div>
  );
};

export default ViewSmallSubCategory;
