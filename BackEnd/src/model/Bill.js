import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    bill_code: { type: String },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    totalPrice: { type: Number },
    orderNotes: { type: String, default: "Khách hàng không viết gì" },
    products: [ 
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Rejected", "Delivering", "Delivered"],
      default: "Pending",
    },
    bill_name:{
      type: String,
    },
    bill_address:{
      type:String
    },
    bill_phone:{
      type:String
    }
    
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Bill", billSchema);
