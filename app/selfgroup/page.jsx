//Add Groups Page

"use client";

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SelfGroupsPage() {
    const { status, data: session } = useSession();
    const [groupName, setGroupName] = useState('');
    const [members, setMembers] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Assuming members should be an array of strings and not a single string
        const membersArray = members.split(',').map(member => member.trim());  
        const data = { admin_email: session?.user?.email, name: groupName, members: membersArray };

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
            } else {
                const errorData = await response.json();  // Assuming the server might send back a message
                console.error('Failed to update group:', errorData.message);
                // toast.error(`Failed to update group: ${errorData.message}`, { position: toast.POSITION.TOP_CENTER });
            }
        } catch (error) {
            console.error('Error updating group:', error);
            // toast.error(`Error updating group: ${error.message}`, { position: toast.POSITION.TOP_CENTER });
        }
    };
    
    if (status === 'loading') return <div>Loading...</div>;

    if (!session) return <div>Please sign in to create a group.</div>;

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
            <ToastContainer />
            <h1 className="text-2xl font-semibold mb-4">Add Members to Group</h1>
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
                        value={members}
                        onChange={(e) => setMembers(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <button type="submit" className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Create Group</button>
            </form>
        </div>
    );
}
