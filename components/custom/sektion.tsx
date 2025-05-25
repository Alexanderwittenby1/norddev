"use client";
import { motion } from 'framer-motion'
import React from 'react'

export default function Sektion() {
    const MetaData = {
        title: "NordDev",
        description: "Vi på NordDev",
        Apputveckling: "Mer information om apputveckling kommer snart.",
        Webbutveckling: "Mer information om webbutveckling kommer snart.",
        konsultering: "Mer information om konsulttjänster kommer snart.",
  };

  return (
    <section className="bg-gray-100 py-16 h-screen">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-left mb-8">Våra Tjänster</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 lg:w-100 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: false }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-4">Konsultering</h3>
                  <p className="text-gray-700">
                    {MetaData.konsultering}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: false }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-4">Webbutveckling</h3>
                  <p className="text-gray-700">
                    {MetaData.Webbutveckling}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: false }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-4">Apputveckling</h3>
                  <p className="text-gray-700">
                    {MetaData.Apputveckling}
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
  )
}
