"use client";

import React from 'react';
import { motion } from 'framer-motion';

const AddGroupBtn = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      ref={ref}
      className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-xl flex items-center justify-center gap-4 cursor-pointer text-lg"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      Add Group
    </motion.a>
  );
});

export default AddGroupBtn;
