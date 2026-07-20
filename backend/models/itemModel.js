import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({
  type: { type: String, enum: ["lost", "found"], required: true },
  title: { type: String, required: true, trim: true, maxlength: 120 },
  category: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true, maxlength: 160 },
  date: { type: Date, required: true },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  status: { type: String, enum: ["active", "claimed", "recovered"], default: "active" },
  reporter: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Item", itemSchema);
