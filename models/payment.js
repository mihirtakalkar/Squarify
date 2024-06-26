import mongoose, { Schema, models } from "mongoose";

const paymentSchema = new Schema(
  {
    group_name: {
      type: String,
      required: true,
    },
    payer: {
      type: String,
      required: true,
    },
    members: [
      {
        email: {
          type: String,
          required: true,
        },
        splitAmount: {
          type: Number,
          default: 0,
        }, paid: {
          type: Boolean,
          default: false,
        }
      },
    ],
    amount: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    lat: {
      type: String,
      required: true,
    },
    long: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Payment = models.Payment || mongoose.model("Payment", paymentSchema);
export default Payment;
