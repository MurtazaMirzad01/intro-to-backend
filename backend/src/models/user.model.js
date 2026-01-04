import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 3
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
