const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: false },
  email: { type: String, required: true, },
  userId:{type:String,required:true},
  description:{type:String,required:false},
  paymentIntent:{type:String,required:true},
  amount:{type:Number,required:true},
  ephemeralKey:{type:String,required:true},
  customer:{type:String,required:true},
  createdAt:{type:Date,default:Date.now()}
});

module.exports = mongoose.models.Payment || mongoose.model("Payment", userSchema)
