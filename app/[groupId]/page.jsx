"use client";
import { useEffect, useState } from "react";

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
    <div className="p-4">
      <h1 className="text-xl font-bold">{group.name}</h1>
      <h1>Group ID: {groupId}</h1>
      <p>Admin: {group.admin_email}</p>
      <ul>
        <h2 className="font-semibold">Members:</h2>
        {group.members &&
          group.members.map((member) => <li key={member}>{member}</li>)}
      </ul>
      <h2 className="font-semibold">Transactions:</h2>
      <ul>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="p-4 mb-4 bg-white shadow rounded-lg"
            >
              <p className="text-lg font-semibold">
                Amount: {transaction.amount}
              </p>
              <p className="text-md text-gray-700">
                Description: {transaction.description}
              </p>
              <p className="text-md text-gray-700">
                Payer: {transaction.payer}
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
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </ul>
    </div>
  );
};

export default GroupPage;
