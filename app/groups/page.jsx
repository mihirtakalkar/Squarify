"use client";
import React, { useState } from 'react';

export default function Groups() {
    const [groupName, setGroupName] = useState('');
    const [members, setMembers] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { groupName, members: members.split(',') };
        const JSONdata = JSON.stringify(data);
        const endpoint = '/api/group/route';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        };

        const response = await fetch(endpoint, options);
        const result = await response.json();
        alert(`Is group added: ${result ? 'Yes' : 'No'}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-4">
            <div className="mb-4">
                <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Group Name:</label>
                <input
                    type="text"
                    id="groupName"
                    name="groupName"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label htmlFor="members" className="block text-sm font-medium text-gray-700">Members (comma-separated):</label>
                <input
                    type="text"
                    id="members"
                    name="members"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={members}
                    onChange={(e) => setMembers(e.target.value)}
                />
            </div>
            <button type="submit" className="self-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Create Group</button>
        </form>
    );
}
