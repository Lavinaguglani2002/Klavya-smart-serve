
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [pic, setPic] = useState("");
  const [picUrl, setPicUrl] = useState('');

  useEffect(() => {
    if (pic) {
      handleUpload(pic);
    }
  }, [pic]);

  const handlePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("Only PNG, JPG, and JPEG files are allowed");
        setPic('');
        return;
      }
      setPic(file);
    }
  };

  const handleUpload = (pic) => {
    const data = new FormData();
    data.append('file', pic);
    data.append('upload_preset', 'service');
    data.append('cloud_name', 'dnrels1zh');

    fetch('https://api.cloudinary.com/v1_1/dnrels1zh/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          setPicUrl(data.url);

          localStorage.setItem("profilePic", data.url || "/avatar.jpg");
          alert('Profile Picture Uploaded Successfully');
        } else {
          alert('Failed to Upload Picture');
        }
      })
      .catch(() => {
        alert('Error Uploading Picture');
      });
  };

  const handleSubmit = async () => {
    if (picUrl) {
      const formData = JSON.stringify({ pic1: picUrl });
      console.log(formData);
      alert('Profile Picture Submitted');
    }
  };

  return (
    <div className="container text-center mt-5 py-4">
      <h2 className="mb-3 text-lg font-semibold">Upload Profile Picture</h2>

      <label className="block text-sm font-medium text-gray-700 mb-2">Select an Image</label>
      <div className="mb-4">
        <input 
          type="file" 
          onChange={handlePicture} 
          className="border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
        />
      </div>

      {picUrl && (
        <div className="mt-4">
          <img 
            src={picUrl} 
            alt="Profile" 
            className="w-32 h-32 object-cover rounded-full mx-auto border border-gray-300 shadow-md"
          />
        </div>
      )}

      <button 
        onClick={handleSubmit} 
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded-md transition"
      >
        Submit
      </button>
    </div>
  );
};

export default ProfilePage;









// import React, { useEffect, useState } from "react";

// const ProfilePage = () => {
//   const [pic, setPic] = useState("");
//   const [picUrl, setPicUrl] = useState("");
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//   });

//   const stateZipMap = {
//     Punjab: "140001",
//     Haryana: "122001",
//     UttarPradesh: "226001",
//     Maharashtra: "400001",
//     Rajasthan: "302001",
//     Gujarat: "380001",
//     Karnataka: "560001",
//     TamilNadu: "600001",
//     WestBengal: "700001",
//     MadhyaPradesh: "462001",
//   };

//   // Auto-fill email & password from localStorage
//   useEffect(() => {
//     const savedEmail = localStorage.getItem("EMAIL") || "";
//     setFormData((prev) => ({
//       ...prev,
//       email: savedEmail,
//     }));
//   }, []);

//   useEffect(() => {
//     if (pic) {
//       handleUpload(pic);
//     }
//   }, [pic]);

//   const handlePicture = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const validTypes = ["image/jpeg", "image/jpg", "image/png"];
//       if (!validTypes.includes(file.type)) {
//         alert("Only PNG, JPG, and JPEG files are allowed");
//         setPic("");
//         return;
//       }
//       setPic(file);
//     }
//   };

//   const handleUpload = (pic) => {
//     const data = new FormData();
//     data.append("file", pic);
//     data.append("upload_preset", "service");
//     data.append("cloud_name", "dnrels1zh");

//     fetch("https://api.cloudinary.com/v1_1/dnrels1zh/image/upload", {
//       method: "post",
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.url) {
//           setPicUrl(data.url);
//           localStorage.setItem("profilePic", data.url || "/avatar.jpg");
//           alert("Profile Picture Uploaded Successfully");
//         } else {
//           alert("Failed to Upload Picture");
//         }
//       })
//       .catch(() => {
//         alert("Error Uploading Picture");
//       });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let updatedData = { ...formData, [name]: value };

//     // Auto-fill ZIP code when State changes
//     if (name === "state") {
//       updatedData.zip = stateZipMap[value] || "";
//     }

//     setFormData(updatedData);
//   };

//   const handleSubmit = () => {
//     if (picUrl) {
//       const submittedData = JSON.stringify({ ...formData, picUrl });
//       console.log(submittedData);
//       alert("Profile Submitted Successfully");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold text-center mb-6">Profile Page</h2>

//       {/* Profile Picture Upload */}
//       <div className="text-center">
//         <label className="block text-sm font-medium text-gray-700 mb-2">Upload Profile Picture</label>
//         <input type="file" onChange={handlePicture} className="border px-3 py-2 rounded-md w-full" />

//         {picUrl && (
//           <div className="mt-4">
//             <img
//               src={picUrl}
//               alt="Profile"
//               className="w-32 h-32 object-cover rounded-full mx-auto border shadow-md"
//             />
//           </div>
//         )}
//       </div>

//       {/* Profile Form */}
//       <form className="grid grid-cols-1 gap-4 mt-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             readOnly
//             className="mt-1 p-2 block w-full border rounded-md bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             readOnly
//             className="mt-1 p-2 block w-full border rounded-md bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="mt-1 p-2 block w-full border rounded-md"
//             placeholder="1234 Main St"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">City</label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             className="mt-1 p-2 block w-full border rounded-md"
//             placeholder="Enter city"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">State</label>
//           <select
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//             className="mt-1 p-2 block w-full border rounded-md"
//           >
//             <option value="">Select State</option>
//             {Object.keys(stateZipMap).map((state) => (
//               <option key={state} value={state}>
//                 {state}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Zip Code</label>
//           <input
//             type="text"
//             name="zip"
//             value={formData.zip}
//             readOnly
//             className="mt-1 p-2 block w-full border rounded-md bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         <div className="flex items-center">
//           <input type="checkbox" id="gridCheck" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
//           <label htmlFor="gridCheck" className="ml-2 block text-sm text-gray-900">
//             Check me out
//           </label>
//         </div>

//         <button
//           type="button"
//           onClick={handleSubmit}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;





