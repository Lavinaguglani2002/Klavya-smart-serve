const twilio = require('twilio');
const sendSMSNotification = async (order) => {
  
    const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


  const messageBody = `🛒 New Order Placed\nService Date: ${order.serviceDate}\nTotal: ₹${order.totalAmount}`;

  await client.messages.create({
    body: messageBody,
    from: process.env.TWILIO_PHONE,   // Twilio sender number
    to: process.env.ADMIN_PHONE       // Admin receiver number
  });

  console.log("SMS sent to admin!");
  console.log("SID:", process.env.TWILIO_ACCOUNT_SID);
  console.log("TOKEN:", process.env.TWILIO_AUTH_TOKEN);

};


module.exports = sendSMSNotification;
