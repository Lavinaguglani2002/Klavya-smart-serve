





// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import "./BlogsForm.css";
// import api from "../axios";

// const UpdateSubCategoryForm = () => {
//   const navigate = useNavigate();
//   const { categoryId,subcategoryId } = useParams(); 
//   const [items,setItems]=useState({})
//   const [subcategoryname, setSubCategoryName] = useState("");
//   const [subcategoryimage, setSubCategoryImage] = useState("");
//   const [content,setContent]=useState("")
//   const [photourl, setPhotourl] = useState("");



//   useEffect(() => {
//     const formData = {
//       CategoryId: categoryId,
//       SubcategoryId: subcategoryId,
//     };
//     console.log(formData);
  
//     api.post("/viewsubcategory", formData)
//       .then((response) => {
//         console.log("fetched category", response.data);
//         setItems(response.data);
//       })
//       .catch((err) => console.log("Error fetching subcategory:", err));
//   }, [subcategoryId]);
  


// useEffect(() => {
//     if (items && Object.keys(items).length > 0) {
//       setSubCategoryName(items.subcategoryname);
//       setPhotourl(items.subcategoryimage);
//       setContent(items.content)
//     }
//   }, [items]);
  
// useEffect(()=>{
//   console.log("photo",subcategoryimage)
//   if(subcategoryimage){
//     Upload(subcategoryimage)
//   }
// },[subcategoryimage])

//   // ✅ Image Upload Function
//   const Upload = async(subcategoryimage) => {
//     if (!subcategoryimage) {
//       alert("Please select a photo");
//       return;
//     }

//     const data = new FormData();
//     data.append("file", subcategoryimage);
//     data.append("upload_preset", "bloggs");
//     data.append("cloud_name", "dnrels1zh");

//     fetch("https://api.cloudinary.com/v1_1/dnrels1zh/image/upload", {
//       method: "POST",
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.url) {
//           setPhotourl(data.url);
//           alert("Photo uploaded successfully");
//         } else {
//           alert("Failed to upload photo");
//         }
//       })
//       .catch((err) => {
//         console.error("Upload error:", err);
//         alert("Error uploading photo");
//       });
//   };

//   // ✅ Form Submit Function
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!subcategoryname || !photourl) {
//       alert("All fields are required");
//       return;
//     }

//     try {
//       const formData = {categoryId,subcategoryId, subcategoryname, subcategoryimage: photourl,content };

//       const response = await api.post(`/updatesubcategory`, formData, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.status === 200) {
//         alert("SubCategory updated successfully!");
//         setSubCategoryName("")
//         setSubCategoryImage("")
//         setContent("")
//         navigate("/dashboard/getsubcategory");
//       }
//     } catch (error) {
//       console.error("Error submitting:", error);
//       alert("Failed to update category");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="row justify-content-center">
//         <Link to="/getsubcategory">Get SubCategory</Link>
//         <div className="col-md-8">
//           <div className="card p-4 shadow-sm">
//             <h2 className="text-center">Update Sub Category</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label">Sub Category Title</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter category title"
//                   value={subcategoryname}
//                   onChange={(e) => setSubCategoryName(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Image</label>
//                 <input
//                   type="file"
//                   className="form-control"
//                   onChange={(e) => setSubCategoryImage(e.target.files[0])}
//                 />
//               </div>

//               {photourl && (
//                 <div className="mb-3 text-center">
//                   <img src={photourl} alt="Uploaded" width="150" className="rounded" />
//                 </div>
//               )}

// <div className="mb-3">
//                 <label className="form-label">Category Title</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter category title"
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   required
//                 />
//               </div>

//               <button type="submit" className="btn btn-primary w-100">
//                 Update SubCategory
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateSubCategoryForm;
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./BlogsForm.css";
import api from "../axios";

const UpdateSubCategoryForm = () => {
  const navigate = useNavigate();
  const { categoryId, subcategoryId } = useParams();

  const [items, setItems] = useState({});
  const [subcategoryname, setSubCategoryName] = useState("");
  const [subcategoryimage, setSubCategoryImage] = useState(null);
  const [content, setContent] = useState("");
  const [photourl, setPhotourl] = useState("");

  // ✅ Fetch Subcategory Data
  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const response = await api.post("/viewsubcategory", {
          CategoryId: categoryId,
          SubcategoryId: subcategoryId,
        });

        setItems(response.data);
      } catch (err) {
        console.error("Error fetching subcategory:", err);
      }
    };

    if (categoryId && subcategoryId) {
      fetchSubcategory();
    }
  }, [categoryId, subcategoryId]);

  // ✅ Set Data Into Form
  useEffect(() => {
    if (items && Object.keys(items).length > 0) {
      setSubCategoryName(items.subcategoryname || "");
      setPhotourl(items.subcategoryimage || "");
      setContent(items.content || "");
    }
  }, [items]);

  // ✅ Upload Image to Cloudinary
  const uploadImage = async (file) => {
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "bloggs");
    data.append("cloud_name", "dnrels1zh");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dnrels1zh/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (result.url) {
        setPhotourl(result.url);
        alert("Photo uploaded successfully");
      } else {
        alert("Failed to upload photo");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading photo");
    }
  };

  // ✅ Handle File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSubCategoryImage(file);
    uploadImage(file);
  };

  // ✅ Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subcategoryname || !photourl || !content) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await api.post(
        "/updatesubcategory",
        {
          categoryId,
          subcategoryId,
          subcategoryname,
          subcategoryimage: photourl,
          content,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        alert("SubCategory updated successfully!");

        setSubCategoryName("");
        setSubCategoryImage(null);
        setPhotourl("");
        setContent("");

        navigate("/dashboard/getsubcategory");
      }
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Failed to update subcategory");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <Link to="/dashboard/getsubcategory">Get SubCategory</Link>

        <div className="col-md-8">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center">Update Sub Category</h2>

            <form onSubmit={handleSubmit}>
              {/* Subcategory Name */}
              <div className="mb-3">
                <label className="form-label">Sub Category Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter subcategory title"
                  value={subcategoryname}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>

              {/* Preview */}
              {photourl && (
                <div className="mb-3 text-center">
                  <img
                    src={photourl}
                    alt="Subcategory Preview"
                    width="150"
                    className="rounded"
                  />
                </div>
              )}

              {/* Content */}
              <div className="mb-3">
                <label className="form-label">Content</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Update SubCategory
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubCategoryForm;