import mongoose from "mongoose";
const { Schema } = mongoose;

const PaymentSchema = new mongoose.Schema(
  { 
    userId: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        default: null
    },
    transactionStatus: {
        type: String,
        default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("payment", PaymentSchema);
