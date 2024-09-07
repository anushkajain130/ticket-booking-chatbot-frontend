// App.js
import React from 'react';
import './App.css'; // Importing CSS for styling

import { useState } from 'react';

const App = () => {

  // const [user, setUser] = useState({});


  const value = JSON.parse(window.localStorage.getItem("botpress-webchat"))

  // console.log(value.state.user.userId);



//  const getdata = async ()=>{
//   try{
//     const url = new URL('https://ticket-booking-chatbot-chi.vercel.app/user/getuser');
//     url.searchParams.append('userid', value.state.user.userId);
//     const res= await fetch(
//         url.toString()
//     )

//     console.log(res);

//     const userdata = await res.json();

//     console.log(userdata)


//       setUser(userdata)

//   }
//   catch (error) {
//     console.error('Error:', error);
//     alert('Failed to get user');
//   }
//  }



const handlePayment = async () => {
  try {
    // Step 1: Fetch user details from the backend
    const userId = value.state.user.userId;
    const userUrl = `https://ticket-booking-chatbot-chi.vercel.app/user/getuser?userid=${userId}`;
    
    const userResponse = await fetch(userUrl);
    
    if (!userResponse.ok) {
      throw new Error(`Error fetching user details: ${userResponse.statusText}`);
    }

    const user = await userResponse.json();
    console.log('User details:', user);

    // Step 2: Create an order by calling the payment endpoint
    const paymentResponse = await fetch('https://ticket-booking-chatbot-chi.vercel.app/payment/booktickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        museum: user.museum,
        shows: user.shows,
        tickets: user.nooftickets,
        details: {
          name: user.name,
          email: user.email,
          phone: `+91${user.phone}`,
        },
      }),
    });

    if (!paymentResponse.ok) {
      throw new Error(`Error creating order: ${paymentResponse.statusText}`);
    }

    const paymentData = await paymentResponse.json();

    // Step 3: Handle payment initiation
    if (paymentData.status === 'success') {
      initiatePayment(paymentData.order_id, paymentData.amount, paymentData.key_id);
    } else {
      alert('Error creating order');
    }
  } catch (error) {
    console.error('Payment error:', error);
    alert(`Failed to process payment: ${error.message}`);
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
        fetch('https://ticket-booking-chatbot-chi.vercel.app/payment/confirm-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            museum: user.museum, // Replace with actual values //user.museum
            shows: user.shows, // Replace with actual values // user.shows
            tickets: user.nooftickets, //user.nooftickets
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
        name:user.name, //user.name
        email: user.email, //user.email
        contact:`+91${user.phone}`,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="app-container">
      <h1 className="title">Museum Ticket Booking</h1>
      <button className="pay-button" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default App;
