const Razorpay = require('razorpay');

// This will use the secret keys you add to Netlify's settings later
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// This is the main function Netlify will run
exports.handler = async (event, context) => {
    const options = {
        amount: 50000, // 500 INR in paise
        currency: "INR",
        receipt: `receipt_order_${new Date().getTime()}`
    };

    try {
        const order = await razorpay.orders.create(options);
        return {
            statusCode: 200,
            body: JSON.stringify(order)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to create order" })
        };
    }
};
