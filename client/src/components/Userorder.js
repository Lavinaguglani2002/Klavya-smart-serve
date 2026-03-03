//   import React, { useEffect, useState } from "react";
//   import api from "../axios";
//   import { Link } from "react-router-dom";
//   import "bootstrap/dist/css/bootstrap.min.css";

//   const MyOrders = () => {
//     const [orders, setOrders] = useState([]);
//     const userId = localStorage.getItem("USER");

//     useEffect(() => {
//       const fetchOrders = async () => {
//         try {
//           const res = await api.get(`/getuserorders/${userId}`);
//           setOrders(res.data);
//         } catch (err) {
//           console.error("Failed to fetch orders", err);
//         }
//       };

//       if (userId) fetchOrders();
//     }, [userId]);

//     if (!orders.length) {
//       return (
//         <div className="text-center mt-5 text-muted fs-5">
//           You have no orders yet.
//         </div>
//       );
//     }

//     return (
//       <div className="container my-5">
//         <h2 className="text-center text-primary fw-bold mb-4">My Orders</h2>

//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="mb-4 p-4 rounded-4 shadow-sm"
//             style={{
//               background: "linear-gradient(to right, #f8f9fa, #ffffff)",
//               borderLeft: "5px solid #0d6efd",
//             }}
//           >
//             <div className="mb-2">
//               <h5 className="fw-bold text-dark">
//                 Order ID: <span className="text-muted">{order._id}</span>
//               </h5>
//             </div>

//             <div className="row mb-3">
//               <div className="col-md-4 mb-2"><strong>Status:</strong> <span className="badge bg-primary">{order.deliveryStatus}</span></div>
//               <div className="col-md-4 mb-2"><strong>Payment:</strong> <span className={`badge ${order.paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning text-dark'}`}>{order.paymentStatus}</span></div>
// <strong className="text-success">Total: ₹{Math.round(order.totalAmount)}</strong>

//               <div className="col-md-4 mb-2"><strong>Delivery Type:</strong> {order.deliveryType}</div>
//               <div className="col-md-4 mb-2"><strong>Charge:</strong> ₹{order.deliveryType === "Fast" ? 50 : 0}</div>
//               <div className="col-md-4 mb-2"><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</div>
//             </div>

//             <div>
//               <strong className="text-secondary">Items:</strong>
//               <ul className="list-unstyled ps-3 mt-2">
//                 {order.cartItems.map((item, idx) => (

//   <li key={idx}>
//     {item.name} (x{item.quantity}) – 
//     <strong className="text-success">₹{item.price}</strong> <span className="text-muted">(total)</span>

// <span>₹{(item.price * item.quantity).toFixed(2)}</span>

//   </li>

//                 ))}
//               </ul>
//             </div>

//             <div className="mt-3 text-end">
//     <Link
//       to={`/order/${order._id}`} // Ensure order._id exists and is a valid value
//       className="btn btn-sm btn-outline-primary rounded-pill px-4"
//     >
//       View Details
//     </Link>
//   </div>

//           </div>
//         ))}
//       </div>
//     );
//   };

//   export default MyOrders;

import React, { useEffect, useState } from "react";
import api from "../axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("USER");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get(`/getuserorders/${userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    if (userId) fetchOrders();
  }, [userId]);

  if (!orders.length) {
    return (
      <div className="text-center mt-5 text-muted fs-5">
        You have no orders yet.
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center text-primary fw-bold mb-4">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="mb-4 p-4 rounded-4 shadow-sm"
          style={{
            background: "linear-gradient(to right, #f8f9fa, #ffffff)",
            borderLeft: "5px solid #0d6efd",
          }}
        >
          {/* Order ID */}
          <div className="mb-3">
            <h5 className="fw-bold text-dark">
              Order ID: <span className="text-muted">{order._id}</span>
            </h5>
          </div>

          {/* Order Details */}
          <div className="row mb-3">

            <div className="col-md-4 mb-2">
              <strong>Status:</strong>{" "}
              <span className="badge bg-primary">
                {order.deliveryStatus}
              </span>
            </div>

            <div className="col-md-4 mb-2">
              <strong>Payment:</strong>{" "}
              <span
                className={`badge ${
                  order.paymentStatus === "Paid"
                    ? "bg-success"
                    : "bg-warning text-dark"
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>

            <div className="col-md-4 mb-2">
              <strong>Total:</strong>{" "}
              <span className="text-success fw-bold">
                ₹{Math.round(order.totalAmount)}
              </span>
            </div>

            <div className="col-md-4 mb-2">
              <strong>Delivery Type:</strong> {order.deliveryType}
            </div>

            <div className="col-md-4 mb-2">
              <strong>Charge:</strong>{" "}
              ₹{order.deliveryType === "Fast" ? 50 : 0}
            </div>

            <div className="col-md-4 mb-2">
              <strong>Date:</strong>{" "}
              {new Date(order.orderDate).toLocaleString()}
            </div>

          </div>

          {/* Items */}
          <div>
            <strong className="text-secondary">Items:</strong>

            <ul className="list-unstyled ps-3 mt-2">
              {order.cartItems.map((item, idx) => (
                <li key={idx} className="mb-1">
                  {item.name} (x{item.quantity}) –{" "}
                  <strong className="text-success">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </strong>
                </li>
              ))}
            </ul>
          </div>

          {/* View Details Button */}
          <div className="mt-3 text-end">
            <Link
              to={`/order/${order._id}`}
              className="btn btn-sm btn-outline-primary rounded-pill px-4"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;