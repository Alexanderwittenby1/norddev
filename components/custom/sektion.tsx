"use client";
import { motion } from 'framer-motion'
import React from 'react'
import Image from "next/image";

export default function Sektion() {
  const MetaData = {
    title: "NordDev",
    description: "Vi på NordDev",
    Apputveckling: "Mer information om apputveckling kommer snart.",
    Webbutveckling: "Mer information om webbutveckling kommer snart.",
    konsultering: "Mer information om konsulttjänster kommer snart.",
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 w-screen h-screen py-16 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center ">
          {/* Vänster: Tjänster */}
          <div>
            <h2 className="text-3xl font-bold text-left mb-8 border-b shadow-2xs">VÅRA TJÄNSTER</h2>
            <div className="space-y-4 ">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false }}
                className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-all duration-200 ease-in-out hover:bg-gray-100"
              >
                <h3 className="text-xl font-semibold mb-4">Konsultering</h3>
                <p className="text-gray-700">
                  {MetaData.konsultering}
                </p>
                <p>
                  Klicka <a href="#" className="text-blue-500 hover:underline">här</a> för att läsa mer.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false }}
                className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-all duration-200 ease-in-out hover:bg-gray-200"
              >
                <h3 className="text-xl font-semibold mb-4">Webbutveckling</h3>
                <p className="text-gray-700">
                  {MetaData.Webbutveckling}
                </p>
                <p>
                  Klicka <a href="#" className="text-blue-500 hover:underline">här</a> för att läsa mer.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: false }}
                className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-all duration-200 ease-in-out hover:bg-gray-300 "
              >
                <h3 className="text-xl font-semibold mb-4">Apputveckling</h3>
                <p className="text-gray-700">
                  {MetaData.Apputveckling}
                </p>
                <p>
                  Klicka <a href="#" className="text-blue-500 hover:underline">här</a> för att läsa mer.
                </p>
              </motion.div>
            </div>
          </div>
          {/* Högersektion: bilder */}
          <div className="hidden md:flex flex-col gap-8 items-center ">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: false }}
              className='flex flex-col gap-8 items-center'
            >
            <Image
              src="/NordDev.png"
              alt="NordDev"
              width={300}
              height={300}
              className="rounded-lg shadow"
            />
            <Image
              src="/milad.jpg"
              alt="Milad"
              width={300}
              height={300}
              className="rounded-lg shadow"
            />
            </motion.div>
            
          </div>
        </div>
      </div>
    </section>
  )
}