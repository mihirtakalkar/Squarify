"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useSession } from "next-auth/react";


const AddGroupBtn = React.forwardRef(({ onClick, href }, ref) => {
  const { status, data: session } = useSession();
  if (status === "authenticated") {
    return (
      //<motion.a
      <Button
        href={href}
        onClick={onClick}
        ref={ref}
        // className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-xl flex items-center justify-center gap-4 cursor-pointer text-lg"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Add Group
        </Button>
      //</motion.a>
    );
  }
  return (
    <div></div>
  );
});

export default AddGroupBtn;
