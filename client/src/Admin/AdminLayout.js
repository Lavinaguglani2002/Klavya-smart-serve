
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "./Adminlayout.css";
import api from "../axios";

const AdminLayout = () => {
  const [item, setItem] = useState({
    name: localStorage.getItem("Name") || "Admin",
  });

  const [pic, setPic] = useState(
    localStorage.getItem("profilePic") || ""
  );

  const [openMenu, setOpenMenu] = useState("categories");

  const navigate = useNavigate();
  const location = useLocation();

  const defaultphoto =
    "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png";

  useEffect(() => {
    const name = localStorage.getItem("Name");
    const role = localStorage.getItem("Role");

    if (!name) {
      navigate("/login", { replace: true });
      return;
    }

    // Only admins can access the admin layout.
    if (role && role.toLowerCase() !== "admin") {
      navigate("/userdashboard", { replace: true });
      return;
    }

    setItem({ name });

    const email = localStorage.getItem("EMAIL");
    const token = localStorage.getItem("TOKEN");

    if (email && token) {
      getProfilePic();
    }
  }, [navigate]);

  const getProfilePic = async () => {
    const email = localStorage.getItem("EMAIL");
    const token = localStorage.getItem("TOKEN");

    try {
      const response = await api.post(
        "/getprofilepic",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.profile) {
        setPic(response.data.profile);
        localStorage.setItem(
          "profilePic",
          response.data.profile
        );
      }
    } catch (error) {
      console.error(
        "Error fetching profile picture:",
        error.response?.data || error.message
      );
    }
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const toggleMenu = (menu) => {
    setOpenMenu((previous) =>
      previous === menu ? null : menu
    );
  };

  const linkClass = (path) =>
    `d-block text-white text-decoration-none py-1 ${
      location.pathname === path ? "fw-bold text-info" : ""
    }`;

  return (
    <div className="d-flex admin-layout">
      {/* Sidebar */}
      <aside
        className="sidebar flex-shrink-0"
        style={{
          minHeight: "100vh",
          width: "250px",
          overflowY: "auto",
          backgroundColor: "#212529",
          color: "white",
          padding: "20px",
        }}
      >
        <h4 className="mb-4">Admin Panel</h4>

        <Link to="/" className="d-block text-white mb-4">
          🏠 Home
        </Link>

        {/* Dashboard */}
        <div className="mb-3">
          <div
            onClick={() => toggleMenu("dashboard")}
            style={{ cursor: "pointer" }}
          >
            📊 Dashboard {openMenu === "dashboard" ? "▲" : "▼"}
          </div>

          {openMenu === "dashboard" && (
            <div className="ms-3 mt-2">
              <Link to="/dashboard" className={linkClass("/dashboard")}>
                Home Dashboard
              </Link>
              <Link to="/dashboard/enquiries" className={linkClass("/dashboard/enquiries")}>
                Users / Enquiries
              </Link>
            </div>
          )}
        </div>

        {/* Categories and Forms */}
        <div className="mb-3">
          <div
            onClick={() => toggleMenu("categories")}
            style={{ cursor: "pointer" }}
          >
            📁 Categories {openMenu === "categories" ? "▲" : "▼"}
          </div>

          {openMenu === "categories" && (
            <div className="ms-3 mt-2">
              <Link to="/dashboard/category" className={linkClass("/dashboard/category")}>
                ➕ Add Category
              </Link>

              <Link to="/dashboard/getcategory" className={linkClass("/dashboard/getcategory")}>
                Get Category
              </Link>

              <Link to="/dashboard/subcategory" className={linkClass("/dashboard/subcategory")}>
                ➕ Add Subcategory
              </Link>

              <Link to="/dashboard/getsubcategory" className={linkClass("/dashboard/getsubcategory")}>
                Get Subcategory
              </Link>

              <Link to="/dashboard/smallcategory" className={linkClass("/dashboard/smallcategory")}>
                ➕ Add Smallcategory
              </Link>

              <Link to="/dashboard/getsmallsubcategory" className={linkClass("/dashboard/getsmallsubcategory")}>
                Get Smallcategory
              </Link>
            </div>
          )}
        </div>

        {/* Blogs and Forms */}
        <div className="mb-3">
          <div
            onClick={() => toggleMenu("blogs")}
            style={{ cursor: "pointer" }}
          >
            📄 Blogs {openMenu === "blogs" ? "▲" : "▼"}
          </div>

          {openMenu === "blogs" && (
            <div className="ms-3 mt-2">
              <Link to="/dashboard/blogs" className={linkClass("/dashboard/blogs")}>
                ➕ Add Blog
              </Link>

              <Link to="/dashboard/getblogs" className={linkClass("/dashboard/getblogs")}>
                Get Blogs
              </Link>
            </div>
          )}
        </div>

        {/* Profile and Orders */}
        <Link
          to="/dashboard/enquiries"
          className="d-block text-white mb-3"
        >
          👤 Profile / Users
        </Link>

        <Link
          to="/dashboard/getpendingorders"
          className="d-block text-white mb-3"
        >
          💼 Admin Orders
        </Link>

        <hr className="bg-light" />

        {/* User menu */}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle w-100"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {item.name}
          </button>

          <ul className="dropdown-menu p-2 text-center">
            <li>
              <img
                src={pic || defaultphoto}
                alt="Admin profile"
                width="60"
                height="60"
                className="rounded-circle mb-2"
              />
            </li>

            <li className="mb-2">{item.name}</li>

            <li>
              <Link className="dropdown-item" to="/profilepagee">
                Profile
              </Link>
            </li>

            <li>
              <button
                className="dropdown-item"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content: renders every nested route */}
      <main
        className="flex-grow-1 p-3"
        style={{
          minWidth: 0,
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
