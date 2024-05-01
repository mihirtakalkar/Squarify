"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"


const AddSelfBtn = React.forwardRef(({ onClick, href }, ref) => {
  const { status, data: session } = useSession();
  if (status === "authenticated") {
    return (
      //<motion.a
      <Button
        href={href}
        onClick={onClick}
        ref={ref}
        // className="inline-block text-white py-3 px-6 rounded-lg shadow-xl flex items-center justify-center gap-4 cursor-pointer text-lg"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Add Yourself to a Group
        </Button>
      //</motion.a>
    );
  }
  return (
    <div></div>
  );
});

export default AddSelfBtn;