// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Link } from "react-router-dom";
// // import "bootstrap/dist/css/bootstrap.min.css"; 

// // const Getcategoryform = () => {
// //   const [items, setItems] = useState([]);

// //   const fetchData = async () => {
// //     try {
// //       const response = await axios.get("http://localhost:8000/categories");
// //       setItems(response.data);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this category?")) return;

// //     try {
// //       await axios.delete(`http://localhost:8000/deletecategory/${id}`);
// //       alert("Category deleted successfully");
// //       setItems(items.filter((item) => item._id !== id));
// //     } catch (error) {
// //       console.error("Failed to delete category:", error);
// //       alert("Failed to delete category");
// //     }
// //   };

// //   return (
// //     <div className="container d-flex justify-content-center align-items-center min-vh-100">
// //       <div className="card shadow-lg p-4" style={{ width: "60%", maxWidth: "900px" }}>
// //         <h2 className="text-center mb-4 text-primary">Categories</h2>
// //         <div className="table-responsive">
// //           <table className="table table-hover table-bordered">
// //             <thead className="table-dark text-center">
// //               <tr>
// //                 <th>Name</th>
// //                 <th>Image</th>
// //                 <th>Action</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {items.map((item) => (
// //                 <tr key={item._id} className="align-middle text-center">
// //                   <td className="fw-semibold">{item.name}</td>
// //                   <td>
// //                     <img
// //                       src={item.image}
// //                       alt={item.name}
// //                       className="rounded shadow-sm"
// //                       style={{ width: "80px", height: "80px", objectFit: "cover" }}
// //                     />
// //                   </td>
// //                   <td>
// //                     <button className="btn btn-danger btn-sm px-3" onClick={() => handleDelete(item._id)}>
// //                       🗑 Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //         <div className="text-center mt-4">
// //           <Link to="/category" className="btn btn-success px-4 py-2">
// //             ➕ Add Category
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Getcategoryform;





// // import React, { useEffect, useState } from 'react'
// // import { Link } from 'react-router-dom';

// // const ViewCategory = () => {
  
// //     const [items,setitems]=useState([]);
// //     useEffect(()=>{
// //         fetch("http://localhost:8000/categories")
// //         .then(response=>response.json())
// //         // .then(data=>console.log(data))
// //         .then(data=>setitems(data))
// //         .catch(err=>console.log(err))
// //     },[]);

    
// //     const deletecategory=async(categoryid)=>{
// //       const formdata=JSON.stringify({
// //        categoryid:categoryid,
// //       })
// //       try{
// //         const response=await fetch("http://localhost:8000/deletecategory",{
// //           headers:{"Content-type":"application/json"},
// //           method:"Post",
// //           body:formdata
// //         })

// //         if(response.ok){
// //           alert("blog deleted");
// //           // refresh krege taki blog delete ho jaye
// //           setTimeout(()=>{
// //             window.location.reload();
// //           },1000);
// //         }
// //         else{
// //           alert("error");
// //         }

// //       }
// //       catch(err){
// //        console.log(err);
// //       }
// //     }
    
// //   return (

// // <div className="container mt-4">
// //       <h1 className="text-center mb-4">View Category</h1>
// //       <div className="table-responsive">
// //         <table className="table table-striped table-hover table-bordered text-center">
// //           <thead className="table-dark">
// //             <tr>
// //               <th>Category </th>
// //               <th>Photo</th>
              
// //               <th>Created At</th>
// //               <th>Delete</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {items.map((item) => (
// //               <tr key={item._id}>
// //                 <td>{item.categoryname}</td>
// //                 <td>
// //                   <img
// //                     src={item.categoryimage}
// //                     alt="Blog Thumbnail"
// //                     className="img-fluid rounded"
// //                     style={{ height: "50px", width: "50px", objectFit: "cover" }}
// //                   />
// //                 </td>
// //                 <td>{new Date(item.createdAt).toLocaleDateString()}</td>
// //                 <td>
// //                   <button
// //                     className="btn btn-danger btn-sm"
// //                     onClick={() => deletecategory(item._id)}
// //                   >
// //                     <i className="bi bi-trash"></i>
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //       <div className="text-center mt-3">
// //         <Link to="/dashboard/category" className="btn btn-primary">
// //           <i className="bi bi-plus-circle"></i> Add More
// //         </Link>
// //       </div>
// //     </div>
// //   )
// // }

// // export default ViewCategory;










// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const ViewCategory = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/categories")
//       .then((response) => response.json())
//       .then((data) => setItems(data))
//       .catch((err) => console.log(err));
//   }, []);

//   const deleteCategory = async (categoryId) => {
//     const formData = JSON.stringify({ categoryid: categoryId });

//     try {
//       const response = await fetch("http://localhost:8000/deletecategory", {
//         headers: { "Content-type": "application/json" },
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         alert("Category deleted successfully!");
//         setTimeout(() => {
//           window.location.reload();
//         }, 1000);
//       } else {
//         alert("Error deleting category");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4 text-uppercase fw-bold text-primary">
//         View Categories
//       </h2>

//       <div className="table-responsive shadow-lg p-3 bg-white rounded">
//         <table className="table table-hover text-center align-middle">
//           <thead className="table-dark">
//             <tr>
//               <th>Category</th>
//               <th>Photo</th>
//               <th>Created At</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item) => (
//               <tr key={item._id} className="table-light">
//                 <td className="fw-semibold">{item.categoryname}</td>
//                 <td>
//                   <img
//                     src={item.categoryimage}
//                     alt="Category"
//                     className="img-thumbnail"
//                     style={{ height: "60px", width: "60px", objectFit: "cover" }}
//                   />
//                 </td>
//                 <td>{new Date(item.createdAt).toLocaleDateString()}</td>
//                 <td>
//                   <button
//                     className="btn btn-danger btn-sm px-3 shadow-sm"
//                     onClick={() => deleteCategory(item._id)}
//                   >
//                     <i className="bi bi-trash3-fill"></i> Delete
//                   </button>

//                 </td>
//                 <td>
// <Link to={`/dashboard/Updatecategory/${item._id}`}>
// <button className="btn btn-danger " >
//                     <i className="fa fa-edit"></i>
//                   </button>
// </Link>

//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="text-center mt-4">
//         <Link to="/dashboard/category" className="btn btn-success btn-lg shadow-sm">
//           <i className="bi bi-plus-circle"></i> Add New Category
//         </Link>


//       </div>
//     </div>
//   );
// };

// export default ViewCategory;





















import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../axios";

const ViewCategory = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");  // Use api instance to make the GET request
        setItems(response.data);  // Set the data into state
      } catch (error) {
        console.error("Error fetching categories:", error);  // Handle any errors
      }
    };

    fetchCategories();
  }, []);


    
    const deleteCategory = async (categoryId) => {
      try {
        const response = await api.post("/deletecategory", { categoryid: categoryId }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
    

      if (response.ok) {
        alert("Category deleted successfully!");
        setItems(items.filter((item) => item._id !== categoryId));
      } else {
        alert("Error deleting category.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 bg-light" style={{ width: "90%", maxWidth: "1100px", borderRadius: "12px" }}>
        <h2 className="text-center mb-4 text-uppercase fw-bold text-dark">📂 Category List</h2>

        <div className="table-responsive">
          <table className="table table-hover text-center align-middle" style={{ borderRadius: "10px", overflow: "hidden" }}>
            <thead className="bg-dark text-light">
              <tr>
                <th>Category</th>
                <th>Photo</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="bg-white" style={{ transition: "0.3s", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
                  <td className="fw-semibold">{item.categoryname}</td>
                  <td>
                    <img
                      src={item.categoryimage}
                      alt="Category"
                      className="img-thumbnail"
                      style={{
                        height: "60px",
                        width: "60px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "2px solid #17a2b8",
                      }}
                    />
                  </td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-3">
                      {/* Delete Button */}
                      <button
                        className="btn btn-danger btn-sm px-3 shadow"
                        onClick={() => deleteCategory(item._id)}
                        style={{ borderRadius: "6px" }}
                      >
                        <i className="fa fa-trash"></i>
                      </button>

                      {/* Edit Button */}
                      <Link to={`/dashboard/Updatecategory/${item._id}`}>
                        <button
                          className="btn btn-warning btn-sm px-3 shadow"
                          style={{ borderRadius: "6px", color: "#fff" }}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-4">
          <Link to="/dashboard/category" className="btn btn-success btn-lg shadow">
            <i className="fa fa-plus-circle"></i> Add New Category
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;
