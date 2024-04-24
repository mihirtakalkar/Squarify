import mongoose, { Schema, models } from "mongoose";

const paymentSchema = new Schema(
  {
    group_name: {
        type: String, 
        required: true
    },
    payer: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    description:
      {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const Payment = models.Payment || mongoose.model("Payment", paymentSchema);
export default Payment;
