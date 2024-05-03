//Add Groups Page

"use client";

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function SelfGroupsPage() {
  const { status, data: session } = useSession();
  const [groupId, setGroupId] = useState('');
  const [members, setMembers] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [selectedOption, setSelectedOption] = useState('Members'); // State to track the selected option

  const notifyNewSuccess = () => toast.success("Added members to group successfully!");
  const notifySelfSuccess = () => toast.success("Added self to group successfully!");
  const notifyFailure = () => toast("Failed to add to group!");
  const notifyError = () => toast('An error occurred while adding to group');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Assuming members should be an array of strings and not a single string
    const membersArray = members.split(',').map(member => member.trim());

    // get the existing admin
    try {
      const url = `http://localhost:3000/api/indgroupId?groupId=${encodeURIComponent(
        groupId
      )}`;
      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        const groupData = await response.json();

        setAdminEmail(groupData.admin_email);
      } else {
        console.error(
          "Failed to fetch group: HTTP status",
          response.status
        );
        notifyError();
      }
    } catch (error) {
      console.error("Error fetching user group:", error);
      notifyError();
    }




    const data = { admin_email: adminEmail, id: groupId, newMembers: membersArray };
    // console.log("Admin Email from group: ", data.admin_email);
    // console.log("id: ", data.id);
    // console.log("members array ", data.newMembers);

    try {
      const response = await fetch('http://localhost:3000/api/group/', { // Adjust the URL to the correct API endpoint for updates
        method: 'PUT', // Change to PUT if updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Group updated successfully!');
        // toast.success('Group updated successfully!', { position: toast.POSITION.TOP_CENTER });
        if (selectedOption == "Self") {
          notifySelfSuccess();
        } else {
          notifyNewSuccess();
        }

      } else {
        const errorData = await response.json();  // Assuming the server might send back a message
        console.error('Failed to update group:', errorData.message);
        // toast.error(`Failed to update group: ${errorData.message}`, { position: toast.POSITION.TOP_CENTER });
        notifyFailure();
      }
    } catch (error) {
      console.error('Error updating group:', error);
      // toast.error(`Error updating group: ${error.message}`, { position: toast.POSITION.TOP_CENTER });
      notifyError();
    }
  };

  if (status === 'loading') return <div>Loading...</div>;

  if (!session) return <div>Please sign in to create a group.</div>;

  return (
    <div className="absolute top-0 left-0 min-h-screen w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] z-[-1] flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Add Members to Group</CardTitle>
          <CardDescription>Enter the group ID and member emails to add new members.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="groupID">Group ID:</label>
              <Input
                id="groupID"
                type="text"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                placeholder="Enter Group ID"
              />
            </div>


            <div className="mb-4 flex items-center">
              <label htmlFor="members" className="mr-2">Members (comma-separated):</label>
              <select
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  if (e.target.value === 'Self') {
                    setMembers(session?.user?.email || '');
                  } else {
                    setMembers('');
                  }
                }}
                className="mr-2 p-1 text-sm border border-neutral-600 rounded-md bg-primary"
                style={{ width: 'auto', minWidth: '120px' }}
              >
                <option value="Members">New Members</option>
                <option value="Self">Self</option>
              </select>
            </div>

            <div className="mb-4">

              <Input
                id="members"
                type="text"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                placeholder={selectedOption === 'Self' ? session?.user?.email : "e.g., email1@example.com, email2@example.com"}
                disabled={selectedOption === 'Self'}
                className="flex-1"
              />
            </div>


            <CardFooter className="flex flex-col w-full">
              <Button type="submit">
                Add Members
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
