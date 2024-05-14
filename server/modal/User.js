// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  cleaningHistory: { type: Array, default: [] },
  nextCleaning: { type: Object, default: {} },
  previousCleaning: { type: Object, default: {} },
  cleanings: { type: Array, default: [] },
  payments: { type: Boolean, default: false },
  plan: { type: Array, default: [] },
  isBlock: { type: Boolean, default: false },
  planEndDate: { type: Date, default: null },
  planStartDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema)
