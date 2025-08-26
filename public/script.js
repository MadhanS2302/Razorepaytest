document.getElementById('pay-button').onclick = async function (e) {
    e.preventDefault();
    const payButton = document.getElementById('pay-button');
    const paymentStatus = document.getElementById('payment-status');
    payButton.disabled = true;
    payButton.textContent = 'Please wait...';

    try {
        // This URL points to the serverless function we just created
        const response = await fetch('/.netlify/functions/create-order', {
            method: 'POST',
        });
        const order = await response.json();

        const options = {
            key: 'PASTE_YOUR_KEY_ID_HERE', // Your Test Key ID
            amount: order.amount,
            currency: order.currency,
            name: 'My Awesome Store',
            description: 'T-Shirt Purchase',
            order_id: order.id,
            handler: function (response) {
                paymentStatus.textContent = `Success! Payment ID: ${response.razorpay_payment_id}`;
                payButton.textContent = 'Payment Complete';
            },
            prefill: { name: 'Madhan Shanmugam', email: 'madhan@example.com', contact: '9999999999' },
            theme: { color: '#4f46e5' }
        };

        const rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            paymentStatus.textContent = `Payment Failed: ${response.error.description}`;
            payButton.disabled = false;
            payButton.textContent = 'Try Again';
        });
        rzp1.open();
    } catch (error) {
        paymentStatus.textContent = 'An error occurred. Please try again.';
        payButton.disabled = false;
        payButton.textContent = 'Pay Securely';
    }
};
