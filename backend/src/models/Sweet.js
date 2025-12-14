import mongoose from "mongoose";

const sweetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: String,
    price: Number,
    quantity: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Sweet", sweetSchema);