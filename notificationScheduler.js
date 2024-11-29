// import cron from "node-cron";
// import Subscription from "./models/Subscription.js";
// import Notification from "./models/Notification.js";

// async function checkExpiringSubscriptions() {
//   console.log("Checking for plans expiring in the next minute...");

//   const now = new Date();
//   const oneMinuteFromNow = new Date(now.getTime() + 1 * 60 * 1000); // Add 1 minute
//   console.log("Checking between:", now, "and", oneMinuteFromNow);
  
//   try {
//     // Query the subscriptions expiring in the next minute
//     const expiringSubscriptions = await Subscription.find({
//       expiryDate: {
//         $gte: now, // Greater than or equal to the current time
//         $lte: oneMinuteFromNow, // Less than or equal to one minute from now
//       },
//     });
//     console.log("Expiring subscriptions:", expiringSubscriptions);

//     if (expiringSubscriptions.length === 0) {
//       console.log("No subscriptions expiring in the next minute.");
//     }

//     for (const subscription of expiringSubscriptions) {
//       const notification = new Notification({
//         userId: subscription.userId,
//         message: `Your subscription is about to expire at ${subscription.expiryDate.toISOString()}. Please renew.`,
//       });

//       await notification.save();
//       console.log(`Notification sent to user ${notification}`);
//     }
//   } catch (error) {
//     console.error("Error processing subscriptions:", error);
//   }
// }

// // Schedule the function to run every minute
// cron.schedule("* * * * *", checkExpiringSubscriptions);
