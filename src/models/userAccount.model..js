import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: function () {
        return this.roles !== "admin"; 
      },
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: function () {
        return this.roles !== "admin"; 
      },
    },
    roles: {
      type: String,
      enum: ["admin", "sub-admin", "customer"],
      default: "customer",
    },
    status: {
      type: Boolean,
      default: true,
    },
    privacy: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
