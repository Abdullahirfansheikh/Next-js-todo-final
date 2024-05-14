// @ts-nocheck
import React from 'react'
import { useState } from 'react';
const PaymentCard = ({ title, description,date }) => {
    const [cards, setCards] = useState([]);
    return (
        <div className="p-4 border rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Make Payment</h2>
        <div className="mb-4">
          <label htmlFor="card" className="block mb-2">Select Card:</label>
          <select
            id="card"
            className="w-full px-4 py-2 border rounded-md"
            // value={selectedCard}
            // onChange={(e) => setSelectedCard(e.target.value)}
          >
            <option value="">Select a card</option>
            {cards.map((card, index) => (
              <option key={index} value={card}>{card}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block mb-2">Amount:</label>
          <input
            id="amount"
            type="number"
            className="w-full px-4 py-2 border rounded-md"
            // value={amount}
            // onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="flex gap-5">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            // onClick={handleAddCard}
          >
            Add Card
          </button>
        
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            // onClick={handleSendAmount}
            // disabled={!selectedCard || !amount}
          >
            Send Amount
          </button>
        </div>
      </div>
    
    );
  };

export default PaymentCard