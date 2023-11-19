import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed"]
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Cart", CartSchema);
