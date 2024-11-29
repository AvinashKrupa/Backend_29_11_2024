import mongoose from "mongoose";
import dotenv from "dotenv";
import Subscription from "./models/Subscription.js";

dotenv.config();

mongoose
  .connect(process.env.MONGDB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const expiryDate = new Date(Date.now() + 60 * 2000); // Expiring in 2 minute
    const testSubscription = new Subscription({
      userId: "12345",
      expiryDate,
      plan: "Premium",
    });

    await testSubscription.save();
    console.log("Test subscription added.");
    mongoose.connection.close();
  })
  .catch((err) => console.error("Database connection error:", err));
