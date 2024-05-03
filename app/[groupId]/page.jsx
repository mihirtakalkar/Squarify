"use client";
import { useEffect, useState } from "react";
import { Image } from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import PayBtn from "@/components/PayBtn";

const GroupPage = () => {
  const [groupId, setGroupId] = useState(null);
  const [group, setGroup] = useState(null);
  const [transactions, setTransactions] = useState([]);


  // Function to handle marking a member as paid
  const handlePay = async (email, groupID) => {
    const data = { id: groupId, mem_email: email };

    console.log("Handle pay is called with the email ", email, " and groupID: ", groupID);

    try {
      const response = await fetch('http://localhost:3000/api/pay/', { // Adjust the URL to the correct API endpoint for updates
        method: 'PUT', // Change to PUT if updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Paid updated successfully!');

      } else {
        const errorData = await response.json();  // Assuming the server might send back a message
        console.error('Failed to update payment:', errorData.message);
      }
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  




  };


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
    <div class="absolute top-0 z-[-2] w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="mt-20 max-w-3xl mx-auto">
        <h1 className="p-10 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl text-center">
          {group.name}
        </h1>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
          Group ID: {groupId}
        </h4>
        <p className="text-center">Admin 👑: {group.admin_email}</p>
        <div className="mt-4">
          <h3 className="pt-4 pb-3 scroll-m-20 text-2xl font-semibold tracking-tight text-center">
            Members 👥
          </h3>
          <Card>
            <CardHeader>
              <Link href={"/selfgroup"}>
                <CardDescription className="scroll-m-20 text-xl font-semibold tracking-tight text-center">Add Members</CardDescription>
              </Link>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-center">
                {group.members.map((member, index) => (
                  <li
                    key={index}
                  //className="text-gray-700 px-2 py-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {member}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <h3 className="pt-4 pb-3 scroll-m-20 text-2xl font-semibold tracking-tight text-center">
          History 📖
        </h3>
        <ul>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <Card key={transaction._id} className="mb-4 shadow rounded-lg">
                <CardHeader>
                  <CardTitle className="text-center">
                    Transaction: {transaction._id}{" "}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xl">
                    <div>
                      <CardDescription className="font-semibold">
                        Amount: ${transaction.amount}
                      </CardDescription>
                      <CardDescription>
                        Description: {transaction.description}
                      </CardDescription>
                      <CardDescription>
                        Payer: {transaction.payer}
                      </CardDescription>
                      <CardDescription>
                        Location: {transaction.location}
                      </CardDescription>
                      <ul className="mt-4">
                        <li className="font-semibold">Splits:</li>
                        {transaction.members.map((member, index) => {
                          // console.log("Member:", member); // Added console log here
                          return (
                            <li key={index} className="text-sm mt-2">
                              Email: {member.email}, Split Amount: ${member.splitAmount.toFixed(2)}, Paid: {member.paid.toString()}
                              <PayBtn email={member.email} groupID={transaction.group_name} onPay={handlePay} />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div>
                      <img
                        src={`https://maps.googleapis.com/maps/api/staticmap?center=${transaction.lat},${transaction.long}&zoom=17&size=400x400&scale=2&maptype=roadmap&markers=color:red%7C${transaction.lat},${transaction.long}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                        alt="Location Map"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  {/* Additional actions or information can go here */}
                </CardFooter>
              </Card>
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
