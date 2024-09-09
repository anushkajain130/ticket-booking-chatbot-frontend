import React from 'react'
import ticketIcon from '../assets/ticket.png'
import "../App.css"
const PayNowCard = ({handlePayment,username,email,phone,museum,shows,tickets}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h1 className="title">MUSEUM TICKET BOOKING</h1>
        <h2 className="sub-title">DETAILS</h2>
        <div className="details">
          <p className="detail">Name: <span className="value">{username}</span></p>
          <p className="detail">Email: <span className="value">{email}</span></p>
          <p className="detail">Phone: <span className="value">{phone}</span></p>
          <p className="detail">Museum: <span className="value">{museum}</span></p>
          <p className="detail">Shows: <span className="value">{shows}</span></p>
          <p className="detail">No of tickets: <span className="value">{tickets}</span></p>
          <p className="detail">Total amount: <span className="value">₹{tickets * 100}</span></p>
        </div>
        <button className="pay-button" onClick={handlePayment}>
          <img src={ticketIcon} alt="ticket-icon" className='button-icon'/>
          Pay Now
        </button>
      </div>
      </div>
  )
}

export default PayNowCard
