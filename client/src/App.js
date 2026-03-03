import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Layout from "./components/Layout";
import Services from "./components/Services";
import Profile from "./Pages/Profile";
import ViewBlog from "./Admin/ViewBlog";
import FrontendBlogs from "./Admin/FrontendBlogs";
import Viewsmallsubcategory from "./Admin/Viewsmallsubcategory";
import Addtocart from "./components/Addtocart";
import AdminLayout from "./Admin/AdminLayout";
import Dashboard from "./Admin/Dashboard";
import Enquiries from "./Admin/Enquiries";
import BlogForm from "./Admin/Blogs";
import GetBlogs from "./Admin/GetBlogs";
import CategoryForm from "./Admin/Categoryform";
import SubCategoryy from "./Admin/SubCategoryy";
import SmallsubcategoryForm from "./Admin/Smallsubcategory";
import Getcategoryform from "./Admin/Getcategoryform";
import Getsubcategoryform from "./Admin/Getsubcategory";
import Getsmallsubcategory from "./Admin/Getsmallsubcategory";
import Updateblog from "./Admin/Updateblog";
import UpdateCategoryForm from "./Admin/Updatecategory";
import UpdateSubcategoryForm from "./Admin/UpdateSubcategory";
import UpdateSubSmallCategoryForm from "./Admin/Updatesubsmallcategory";
import Getorders from "./Admin/Adminorders";
import UserDashboard from "./User/UserDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AboutUs from "./components/About";
import ContactUs from "./components/Contact";
import Surveyform from "./components/Surveyform";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import UserBlogs from "./components/UserBlogs";
import GetUserBlogs from "./components/Getuserblogs";
import ViewSlider from "./components/ViewSlider";
import MyOrders from "./components/Userorder";
import AdminOrderDetails from "./Admin/AdminOrderdetails";
import GetUserOrderDetails from "./components/GetUserOrderDetails";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/Termsandcondition";
import RefundPolicy from "./Pages/RefundPolicy";
import VirtualAssisstance from "./components/VirtualAssisstance";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #7db9e8 0%, #d0f0fd 50%, #ffc1cc 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}>
        <h1 style={{
          color: "#1e3a8a", // deep blue
          fontSize: "3.8rem",
          fontWeight: "700",
          margin: 0,
          textShadow: "1px 1px 4px #ffd700", // yellow glow
          letterSpacing: "1.8px"
        }}>
          Welcome to Klavya
        </h1>
        <p style={{
          color: "#d147a3", // pink
          fontSize: "1.6rem",
          marginTop: "12px",
          fontWeight: "600",
          fontStyle: "italic",
          textShadow: "0 0 6px #fff",
        }}>
          Smart Services, Simplified.
        </p>
        <div style={{
          marginTop: "40px",
          width: "55px",
          height: "55px",
          border: "5px solid #ffffff",
          borderTop: "5px solid #7db9e8", // light blue
          borderRadius: "50%",
          animation: "spin 1.2s linear infinite",
          boxShadow: "0 0 10px #ffc1cc" // subtle pink glow
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}</style>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/virtual" element={<VirtualAssisstance />} />


        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Services />} />
          <Route path="services" element={<Services />} />
          <Route path="profilepagee" element={<Profile />} />
          <Route path="blogs" element={<FrontendBlogs />} />
          <Route path="viewblog/:id" element={<ViewBlog />} />
          <Route path="viewsmallcategory/:categoryname/:subcategoryname" element={<Viewsmallsubcategory />} />
          <Route path="addtocart" element={<Addtocart />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="survey" element={<Surveyform />} />
          <Route path="category/:category" element={<ViewSlider />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/order/:orderId" element={<GetUserOrderDetails />} />
        </Route>

        <Route path="/dashboard" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="blogs" element={<BlogForm />} />
          <Route path="getblogs" element={<GetBlogs />} />
          <Route path="category" element={<CategoryForm />} />
          <Route path="getcategory" element={<Getcategoryform />} />
          <Route path="subcategory" element={<SubCategoryy />} />
          <Route path="getsubcategory" element={<Getsubcategoryform />} />
          <Route path="smallcategory" element={<SmallsubcategoryForm />} />
          <Route path="getsmallsubcategory" element={<Getsmallsubcategory />} />
          <Route path="updateblog/:id" element={<Updateblog />} />
          <Route path="updatecategory/:id" element={<UpdateCategoryForm />} />
          <Route path="updatesubcategory/:categoryId/:subcategoryId" element={<UpdateSubcategoryForm />} />
          <Route path="updatesmallsubcategory/:categoryId/:subcategoryId/:smallsubcategoryId" element={<UpdateSubSmallCategoryForm />} />
          <Route path="getpendingorders" element={<Getorders />} />
          <Route path="AdminOrderDetails/:orderId" element={<AdminOrderDetails />} />
        </Route>

        <Route path="/userdashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
        <Route path="/userblog" element={<UserBlogs />} />
        <Route path="/getuserblog" element={<GetUserBlogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
