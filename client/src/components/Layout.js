




// import React, { useState, useEffect } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import Typewriter from '../Admin/Typewriter';
// import "./Layout.css"; // Custom CSS file for additional styling
// import { useLocation } from 'react-router-dom';

// const Layout = () => {
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [index, setIndex] = useState(0);
//   const [username, setUsername] = useState(null);
//   const [cartCount, setCartCount] = useState(0); // Renamed to cartCount for clarity
//   const [useremail, setUseremail] = useState("");
//   const [userrole, setUserrole] = useState("");
//   const [typewriterText, setTypewriterText] = useState('');

//   const location=useLocation();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   useEffect(()=>{
//     const email=localStorage.getItem("EMAIL")
//     if(email){
//       const savedCart=JSON.parse(localStorage.getItem(`cart_${email}`))||[];
//       setCartCount(savedCart.length)
//     }
//     const handleStorageChange=()=>{
//       const email=localStorage.getItem("EMAIL")
//       if(email){
//         const updatedCart=JSON.parse(localStorage.getItem( `cart_${email}`))||[];
//         setCartCount(updatedCart.length)
//       }
//     }
//     window.addEventListener("storage",handleStorageChange)
//     return ()=>window.removeEventListener("storage",handleStorageChange)
//   },[location])


//   useEffect(() => {
//     const storedUser = localStorage.getItem("Name");
//     const storedRole = localStorage.getItem("Role");
//     const email = localStorage.getItem("EMAIL");

//     if (storedUser) {
//       console.log("User:", storedUser);
//       setUsername(storedUser);
//       setUseremail(email);
//       setUserrole(storedRole);
      
//     }
//   },[location])


//   const handleLogout = () => {
//     localStorage.clear()

//     navigate("/login");
//   };

//   const placeholders = [
//     "Search for facial...",
//     "Search for cleaning...",
//     "Search for hair treatment...",
//     "Search for massage...",
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
//       setTypewriterText(placeholders[index]); // Update typewriter text
//     }, 500);

//     return () => clearInterval(interval);
//   }, [index]);
// const handleAddToCart=async()=>{
//   const email=localStorage.getItem("EMAIL")
//   if(email){
//     navigate("/addtocart")
//   }else{
//     alert("please login")
//     navigate("/login")
//   }
  
// }
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg custom-navbar">
//         <div className="container-fluid d-flex align-items-center">
//           <a className="navbar-brand text-white d-flex align-items-center" href="#">
//             <img 
//               src="https://images-platform.99static.com//5izzx5mICDKM8GVjq-fDbXrLqyU=/482x1354:1119x1991/fit-in/500x500/99designs-contests-attachments/124/124405/attachment_124405286" 
//               className="logo" 
//               alt="logo"
//             />
//             <span className="ms-2 fw-bold">Klavya</span>
//           </a>
//           <button className="navbar-toggler text-white" type="button" onClick={toggleMenu}>
//             {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//           <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                 <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>

//               <li className="nav-item"><Link to="/dashboard" className="nav-link">AdminLayout</Link></li>
//               <li className="nav-item"><Link to="/blogs" className="nav-link">Blogs</Link></li>
//                             <li className="nav-item"><Link to="/virtual" className="nav-link">Virtual Assisstance</Link></li>


//               <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>

//               <li className="nav-item"><Link to="/survey" className="nav-link">Survey</Link></li>
//               {userrole === "admin" ? (
//                 <Link className='nav-link' to="/dashboard">
//                   <button className='btn btn-primary me-3 text-white'>Dashboard</button>
//                 </Link>
//               ) : userrole === "user" ? (
//                 <Link className='nav-link' to="/userdashboard">
//                   <button className='btn btn-primary me-3'>Dashboard</button>
//                 </Link>
//               ) : null}


//               <Typewriter 
//                 texts={placeholders}  
//                 delay={100}           
//                 switchDelay={2000}    
//                 onUpdate={setTypewriterText} 
//               />

// <li className="nav-item d-flex align-items-center mt-2">
//   <div className="cart-icon-container">
//     <i className="fa-solid fa-cart-shopping mx-3 icon" onClick={() => handleAddToCart()}></i>
//     {/* Show cart count as a badge above the cart icon */}
//       <span className="cart-count-badge text-white">{cartCount}</span>
//   </div>

//   {username ? (
//     <div className="d-flex align-items-center">
//       <span className="user-circle">{username.charAt(0).toUpperCase()}</span>
//       <button className="btn btn-danger btn-sm ms-2" onClick={handleLogout}>Logout</button>
//     </div>
//   ) : (
//     <Link to="/login">
//       <i className="fa-solid fa-user icon"></i>
//     </Link>
//   )}
// </li>

//             </ul>
//           </div>
//         </div>
//       </nav>
//       <Outlet />
// <footer className="bg-dark text-white py-4 mt-5">
//   <div className="container">
//     <div className="row">
      
//       {/* About Us */}
//       <div className="col-lg-4 col-md-6 mb-4">
//         <h5 className="text-uppercase mb-3">About Us</h5>
//         <p>Providing the best services in town with customer satisfaction and quality assurance.</p>
//       </div>

//       {/* Quick Links */}
//       <div className="col-lg-4 col-md-6 mb-4">
//         <h5 className="text-uppercase mb-3">Quick Links</h5>
//         <ul className="list-unstyled">
//           <li><a href="/" className="text-white text-decoration-none">🏠 Home</a></li>
//           <li><a href="/services" className="text-white text-decoration-none">🛠 Services</a></li>
//           <li><a href="/contact" className="text-white text-decoration-none">📞 Contact</a></li>
//         </ul>
//       </div>

//       {/* Social Links & Policies */}
//       <div className="col-lg-4 col-md-6 mb-4">
//         <h5 className="text-uppercase mb-3">Follow Us</h5>
//         <ul className="list-unstyled d-flex gap-3 ps-0">
//           <li><a href="#" className="text-white fs-5"><i className="bi bi-facebook"></i></a></li>
//           <li><a href="#" className="text-white fs-5"><i className="bi bi-twitter"></i></a></li>
//           <li><a href="#" className="text-white fs-5"><i className="bi bi-instagram"></i></a></li>
//           <li><a href="https://linkedin.com/in/lavina-guglani-bb8750239" className="text-white fs-5"><i className="bi bi-linkedin"></i></a></li>
//         </ul>

//         <div className="mt-3">
//           <Link to="/privacy-policy" className="text-white text-decoration-none mx-2 text-white">Privacy Policy</Link> 
//           <Link to="/terms-and-conditions" className="text-white text-decoration-none mx-2">Terms & Conditions</Link>  
//           <Link to="/refund-policy" className="text-white text-decoration-none mx-2">Refund Policy</Link>
//         </div>
//       </div>
//     </div>

//     <hr className="bg-light" />
//     <div className="text-center">
//       <small>© {new Date().getFullYear()} Lavina's Admin Panel. All rights reserved.</small>
//     </div>
//   </div>
// </footer>
//     </>
//   );
// };

// export default Layout;
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Typewriter from "../Admin/Typewriter";
import "./Layout.css";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [userrole, setUserrole] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Update cart count
  useEffect(() => {
    const email = localStorage.getItem("EMAIL");
    if (email) {
      const savedCart =
        JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
      setCartCount(savedCart.length);
    }

    const handleStorageChange = () => {
      const email = localStorage.getItem("EMAIL");
      if (email) {
        const updatedCart =
          JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
        setCartCount(updatedCart.length);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [location]);

  // Load user info
  useEffect(() => {
    const storedUser = localStorage.getItem("Name");
    const storedRole = localStorage.getItem("Role");

    if (storedUser) {
      setUsername(storedUser);
      setUserrole(storedRole);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const placeholders = [
    "Search for facial...",
    "Search for cleaning...",
    "Search for hair treatment...",
    "Search for massage...",
  ];

  const handleAddToCart = () => {
    const email = localStorage.getItem("EMAIL");
    if (email) {
      navigate("/addtocart");
    } else {
      alert("Please login first");
      navigate("/login");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid d-flex align-items-center">
          
          {/* Logo */}
          <Link
            to="/"
            className="navbar-brand text-white d-flex align-items-center"
          >
            <img
              src="https://images-platform.99static.com//5izzx5mICDKM8GVjq-fDbXrLqyU=/482x1354:1119x1991/fit-in/500x500/99designs-contests-attachments/124/124405/attachment_124405286"
              className="logo"
              alt="logo"
            />
            <span className="ms-2 fw-bold">Klavya</span>
          </Link>

          <button
            className="navbar-toggler text-white"
            type="button"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/blogs" className="nav-link">
                  Blogs
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/virtual" className="nav-link">
                  Virtual Assistance
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/survey" className="nav-link">
                  Survey
                </Link>
              </li>

              {/* Dashboard Button */}
              {userrole === "admin" ? (
                <Link className="nav-link" to="/dashboard">
                  <button className="btn btn-primary me-3 text-white">
                    Dashboard
                  </button>
                </Link>
              ) : userrole === "user" ? (
                <Link className="nav-link" to="/userdashboard">
                  <button className="btn btn-primary me-3">
                    Dashboard
                  </button>
                </Link>
              ) : null}

              {/* Typewriter */}
              <Typewriter
                texts={placeholders}
                delay={100}
                switchDelay={2000}
              />

              {/* Cart & User */}
              <li className="nav-item d-flex align-items-center mt-2">
                <div className="cart-icon-container">
                  <i
                    className="fa-solid fa-cart-shopping mx-3 icon"
                    onClick={handleAddToCart}
                  ></i>
                  <span className="cart-count-badge text-white">
                    {cartCount}
                  </span>
                </div>

                {username ? (
                  <div className="d-flex align-items-center">
                    <span className="user-circle">
                      {username.charAt(0).toUpperCase()}
                    </span>
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login">
                    <i className="fa-solid fa-user icon"></i>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container">
          <div className="row">

            <div className="col-lg-4 col-md-6 mb-4">
              <h5 className="text-uppercase mb-3">About Us</h5>
              <p>
                Providing the best services in town with customer satisfaction
                and quality assurance.
              </p>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <h5 className="text-uppercase mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" className="text-white text-decoration-none">
                    🏠 Home
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-white text-decoration-none">
                    🛠 Services
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white text-decoration-none">
                    📞 Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <h5 className="text-uppercase mb-3">Follow Us</h5>
              <ul className="list-unstyled d-flex gap-3 ps-0">
                <li>
                  <a
                    href="https://facebook.com"
                    className="text-white fs-5"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    className="text-white fs-5"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bi bi-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    className="text-white fs-5"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                </li>
              </ul>

              <div className="mt-3">
                <Link to="/privacy-policy" className="text-white mx-2">
                  Privacy Policy
                </Link>
                <Link to="/terms-and-conditions" className="text-white mx-2">
                  Terms & Conditions
                </Link>
                <Link to="/refund-policy" className="text-white mx-2">
                  Refund Policy
                </Link>
              </div>
            </div>
          </div>

          <hr className="bg-light" />
          <div className="text-center">
            <small>
              © {new Date().getFullYear()} Lavina's Admin Panel. All rights
              reserved.
            </small>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;