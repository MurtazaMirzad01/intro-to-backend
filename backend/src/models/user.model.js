import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});
//compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema);

