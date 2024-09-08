// App.js
import React from 'react';
import './App.css'; // Importing CSS for styling
import ticketIcon from './assets/ticket.png'; // Importing ticket icon

const App = () => {
  const handlePayment = async () => {
    try {
      // Step 1: Create an order by calling your backend
      const response = await fetch('http://localhost:4000/payment/booktickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          museum: 'Science City', // Replace with actual values
          shows: ['Rosetta Stone Display'], // Replace with actual values
          tickets: 10, // Replace with the number of tickets
          details: {
            name: 'Anmol',
            email: 'anmolsoni5304@gmail.com',
            phone: '+917000631540',
          },
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        initiatePayment(data.order_id, data.amount, data.key_id); // Use the order details from your backend
      } else {
        alert('Error creating order');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create order');
    }
  };

  const initiatePayment = (orderId, amount, key) => {
    const options = {
      key: key,
      amount: amount,
      currency: 'INR',
      name: 'Your Company',
      description: 'Museum Ticket Booking',
      order_id: orderId,
      handler: function (response) {
        alert('Payment Successful!');
        // Send payment details back to the server
        fetch('http://localhost:4000/payment/confirm-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            museum: 'Science City', // Replace with actual values
            shows: ['Rosetta Stone Display'], // Replace with actual values
            tickets: 10,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('Server response:', data);
            if (data.status === 'success') {
              alert('Tickets booked successfully!');
            } else {
              alert('Payment confirmation failed!');
            }
          })
          .catch((error) => {
            console.error('Error confirming payment:', error);
            alert('Error confirming payment');
          });
      },
      prefill: {
        name: 'Anmol',
        email: 'anmolsoni5304@gmail.com',
        contact: '+917000631540',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  let bookingAcepted = true;
  // let bookingAcepted = false;
  return (
    <div className="app-container">
       {bookingAcepted && (
    <>
      <div className="modal-overlay"></div> {/* Background overlay */}
      <div className="modal-container">
        <h1 className="title">Museum Ticket Booking</h1>
        <button className="pay-button" onClick={handlePayment}>
          <img src={ticketIcon} alt="ticket-icon" className='button-icon'/>
          Pay Now
        </button>
      </div>
    </>
  )}     
    </div>
  );
};

export default App;
