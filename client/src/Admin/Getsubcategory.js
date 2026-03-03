







// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const ViewSubCategory = () => {
//   const { subcategoryId } =useParams;
//   console.log("Editing Subcategory ID:", subcategoryId);


//   const [categories, setCategories] = useState([]);

//   // Fetch categories from API
//   useEffect(() => {
//     fetch("http://localhost:8000/categories")
//       .then((response) => response.json())
//       .then((data) => setCategories(data))
//       .catch((err) => console.log("Error fetching categories:", err));
//   }, []);

//   // Delete subcategory
//   const deleteSubCategory = async (categoryid, subcategoryid) => {
//     const formData = JSON.stringify({ categoryid, subcategoryid });

//     try {
//       const response = await fetch("http://localhost:8000/deletesubcategory", {
//         headers: { "Content-Type": "application/json" },
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         alert("Subcategory deleted successfully!");
//         setTimeout(() => {
//           window.location.reload();
//         }, 1000);
//       } else {
//         alert("Error deleting sub-category.");
//       }
//     } catch (err) {
//       console.log("Delete Error:", err);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4 text-uppercase fw-bold text-success">
//         View Sub-Categories
//       </h2>

//       <div className="table-responsive shadow-lg p-3 bg-white rounded">
//         <table className="table table-hover text-center align-middle">
//           <thead className="table-dark">
//             <tr>
//               <th>Category</th>
//               <th>Sub-Category</th>
//               <th>Image</th>
//               <th>Description</th>
//               <th>Created At</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((category) =>
//               category.subcategories.map((subcategory) => (
//                 <tr key={subcategory._id} className="table-light">
//                   <td className="fw-semibold">{category.categoryname}</td>
//                   <td className="fw-semibold text-primary">
//                     {subcategory.subcategoryname}
//                   </td>
//                   <td>
//                     <img
//                       src={subcategory.subcategoryimage}
//                       alt={subcategory.subcategoryname}
//                       className="img-thumbnail shadow-sm"
//                       style={{ height: "60px", width: "60px", objectFit: "cover" }}
//                     />
//                   </td>
//                   <td className="text-muted">{subcategory.content}</td>
//                   <td>{new Date(subcategory.createdAt).toLocaleDateString()}</td>
//                   <td>
//                     <button
//                       className="btn btn-danger btn-sm px-3 shadow-sm"
//                       onClick={() => deleteSubCategory(category._id, subcategory._id)}
//                     >
//                       <i className="bi bi-trash3-fill"></i> Delete
//                     </button>
//                     <td>
//                     <Link to={`/dashboard/updatesubcategory/${category._id}/${subcategory._id}`}>

//                     <button className="fa fa-edit"></button></Link>
//                     </td>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="text-center mt-4">
//         <Link to="/dashboard/subcategory" className="btn btn-success btn-lg shadow-sm">
//           <i className="bi bi-plus-circle"></i> Add New Sub-Category
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ViewSubCategory;
















import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../axios";

const ViewSubCategory = () => {
  const { subcategoryId } = useParams();
  console.log("Editing Subcategory ID:", subcategoryId);

  const [categories, setCategories] = useState([]);

  // Fetch categories from API

  useEffect(() => {
    // Using axios to fetch categories
    api.get("/categories")
      .then((response) => {
        setCategories(response.data);  // Set categories from the response data
      })
      .catch((err) => {
        console.log("Error fetching categories:", err);  // Log error if the request fails
      });
  }, []);
  
  // Delete subcategory

const deleteSubCategory = async (categoryid, subcategoryid) => {
  const formData = { categoryid, subcategoryid };  // Form data to send in the request

  try {
    const response = await api.post("/deletesubcategory", formData);  // Using axios POST request

    if (response.status === 200) {  // Check if the status code is 200
      alert("Subcategory deleted successfully!");
      setTimeout(() => {
        window.location.reload();  // Reload the page after deletion
      }, 1000);
    } else {
      alert("Error deleting sub-category.");
    }
  } catch (err) {
    console.log("Delete Error:", err);  // Log any error that occurs
  }
};

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-uppercase fw-bold text-success">
        📂 View Sub-Categories
      </h2>

      <div className="table-responsive shadow-lg p-4 bg-light rounded">
        <table className="table table-hover align-middle">
          <thead className="bg-dark text-light">
            <tr>
              <th style={{ width: "15%" }}>Category</th>
              <th style={{ width: "15%" }}>Sub-Category</th>
              <th style={{ width: "12%" }}>Image</th>
              <th style={{ width: "25%" }}>Description</th>
              <th style={{ width: "15%" }}>Created At</th>
              <th style={{ width: "18%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) =>
              category.subcategories.map((subcategory) => (
                <tr key={subcategory._id} className="table-light">
                  {/* Category Name */}
                  <td className="fw-semibold text-primary">{category.categoryname}</td>

                  {/* Sub-Category Name */}
                  <td className="fw-semibold text-info">{subcategory.subcategoryname}</td>

                  {/* Image */}
                  <td>
                    <img
                      src={subcategory.subcategoryimage}
                      alt={subcategory.subcategoryname}
                      className="img-thumbnail shadow-sm"
                      style={{
                        height: "60px",
                        width: "60px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </td>

                  {/* Description */}
                  <td className="text-secondary" style={{ fontSize: "14px" }}>
                    {subcategory.content}
                  </td>

                  {/* Created At */}
                  <td className="text-muted fw-bold">
                    {new Date(subcategory.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="d-flex flex-column align-items-center gap-2">
                      {/* Delete Button */}
                      <button
                        className="btn btn-danger btn-sm px-3 shadow-sm w-100"
                        onClick={() => deleteSubCategory(category._id, subcategory._id)}
                        style={{ borderRadius: "6px" }}
                      >
                        <i className="fa fa-trash"></i> Delete
                      </button>

                      {/* Line Separator */}
                      <hr className="w-100 my-1" style={{ borderTop: "2px solid #ddd" }} />

                      {/* Edit Button */}
                      <Link
                        to={`/dashboard/updatesubcategory/${category._id}/${subcategory._id}`}
                        className="btn btn-primary btn-sm px-3 shadow-sm w-100"
                        style={{ borderRadius: "6px" }}
                      >
                        <i className="fa fa-edit"></i> Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <Link to="/dashboard/subcategory" className="btn btn-success btn-lg shadow-sm">
          <i className="fa fa-plus-circle"></i> Add New Sub-Category
        </Link>
      </div>
    </div>
  );
};

export default ViewSubCategory;
