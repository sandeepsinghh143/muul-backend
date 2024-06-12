const mongoose = require("mongoose");
const { Schema } = mongoose;

const salesSchema = new Schema({
  product: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Sale = mongoose.model("Sale", salesSchema);
module.exports = Sale;
