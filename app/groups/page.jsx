//Add Groups Page

"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function GroupsPage() {
  const { status, data: session } = useSession();
  const [groupName, setGroupName] = useState("");
  const [newMembers, setMembers] = useState("");

  const notifySuccess = () => toast.success("Group created successfully, you are the admin!");
  const notifyFailure = () => toast("Failed to create group!");
  const notifyError = () => toast("An error occurred while creating the group");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let membersList = String(newMembers);

    // add the user email to the list of members
    if (session?.user?.email) {
      membersList = session.user.email + "," + newMembers;
    }

    // should also handle empty strings between commas for members

    const data = {
      admin_email: session?.user?.email,
      name: groupName,
      members: membersList.split(",").filter((member) => member.trim() !== ""),
    };

    try {
      const response = await fetch("http://localhost:3000/api/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Group created successfully!");
        // console.log(toast);
        notifySuccess();
        // toast.success('Group created successfully!', { position: toast.POSITION.TOP_CENTER });
      } else {
        console.error("Failed to create group");
        notifyFailure();
      }
    } catch (error) {
      console.error("Error:", error);
      notifyError();
    }
  };

  // Render loading state if session status is loading
  if (status === "loading") return <div>Loading...</div>;

  // If user is not authenticated, render message to sign in
  if (!session) return <div>Please sign in to create a group.</div>;

  return (
    <div className="absolute top-0 left-0 min-h-screen w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] z-[-1] flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Create a Group</CardTitle>
          <CardDescription>
          Enter the group name and member emails to add a new group.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="groupName">Group Name:</label>
              <Input
                id="groupName"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter Group Name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="members">Members (comma-separated):</label>
              <Input
                id="members"
                type="text"
                value={newMembers}
                onChange={(e) => setMembers(e.target.value)}
                placeholder="e.g., john@example.com, jane@example.com"
              />
            </div>
            <CardFooter className="flex flex-col w-full">
              <Button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md w-full"
              >
                Create Group
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
