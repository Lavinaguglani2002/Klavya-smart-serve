import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const user = localStorage.getItem("USER");
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;




// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children, allowedRole }) => {
//   const user = localStorage.getItem("USER");
//   const role = localStorage.getItem("Role");
//   console.log("PrivateRoute → USER:", user);
//   console.log("PrivateRoute → ROLE:", role);
//   console.log("PrivateRoute → ALLOWED ROLE:", allowedRole);


//   // If user is not logged in
//   if (!user) return <Navigate to="/login" />;

//   // If allowedRole is provided, check for match
//   if (allowedRole && role !== allowedRole) {
//     alert("Access Denied: Unauthorized Role");
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default PrivateRoute;
