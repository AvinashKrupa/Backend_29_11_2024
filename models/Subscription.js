import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  plan: { type: String, required: true },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
