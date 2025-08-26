const express = require('express');
const Razorpay = require('razorpay');
const path = require('path');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allows your frontend to talk to this server
app.use(express.json()); // Parses incoming JSON requests
app.use(express.static(path.join(__dirname, 'public'))); // Serves your frontend files

// Initialize Razorpay instance
// Replace with your actual Test Key ID and Key Secret
const razorpay = new Razorpay({
    key_id: 'rzp_test_R9s2JfWDP6FAjl',
    key_secret: 'LKDQgZ8T7z95WjCFXR3y76r0'
});

// Route to create a payment order
app.post('/create-order', async (req, res) => {
    const options = {
        amount: 50000, // Amount in paise (500 INR * 100)
        currency: "INR",
        receipt: `receipt_order_${new Date().getTime()}`
    };

    try {
        const order = await razorpay.orders.create(options);
        console.log("Order created successfully:", order);
        res.json(order); // Send the order details to the frontend
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send("Error creating order");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
