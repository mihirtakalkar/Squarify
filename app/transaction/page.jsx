// Transaction Page
"use client";

import { useSession } from "next-auth/react";
import React, { useState, useCallback, useEffect } from "react";

const TransactionPage = () => {
  // State variables to store the values of the text fields
  const { status, data: session } = useSession();
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [userGroups, setUserGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groupDetails, setGroupDetails] = useState(null);
  const [memberSplits, setMemberSplits] = useState({});
  const showSplitButton = selectedGroup && price > 0;

  const handleMemberSplitChange = (event, email) => {
    const { value } = event.target;
    setMemberSplits((prevSplits) => ({
      ...prevSplits,
      [email]: Number(value),
    }));
  };

  const handleSplitEvenly = () => {
    if (!groupDetails || groupDetails.members.length === 0) {
      console.error("No group selected or group has no members.");
      return;
    }

    const totalAmount = parseFloat(price);
    if (isNaN(totalAmount)) {
      console.error("Invalid total amount.");
      return;
    }

    const splitAmount = totalAmount / groupDetails.members.length;
    const newSplits = groupDetails.members.reduce((acc, memberEmail) => {
      acc[memberEmail] = splitAmount; // Set even split for each member
      return acc;
    }, {});

    setMemberSplits(newSplits);
  };

  const fetchUserGroups = useCallback(async () => {
    if (!session?.user?.email) {
      console.error("No session or user email available.");
      return;
    }

    try {
      const url = `http://localhost:3000/api/group?admin_email=${encodeURIComponent(
        session.user.email
      )}`;
      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        const groupsData = await response.json();
        setUserGroups(groupsData.groups);
      } else {
        console.error(
          "Failed to fetch user groups: HTTP status",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching user groups:", error);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchUserGroups();
    }
  }, [session, fetchUserGroups]);

  const handleGroupChange = (e) => {
    const groupId = e.target.value;
    setSelectedGroup(groupId);

    const group = userGroups.find((g) => g._id === groupId);
    setGroupDetails(group);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const membersData = groupDetails.members.map((email) => ({
      email,
      splitAmount: memberSplits[email] || 0, // Default to 0 if not specified
    }));

    const selectedGroupData = userGroups.find(
      (group) => group._id === selectedGroup
    );

    const data = {
      group_name: selectedGroupData,
      payer: session?.user?.email,
      members: membersData,
      amount: price,
      description: description,
    };

    try {
      const response = await fetch("http://localhost:3000/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Transaction succeeded!");
        // Further success handling
      } else {
        console.error("Failed to initiate payment.");
        // Error handling
      }
    } catch (error) {
      console.error("Error:", error);
      // Error handling
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Add Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="group"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Select Group
          </label>
          <div>
            <select
              id="group"
              className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={selectedGroup}
              onChange={handleGroupChange}
            >
              <option value="">Select a group</option>
              {userGroups.map((group) => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Price
          </label>
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
          {groupDetails &&
            groupDetails.members.map((memberEmail, index) => (
              <div key={index} className="mb-4">
                <label
                  htmlFor={`member-email-${index}`}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Member: {memberEmail}
                </label>
                <label
                  htmlFor={`member-split-${index}`}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount ($)
                </label>
                <input
                  type="number"
                  id={`member-split-${index}`}
                  value={memberSplits[memberEmail] || ""}
                  placeholder="Enter amount"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => handleMemberSplitChange(e, memberEmail)}
                />
              </div>
            ))}
        </div>
        {showSplitButton && (
          <button
            type="button" // Ensure this does not submit the form
            onClick={handleSplitEvenly}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
          >
            Split Evenly
          </button>
        )}
        {/* Description */}
        <div className="mb-4 rounded-md shadow-sm">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="form-input mt-1 block w-full rounded-md border-1 border-gray-300 shadow-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TransactionPage;
