import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String,unique: true , required: true},
  username: { type: String, required: true, unique: true },
  profilepic: { type: String},
  coverpic: { type: String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || model("User", userSchema);