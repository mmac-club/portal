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
      type: Date
    },
    planEndDate: {
      type: Date
    },
    planPrice: {
      type: Number
    },
    payerEmail: {
      type: String
    },
    payerFullName: {
      type: String
    },
    payerBillingAddress: {
      type: Object
    }
  },
  { timestamps: true }
);

export default mongoose.model("payment", PaymentSchema);
