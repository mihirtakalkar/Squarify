// Transaction Page
"use client";

import LocationSearchInput from "@/components/LocationInput";
import { useSession } from "next-auth/react";
import React, { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransactionPage = () => {
  // State variables to store the values of the text fields
  const { status, data: session } = useSession();
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [userGroups, setUserGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groupDetails, setGroupDetails] = useState(null);
  const [memberSplits, setMemberSplits] = useState({});
  const [locationData, setLocation] = useState("");
  const [latData, setLat] = useState("");
  const [longData, setLong] = useState("");
  const showSplitButton = selectedGroup && price > 0;
  const notifySuccess1 = () => toast.success("Found groups!");
  const notifyFailure1 = () => toast("Failed to fetch groups.");
  const notifyError1 = () => toast('An error occurred while fetching the group.');
  const notifySuccess2 = () => toast.success("Transaction saved!");
  const notifyFailure2 = () => toast("Failed to save transaction!");
  const notifyError2 = () => toast('An error occurred while saving the transaction.');

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
        //notifySuccess1();
      } else {
        console.error(
          "Failed to fetch user groups: HTTP status",
          response.status
        );
        notifyFailure1();
      }
    } catch (error) {
      console.error("Error fetching user groups:", error);
      notifyError1();
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchUserGroups();
    }
  }, [session, fetchUserGroups]);

  const handleGroupChange = (newValue) => {
    const groupId = newValue;
    setSelectedGroup(groupId);

    const group = userGroups.find((g) => g._id === groupId);
    setGroupDetails(group);
  };

  const handleLocationSelect = (locationData) => {
    setLocation(locationData.address);
    setLat(locationData.lat.toString()); // Convert to string if necessary
    setLong(locationData.lng.toString()); // Convert to string if necessary
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const membersData = groupDetails.members.map((email) => ({
      email,
      splitAmount: memberSplits[email] || 0, // Default to 0 if not specified
      // paid: false,
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
      location: locationData,
      lat: latData,
      long: longData,
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
        notifySuccess2();
      } else {
        console.error("Failed to initiate payment.");
        // Error handling
        notifyFailure2();
      }
    } catch (error) {
      console.error("Error:", error);
      // Error handling
      notifyError2();
    }
  };

  return (
    <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="mt-20 max-w-3xl mx-auto">
        <div>
          <h2 className="p-10 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl text-center">
            Add Transaction
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h1>Select Group</h1>
              <div>
                {/* <select
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
                </select> */}
                <Select
                  value={selectedGroup}
                  onValueChange={handleGroupChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {userGroups.map((group) => (
                        <SelectItem key={group._id} value={group._id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <h1 className="pt-0.5">Price</h1>
              <div className="relative mt-2 rounded-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <Input
                  type="text"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20ring-1  placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                />
              </div>
              {groupDetails &&
                groupDetails.members.map((memberEmail, index) => (
                  <div key={index} className="mb-4 mt-2">
                    <label htmlFor={`member-email-${index}`}>
                      Member: {memberEmail}
                    </label>
                    <Input
                      type="number"
                      id={`member-split-${index}`}
                      value={memberSplits[memberEmail] || ""}
                      placeholder="Enter amount"
                      // className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => handleMemberSplitChange(e, memberEmail)}
                    />
                  </div>
                ))}
            </div>
            {showSplitButton && (
              <Button
                type="button" // Ensure this does not submit the form
                onClick={handleSplitEvenly}
                className="mt-2 px-4 py-2 rounded-md shadow hover:bg-blue-600"
              >
                Split Evenly
              </Button>
            )}
            {/* Description */}
            <div className="mb-4 rounded-md shadow-sm">
              <h1>Description</h1>
              <Input
                type="text"
                id="description"
                placeholder="Enter description"
                // className="form-input mt-1 block w-full rounded-md border-1 border-gray-300 shadow-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <h1>Location</h1>
            <div>
              <LocationSearchInput onLocationSelect={handleLocationSelect} />
            </div>
            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
