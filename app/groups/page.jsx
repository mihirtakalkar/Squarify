//Add Groups Page

"use client";

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


export default function GroupsPage() {
    const { status, data: session } = useSession();
    const [groupName, setGroupName] = useState('');
    const [newMembers, setMembers] = useState('');

    const notifySuccess = () => toast.success("Group created successfully!");
    const notifyFailure = () => toast("Failed to create group!");
    const notifyError = () => toast('An error occurred while creating the group');


    const handleSubmit = async (event) => {
        event.preventDefault();
        let membersList = String(newMembers);

        // add the user email to the list of members
        if (session?.user?.email) {
            membersList = session.user.email + ',' + newMembers;
        }

        // should also handle empty strings between commas for members

        const data = { admin_email: session?.user?.email, name: groupName, members: membersList.split(',').filter(member => member.trim() !== '') };

        try {
            const response = await fetch('http://localhost:3000/api/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Group created successfully!');
                // console.log(toast);
                notifySuccess();
                // toast.success('Group created successfully!', { position: toast.POSITION.TOP_CENTER });
            } else {
                console.error('Failed to create group');
                notifyFailure();
            }
        } catch (error) {
            console.error('Error:', error);
            notifyError();
        }
    };

    // Render loading state if session status is loading
    if (status === 'loading') return <div>Loading...</div>;

    // If user is not authenticated, render message to sign in
    if (!session) return <div>Please sign in to create a group.</div>;

    return (
        <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
            <div className="max-w-md mx-auto mt-24 p-6 bg-white shadow-md rounded-md">
                {/* <ToastContainer /> */}
                <h1 className="text-2xl font-semibold mb-4 text-black">Create a Group</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Group Name:</label>
                        <input
                            type="text"
                            id="groupName"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="members" className="block text-sm font-medium text-gray-700">Members (comma-separated):</label>
                        <input
                            type="text"
                            id="members"
                            value={newMembers}
                            onChange={(e) => setMembers(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Create Group</button>
                </form>
            </div>
        </div>
    );
}
