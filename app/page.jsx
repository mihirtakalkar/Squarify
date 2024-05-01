import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-r from-blue-500 via-green-500 to-teal-500">
      <div className="text-center p-12 bg-white shadow-xl rounded-lg max-w-4xl w-full mx-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Squarify</h1>
        <p className="text-lg text-gray-600">
          Web app to track expenses - as a group. Easily manage owed dues and
          view past events using custom groups.
        </p>
      </div>
    </div>
  );
}
