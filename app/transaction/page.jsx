// Transaction Page
'use client'

import { useSession } from 'next-auth/react';
import React, { useState, useCallback, useEffect} from 'react';

const TransactionPage = () => {
  // State variables to store the values of the text fields
  const { status, data: session } = useSession();
  const [price, setPrice] = useState('');
  const [payee, setPayee] = useState('');
  const [name, setName] = useState('');
  const [userGroups, setUserGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');

  const fetchUserGroups = useCallback(async () => {
    try {
      if (session) {
        const response = await fetch(`http://localhost:3000/api/group?admin_email=${encodeURIComponent(session?.user?.email)}`, {
          method: 'GET',
        });
        if (response.ok) {
          const groupsData = await response.json();
          setUserGroups(groupsData.groups);
        } else {
          console.error('Failed to fetch user groups.');
        }
      }
    } catch (error) {
      console.error('Error fetching user groups:', error);
    }
  }, [session]);
  

  useEffect(() => {
    fetchUserGroups();
  }, [session, fetchUserGroups]);
  
  useEffect(() => {
    if (session) {
      fetchUserGroups();
    }
  }, [session, fetchUserGroups]);
  
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { group_name: selectedGroup, payer: session?.user?.email, amount: price, description: name };
    console.log('payer ', session?.user?.email);
    console.log("amount ", price);
    console.log("description", name );

    try {
        const response = await fetch('http://localhost:3000/api/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log('Transaction succeeded!');
            // console.log(toast);
            //notifySuccess();
            // toast.success('Group created successfully!', { position: toast.POSITION.TOP_CENTER });
        } else {
            console.error('Failed to initiate payment.');
            //notifyFailure();
        }
    } catch (error) {
        console.error('Error:', error);
        //notifyError();
    }
};

  return (
    <div>
      <h1 className="text-2xl mb-4">Add Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="group" className="block text-sm font-medium leading-6 text-gray-900">
            Select Group
          </label>
          <select
            id="group"
            className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="">Select a group</option>
            {userGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
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

export default TransactionPage;
