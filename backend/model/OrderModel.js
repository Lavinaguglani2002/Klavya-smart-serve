


//   const mongoose=require("mongoose")

// const orderSchema=new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//       },
//       cartItems:[
//         {
//             name:{
//                 type:String,
//                 required:true
//             },
//             image:{
//                 type:String,
//                 required:true
//             },
//             price:{
//                 type:Number,
//                 required:true
//             },
//             quantity:{
//                 type:Number,
//                 required:true
//             },
//             category:{
//                 type:String,
//                 required:false
//             },

//         }
//       ],
//       totalAmount:{
//         type:Number,
//         required:true
//       },
//       address:String,
//       city:String,
//       pincode:String,
//             serviceDate:{
//         type:Date,
//       },
//       paymentStatus:{
//         type:String,
//         enum:["Pending","Paid","Failed"],
//         default:"Pending"

//       },
//       deliveryType:{
//         type:String
// ,
// enum:["Fast","Slow"],
// required:true},      
// deliveryDate:{
//   type:Date
// },
//       deliveryStatus:{
//         type:String,
//         enum:["Pending","Shipped","Delivered","Rejected","Cancelled"],
//         default:"Pending"
//       },
//       orderDate:{
//         type:Date,
//         default:Date.now
//       },
//         paymentId: {
//           type: String,
//           default: null,
//         },
//         paymentStatus: {
//           type: String,
//           enum: ["Pending", "Paid", "Failed"],
//           default: "Pending",
//         },
//         paymentDate: {
//           type: Date,
//           default: null,
//         },
        
// })

// const OrderModel=mongoose.model("Order",orderSchema)
// module.exports=OrderModel;

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  cartItems: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
      },
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  address: String,
  city: String,
  pincode: String,

  serviceDate: {
    type: Date,
  },

  deliveryType: {
    type: String,
    enum: ["Fast", "Slow"],
    required: true,
  },

  deliveryDate: {
    type: Date,
  },

  deliveryStatus: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Rejected", "Cancelled"],
    default: "Pending",
  },

  orderDate: {
    type: Date,
    default: Date.now,
  },

  paymentId: {
    type: String,
    default: null,
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },

  paymentDate: {
    type: Date,
    default: null,
  },
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;