import mongoose from "mongoose";
const { Schema } = mongoose;

const PaymentSchema = new mongoose.Schema(
  { 
    uid: {
        type: String,
        required: true
    },
    paypal_payer_id: {
      type: String,
    },
    transactionId: {
        type: String,
        default: null
    },
    transactionStatus: {
        type: String,
        default: null
    },
    planFor: {
      type:String
    },
    planType: {
      type: String
    },
    planStartDate: {
      type: String
    },
    planEndDate: {
      type: String
    },
    planCharge: {
      type: Number
    },
    userEmail: {
      type: String
    },
    payerFullName: {
      type: String
    },
    userBillingAddress: {
      type: Object
    }
  },
  { timestamps: true }
);

export default mongoose.model("payment", PaymentSchema);
