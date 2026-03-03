



import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Adminlayout.css";
import api from "../axios";

const AdminLayout = () => {
  const [item, setItem] = useState({});
  const [pic, setPic] = useState(localStorage.getItem("profilePic"));
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const defaultphoto =
    "https://png.pngatree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png";

  useEffect(() => {
    if (!localStorage.getItem("Name")) {
      navigate("/login");
    }

    const name = localStorage.getItem("Name");
    const role = localStorage.getItem("Role");
    setItem({ name });

    if (role === "admin") {
      navigate("/dashboard");
    } else if (role === "user") {
      navigate("/userdashboard");
    }

    if (localStorage.getItem("EMAIL") && localStorage.getItem("TOKEN")) {
      getProfilePic();
    }
  }, []);

  const getProfilePic = async () => {
    const email = localStorage.getItem("EMAIL");
    const token = localStorage.getItem("TOKEN");

    try {
      const response = await api.post(
        "/getprofilepic",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.profile) {
        setPic(response.data.profile);
        localStorage.setItem("profilePic", response.data.profile);
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="d-flex">
      <div
        className="sidebar"
        style={{
          height: "100vh",  // Fixed height
          overflowY: "auto",  // Allow scroll if content exceeds height
          width: "250px",
          backgroundColor: "#212529",
          color: "white",
          padding: "20px",
        }}
      >
        <h4 className="mb-4">Admin Panel</h4>

        <Link to="/" className="d-flex align-items-center text-white mb-3">
  <span className="me-2" role="img" aria-label="home-icon">🏠</span>
  Home
</Link>
        {/* Dashboard Section */}
        <div className="mb-3">
          <div
            onClick={() => toggleMenu("dashboard")}
            style={{ cursor: "pointer" }}
          >
            📊 Dashboard {openMenu === "dashboard" ? "▲" : "▼"}
          </div>
          {openMenu === "dashboard" && (
            <div className="ms-3 mt-2">
              <Link to="/dashboard/category" className="d-block text-white">
                Category
              </Link>
              <Link to="/dashboard/subcategory" className="d-block text-white">
                Subcategory
              </Link>
              <Link
                to="/dashboard/smallcategory"
                className="d-block text-white"
              >
                Smallcategory
              </Link>
            </div>
          )}
        </div>

        {/* Categories Section */}
        <div className="mb-3">
          <div
            onClick={() => toggleMenu("categories")}
            style={{ cursor: "pointer" }}
          >
            📁 Categories {openMenu === "categories" ? "▲" : "▼"}
          </div>
          {openMenu === "categories" && (
            <div className="ms-3 mt-2">
              <Link to="/dashboard/getcategory" className="d-block text-white">
                Get Category
              </Link>
              <Link
                to="/dashboard/getsubcategory"
                className="d-block text-white"
              >
                Get Subcategory
              </Link>
              <Link
                to="/dashboard/getsmallsubcategory"
                className="d-block text-white"
              >
                Get Smallcategory
              </Link>
            </div>
          )}
        </div>

        {/* Blogs Section */}
        <div className="mb-3">
          <div
            onClick={() => toggleMenu("blogs")}
            style={{ cursor: "pointer" }}
          >
            📄 Blogs {openMenu === "blogs" ? "▲" : "▼"}
          </div>
          {openMenu === "blogs" && (
            <div className="ms-3 mt-2">
              <Link to="/dashboard/blogs" className="d-block text-white">
                Blogs
              </Link>
              <Link to="/dashboard/getblogs" className="d-block text-white">
                Get Blogs
              </Link>
            </div>
          )}
        </div>

        {/* Profile & Orders */}
        <Link to="/dashboard/enquiries" className="d-block text-white mb-3">
          📅 Profile
        </Link>

        <Link to="/dashboard/getpendingorders" className="d-block text-white mb-3">
          💼 Admin Orders
        </Link>

        <hr className="bg-light" />

        {/* Dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle w-100"
            type="button"
            data-bs-toggle="dropdown"
            data-bs-auto-close="true"  // 👈 Add this line

            aria-expanded="false"
          >
            {item.name}
          </button>
          <ul className="dropdown-menu p-2 text-center">
            <img
              src={pic || defaultphoto}
              alt="User"
              width="60"
              height="60"
              className="rounded-circle mb-2"
            />
            <div className="mb-2">{item.name}</div>
            <li>
              <Link className="dropdown-item" to="/profilepagee">
                Profile
              </Link>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Outlet */}
      <div
        className="flex-grow-1 p-3"
        style={{
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
