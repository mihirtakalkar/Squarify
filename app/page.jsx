import UserInfo from "@/components/UserInfo";
import Link from "next/link";
import React from 'react';
import AddGroupBtn from "@/components/AddGroupBtn";
import AddSelfBtn from '@/components/AddSelfBtn';
import User from "@/models/user";
import LocationInput from "@/components/LocationInput";
import LocationSearchInput from "@/components/LocationInput";

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen flex items-center justify-center">
      <div className="text-center p-12 bg-white shadow-xl rounded-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Squarify</h1>
        <p className="text-lg text-gray-600">
          Web app to track expenses - as a group. Easily manage owed dues and view past events using custom groups.
        </p>
      </div>
    </div>
  );  
}
