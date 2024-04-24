import mongoose, { Schema, models } from "mongoose";

const groupSchema = new Schema(
  {
    admin_email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    members: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Group = models.Group || mongoose.model("Group", groupSchema);
export default Group;
