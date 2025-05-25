"use client";
import { motion } from "framer-motion";
import React from 'react'

export default function MotionExample() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h1 className="text-2xl font-bold mb-4">Framer Motion Example</h1>
        <p className="text-gray-700">This is a simple example of using Framer Motion for animations in a React component.</p>
      </motion.div>
    </main>
  )
}
