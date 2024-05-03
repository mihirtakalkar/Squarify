import React from 'react';

const PayButton = ({ email, groupID, onPay }) => {
  const handleClick = () => {
    // Call the onPay function with the email and groupID when the button is clicked
    onPay(email, groupID);
  };

  return (
    <button 
      onClick={handleClick} 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
      style={{ fontSize: '0.8rem' }} // Adjust the font size to make the button smaller
    >
      Paid
    </button>
  );
};

export default PayButton;
