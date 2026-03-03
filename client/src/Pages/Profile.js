
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

const Profile = () => {
  const navigate = useNavigate();
  const [pic, setPic] = useState("");
  const [picUrl, setPicUrl] = useState("");
  const [picError, setPicError] = useState("");
  const [email, setEmail] = useState("");
  // const[user,setuser]=useState('')

  useEffect(() => {
    const savedEmail = localStorage.getItem("EMAIL");
    console.log("Saved Email from LocalStorage:", savedEmail); // ✅ Debugging

    // const savedPic = localStorage.getItem("profilePic");
    // setPicUrl(savedPic);

    if (savedEmail) {
      setEmail(savedEmail);
      fetchUserPhoto(savedEmail)
    }
  }, []);

  const handlePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setPicError("Only PNG, JPG, and JPEG files are allowed.");
        setPic("");
        return;
      }
      setPicError("");
      setPic(file);
    }
  };
  useEffect(()=>{
    if(pic){
      handleUpload(pic)
    }
  },[pic])
  const handleUpload = (pic) => {
    if (!pic) return;
  
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "service");
    data.append("cloud_name", "dnrels1zh");
  
    fetch("https://api.cloudinary.com/v1_1/dnrels1zh/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          setPicUrl(data.url);
          localStorage.setItem("profilePic", data.url);
          console.log("Cloudinary Uploaded URL:", data.url); // ✅ Debugging
  
          alert("Profile Picture Uploaded Successfully");
        } else {
          console.error("Cloudinary Response Error:", data); // More details
          alert("Failed to Upload Picture. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Upload Error:", error); // More details on upload error
        alert("Error Uploading Picture");
      });
  };
  
  const user=localStorage.getItem("USER");
  console.log("User ID being sent:", user);

  const handleSubmit = async () => {
    if (!picUrl) {
      alert("profile picture is required");
      return;
    }

    const token = localStorage.getItem("TOKEN");
    
    try {
      const response = await api.post(
        "/createprofile",
        // {  pic: picUrl,user:user._id },
        {  pic: picUrl,user:user},

        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        alert("Profile created successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save profile.");
    }
  };

  const handleUpdateProfile = async () => {
    if (!email || !picUrl) {
      alert("All fields are required");
      return;
    }

    const token = localStorage.getItem("TOKEN");
    try {
      const response = await api.put(
        "/update",
        { email, pic: picUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Profile updated successfully");
        navigate("/dashboard/enquiries");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update profile.");
    }
  };

  const fetchUserPhoto = async (email) => {
    const token = localStorage.getItem("TOKEN");
    console.log(token);
    try {
      const response = await api.post(
        "/getprofilepic",
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        console.log(response.data.profile)
        const imageUrl = response.data.profile
         || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s";
        setPicUrl(imageUrl);
        localStorage.setItem("profilePic", imageUrl);
      }
    } catch (error) {
      console.error("Error fetching user photo:", error);
    }
  };




  return (
    <div className="container text-center mt-5 py-4">
      <h2 className="mb-3 text-lg font-semibold">Profile</h2>

      <label className="block text-sm font-medium text-gray-700 mb-2">Upload Profile Picture</label>
      <input 
        type="file" 
        onChange={handlePicture} 
        className="border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
      />
      {picError && <p className="text-red-500 text-sm mt-1">{picError}</p>}
      <button 
        onClick={handleUpload} 
        disabled={!!picError} 
        className={`mt-2 px-4 py-2 rounded-md text-white ${
          picError ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Upload
      </button>

      {picUrl && (
        <div className="mt-4">
          <img 
            src={picUrl} 
            alt="Profile" 
            className="w-32 h-32 object-cover rounded-full mx-auto border border-gray-300 shadow-md"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          readOnly
          className="mt-1 p-2 block w-full border rounded-md bg-gray-100 cursor-not-allowed"
        />
      </div>

      <button onClick={handleSubmit} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
        Save Profile
      </button>
      <button onClick={handleUpdateProfile} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
        Update Profile
      </button>
    </div>
  );
};

export default Profile;




















