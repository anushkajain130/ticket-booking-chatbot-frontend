// App.js
import React, {useEffect} from 'react';
import './App.css'; // Importing CSS for styling
import ticketIcon from './assets/ticket.png'; 
// import { Carousel } from "antd";
import { useState } from 'react';
import image1 from "./assets/elizabeth-george-E_evIcvACS8-unsplash.jpg"
import image2 from "./assets/alicia-steels-PA2rnR4pF9A-unsplash.jpg"
import image3 from "./assets/girl-with-red-hat-raHqU5xaGng-unsplash.jpg"
import image4 from "./assets/robin-schreiner-YKE4zTW5lic-unsplash.jpg"
// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-fade';
// import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { EffectCreative , Pagination, Autoplay } from 'swiper/modules';

const App = () => {

// carousel



  // const [user, setUser] = useState({});


  const value = JSON.parse(window.localStorage.getItem("botpress-webchat"))


  // console.log(value.state.messageHistory[userId]);



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

let user = {};



const handlePayment = async () => {
  try {
    // Step 1: Fetch user details from the backend


    const userId = value.state.user.userId;

    // console.log(value.state.messageHistory[userId]);


    const curremail = value.state.messageHistory[userId][3];

    console.log('Current email:', curremail); 

 
    const userUrl = `https://ticket-booking-chatbot-chi.vercel.app/user/getuser?email=${curremail}`;
    
    const userResponse = await fetch(userUrl);
    
    if (!userResponse.ok) {
      throw new Error(`Error fetching user details: ${userResponse.statusText}`);
    }

    user = await userResponse.json();
    console.log('User details:', user.users);

  

    // Step 2: Create an order by calling the payment endpoint
    const paymentResponse = await fetch('https://ticket-booking-chatbot-chi.vercel.app/payment/booktickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        museum: user.users.museum,
        shows: user.users.shows,
        tickets: user.users.nooftickets,
        details: {
          name: user.users.name,
          email: user.users.email,
          phone: `+91${user.users.phone}`,
        },
      }),
    });

    console.log(paymentResponse);

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
            museum: user.users.museum, // Replace with actual values //user.museum
            shows: user.users.shows, // Replace with actual values // user.shows
            tickets: user.users.nooftickets, //user.nooftickets
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
        name:user.users.name, //user.name
        email: user.users.email, //user.email
        contact:`+91${user.users.phone}`,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  // let bookingAcepted = false;
  // let bookingAcepted = false;
  return (


    <div className="app-container">
  
    
      <div className="modal-overlay"></div> {/* Background overlay */}
      <div className="modal-container">
        <h1 className="title">Museum Ticket Booking</h1>
        <button className="pay-button" onClick={handlePayment}>
          <img src={ticketIcon} alt="ticket-icon" className='button-icon'/>
          Pay Now
        </button>
      </div>
    
    
    </div>
  );
};

export default App;
