


const UserModel = require("../model/userModel");
const OrderModel = require("../model/OrderModel");
const SendAdminEmail = require("../utils/SendAdminEmail");
const SendUserEmail = require("../utils/SendUserEmail");

const placeorder = async (req, res) => {
  const { userId, cartItems, address, city, pincode, serviceDate, deliveryType } = req.body;

  if (!userId || !cartItems || cartItems.length === 0 || !serviceDate || !deliveryType) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

let calculatedTotalAmount = cartItems.reduce((total, item) => {
  const price = Number(item.price);
  const quantity = Number(item.quantity);

  const itemTotal = Number((price * quantity).toFixed(2)); // 👈 avoid float errors
  return total + itemTotal;
}, 0);

if (deliveryType === "Fast") {
  calculatedTotalAmount += 50;
}

calculatedTotalAmount = Math.round(calculatedTotalAmount); // ✅ Always round final amount


    let deliveryDays = deliveryType === "Fast" ? 2 : 4;
    const estimatedDeliveryDate = new Date(serviceDate);
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + deliveryDays);

    console.log("Service Date:", serviceDate);
    console.log("Estimated Delivery Date:", estimatedDeliveryDate);

    const order = new OrderModel({
      userId,
      cartItems,
      totalAmount: calculatedTotalAmount,
      city,
      address,
      pincode,
      serviceDate: new Date(serviceDate),
      deliveryType,
      deliveryStatus: "Pending",
      paymentStatus: "Pending",  // ✅ ADD THIS LINE

      deliveryDate: estimatedDeliveryDate, // ✅ SET DELIVERY DATE
    });

    await order.save();
    console.log("Order after saving:", order); // Check if deliveryDate is saved

    await SendAdminEmail(order, user.email);

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("userId");
    res.status(200).json({ message: "All orders", orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};
//admin
const getOrdersByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const orders = await OrderModel.find().populate("userId");
    const userOrders = orders.filter(order => order.userId?.email === email);
    res.status(200).json({ message: "User orders fetched", orders: userOrders });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Update payment status for an order
const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentId } = req.body;

    const order = await OrderModel.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentId = paymentId;
    order.paymentDate = new Date();
    order.paymentStatus = "Paid";

    await order.save();

    res.status(200).json({ message: "Payment updated", order });
  } catch (err) {
    res.status(500).json({ message: "Error updating payment", error: err });
  }
};


//admin updateorderstatus
const updateOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate("userId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure the necessary fields are provided
    if (!req.body.deliveryStatus) {
      return res.status(400).json({ message: "Delivery status is required" });
    }

    if (req.body.deliveryStatus) {
      order.deliveryStatus = req.body.deliveryStatus;

      if (["Approved", "Shipped"].includes(req.body.deliveryStatus)) {
        const serviceDate = new Date(order.serviceDate);
        const deliveryType = req.body.deliveryType || order.deliveryType;
        const deliveryDays = deliveryType === "Fast" ? 2 : 4;

        const deliveryDate = new Date(serviceDate);
        deliveryDate.setDate(serviceDate.getDate() + deliveryDays);
        order.deliveryDate = deliveryDate;
      } else {
        order.deliveryDate = null;
      }
    }

    if (req.body.deliveryType) {
      order.deliveryType = req.body.deliveryType;
    }

    await order.save();
    console.log("✅ Delivery Date saved:", order.deliveryDate);

    // Send email to the user if delivery status is updated
    if (order.userId?.email && req.body.deliveryStatus) {
      await SendUserEmail(order.userId.email, order._id, req.body.deliveryStatus);
    }

    res.status(200).json({ message: "Order updated successfully", updated: order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//user
const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.id;
    const orders = await OrderModel.find({ userId }).sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getUserOrderDetails = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await OrderModel.findById(orderId).populate("userId", 'name email').populate('cartItems');
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




//admin ki order details
const getOrderDetails = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await OrderModel.findById(orderId)
      .populate("userId", "name email")
      .populate("cartItems");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};







module.exports = { placeorder, getAllOrders, updateOrder, getOrdersByEmail,getUserOrders,updatePaymentStatus,getOrderDetails ,getUserOrderDetails};
