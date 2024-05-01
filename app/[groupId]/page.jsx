"use client";
import { useEffect, useState } from "react";
import { Image } from "next/image";

const GroupPage = () => {
  const [groupId, setGroupId] = useState(null);
  const [group, setGroup] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1]; // Assuming the ID is the last segment
    setGroupId(id);
  }, []);

  useEffect(() => {
    const fetchGroup = async () => {
      if (groupId) {
        const res = await fetch(
          `/api/indgroupId?groupId=${encodeURIComponent(groupId)}`
        );
        if (res.ok) {
          const groupData = await res.json();
          setGroup(groupData);
        }
      }
    };
    fetchGroup();
  }, [groupId]); // Make sure fetchGroup is only called after groupId is set

  useEffect(() => {
    const fetchTransactions = async () => {
      if (groupId) {
        const res = await fetch(
          `/api/transaction?groupId=${encodeURIComponent(groupId)}`
        );
        if (res.ok) {
          const transactionData = await res.json();
          setTransactions(transactionData);
        }
      }
    };
    fetchTransactions();
  }, [groupId]); // Fetch transactions whenever groupId changes

  if (!group || !transactions) return <p>Loading details...</p>;
  return (
    <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="mt-20 max-w-3xl mx-auto">
        <h1 className="p-10 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl text-center">
          {group.name}
        </h1>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
          Group ID: {groupId}
        </h4>
        <p className="text-center">Admin 👑: {group.admin_email}</p>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Members:</h2>
          <ul className="list-disc list-inside bg-white p-4 rounded-lg shadow">
            {group.members &&
              group.members.map((member, index) => (
                <li
                  key={index}
                  className="text-gray-700 px-2 py-1 hover:bg-gray-100 rounded transition-colors"
                >
                  {member}
                </li>
              ))}
          </ul>
        </div>
        <h2 className="font-semibold">Transactions:</h2>
        <ul>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="p-4 mb-4 bg-white shadow rounded-lg flex flex-col md:flex-row"
              >
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-700">
                    Amount: {transaction.amount}
                  </p>
                  <p className="text-md text-gray-700">
                    Description: {transaction.description}
                  </p>
                  <p className="text-md text-gray-700">
                    Payer: {transaction.payer}
                  </p>
                  <p className="text-md text-gray-700">
                    Location: {transaction.location}
                  </p>
                  <ul className="mt-2 list-none">
                    <h3 className="font-semibold text-gray-900">
                      Members and their splits:
                    </h3>
                    {transaction.members.map((member, index) => (
                      <li key={index} className="mb-2">
                        <p className="text-gray-600">Email: {member.email}</p>
                        <p className="text-gray-600">
                          Split Amount: ${member.splitAmount.toFixed(2)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 max-w-xs content-center">
                  {" "}
                  <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${transaction.lat},${transaction.long}&zoom=17&size=400x400&scale=2&maptype=roadmap&markers=color:red%7C${transaction.lat},${transaction.long}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                    alt="Location Map"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No transactions found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default GroupPage;
