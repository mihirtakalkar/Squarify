// Transaction Page
'use client'
import React, { useState } from 'react';

const Transaction = () => {
  // State variables to store the values of the text fields
  const [price, setPrice] = useState('');
  const [payee, setPayee] = useState('');
  const [name, setName] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, such as sending it to a server
    console.log('Price:', price);
    console.log('Payee:', payee);
    console.log('Name:', name);
    // Reset the form fields
    setPrice('');
    setPayee('');
    setName('');
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Add Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              id="price"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="currency" className="sr-only">Currency</label>
              <select id="currency" name="currency" className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                <option>USD</option>
                <option>CAD</option>
                <option>EUR</option>
              </select>
            </div>
          </div>
        </div>
        {/* Payee */}
        <div className="mb-4 rounded-md shadow-sm">
          <label htmlFor="payee" className="block text-sm font-medium leading-6 text-gray-900">Payee</label>
          <input
            type="text"
            id="payee"
            className="form-input mt-1 block w-full rounded-md border-1 border-gray-300 shadow-sm"
            value={payee}
            onChange={(e) => setPayee(e.target.value)}
          />
        </div>
        {/* Name */}
        <div className="mb-4 rounded-md shadow-sm">
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <input
            type="text"
            id="name"
            className="form-input mt-1 block w-full rounded-md border-1 border-gray-300 shadow-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
};

export default Transaction;
