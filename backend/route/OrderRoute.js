const express=require("express")
const router=express.Router()
const {placeorder, getOrdersByEmail, getAllOrders, updateOrder, updatePaymentStatus, getUserOrders, getOrderById, getOrderDetails, getUserOrderDetails} = require("../controllers/OrderController");



router.post("/api/orders",placeorder)
router.get("/api/getuserorders/:id",getUserOrders)
router.get("/api/orderdetails/:orderId", getUserOrderDetails);

//admin
router.get("/api/getorders",getAllOrders)
router.put("/api/updateorder/:id",updateOrder)
router.get("/api/ordersbyemail/:email",getOrdersByEmail);
router.get('/api/adminorderdetails/:orderId',getOrderDetails);

router.put('/api/updatepayment/:orderId', updatePaymentStatus);
//adminorderdetails

  


module.exports=router