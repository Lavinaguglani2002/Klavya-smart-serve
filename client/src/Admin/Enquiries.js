



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../axios";

// const Enquiries = () => {
//   const [items, setItems] = useState([]);
//   const navigate = useNavigate();
//   const role=localStorage.getItem("Role")
//   const defaultphoto =
//     "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png";

//   // ✅ Fetch Data Function
//   const fetchData = async () => {
//     try {
//       const response = await api.get("/getallprofiles");
//       console.log("Enquiries Data:", response.data);
//       setItems(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this profile?")) return;

//     try {
//       await api.delete(`/delete/${id}`);
//       alert("Profile deleted successfully");

//       const loggedEmail = localStorage.getItem("EMAIL");
//       const userToDelete = items.find((item) => item._id === id); // Deleted user ka email lena

//       if (loggedEmail === userToDelete?.email) {
//         localStorage.removeItem("EMAIL");
//         navigate("/login");
//       }

//       fetchData();
//     } catch (error) {
//       console.error("❌ Error deleting profile:", error.response?.data?.message);
//       alert(error.response?.data?.message || "Failed to delete profile.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear(); // ✅ Token Clear
//     navigate("/login");
//   };

//   return (
//     <div className="container my-5">
//       <h2 className="text-center mb-4">User Enquiries</h2>

//       <div className="table-responsive">
//         <table className="table table-bordered table-striped text-center">
//           <thead className="table-dark">
//             <tr>
//               <th>Image</th>
//               <th>Email</th>
//               <th>Name</th>
//               <th>Role</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item) => (
//               <tr key={item._id}>
//                 <td>
//                   <img
//                     src={item.pic || defaultphoto}
//                     alt="Profile"
//                     className="rounded-circle"
//                     width="50"
//                     height="50"
//                   />
//                 </td>
//                 <td>{item.email}</td>
//                 <td>{item.user?.name || "No Name"}</td> {/* Use optional chaining here */}
//                 <td>{item.role}</td>
//                 <td>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleDelete(item._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="text-center mt-4">
//         <button onClick={handleLogout} className="btn btn-success mx-2">
//           Add User
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Enquiries;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

const Enquiries = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const defaultphoto =
    "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png";

  const fetchData = async () => {
    try {
      const response = await api.get("/getallprofiles");
      console.log("Enquiries Data:", response.data);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this profile?")) return;

    try {
      await api.delete(`/delete/${id}`);
      alert("Profile deleted successfully");

      const loggedEmail = localStorage.getItem("EMAIL");
      const userToDelete = items.find((item) => item._id === id);

      if (loggedEmail === userToDelete?.email) {
        localStorage.removeItem("EMAIL");
        navigate("/login");
      }

      fetchData();
    } catch (error) {
      console.error("❌ Error deleting profile:", error.response?.data?.message);
      alert(error.response?.data?.message || "Failed to delete profile.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">User Enquiries</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((item) => {
                const role = item?.role || item?.user?.role || "";
                return role !== "admin"; // ✅ Admin skip
              })
              .map((item) => {
                const name = item?.user?.name || "No Name";
                const role = item?.role || item?.user?.role || "";

                return (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.pic || defaultphoto}
                        alt="Profile"
                        className="rounded-circle"
                        width="50"
                        height="50"
                      />
                    </td>
                    <td>{item.email}</td>
                    <td>{name}</td>
                    <td>{role}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <button onClick={handleLogout} className="btn btn-success mx-2">
          Add User
        </button>
      </div>
    </div>
  );
};

export default Enquiries;
