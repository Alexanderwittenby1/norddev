"use client";
import { motion } from 'framer-motion'
import React from 'react'


type MetaDataType = {
  title: string;
  description: string;
  Apputveckling: string;
  Webbutveckling: string;
  konsultering: string;
  backgroundImage: string;
};


export default function Sektion({data}: { data: MetaDataType }) {


  return (
    <section 
    className={`py-16 bg-cover bg-center bg-no-repeat border-b-128 border-red-500`}
    style={{ backgroundImage: `url(${data.backgroundImage})`, clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)'}}>
    
      <div className="container mx-auto px-4 w-screen py-16 h-screen ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center ">
          {/* Vänster: Tjänster */}
          <div>
            <h2 className="text-3xl font-bold text-left mb-8 border-b shadow-2xs text-white">VÅRA TJÄNSTER</h2>
            <div className="space-y-4 ">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md duration-200 ease-in-out hover:bg-gray-100"
              >
                <h3 className="text-xl font-semibold mb-4">Konsultering</h3>
                <p className="text-gray-700">
                  {data.konsultering}
                </p>
                <p>
                  Klicka <a href="#" className="text-blue-500 hover:underline">här</a> för att läsa mer.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md duration-200 ease-in-out hover:bg-gray-200"
              >
                <h3 className="text-xl font-semibold mb-4">Webbutveckling</h3>
                <p className="text-gray-700">
                  {data.Webbutveckling}
                </p>
                <p>
                  Klicka <a href="#" className="text-blue-500 hover:underline">här</a> för att läsa mer.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md duration-200 ease-in-out hover:bg-gray-300 "
              >
                <h3 className="text-xl font-semibold mb-4">Apputveckling</h3>
                <p className="text-gray-700">
                  {data.Apputveckling}
                </p>
                <p>
                  Klicka <a href="#" className="text-blue-500 hover:underline">här</a> för att läsa mer.
                </p>
              </motion.div>
            </div>
          </div>
          
            
          </div> 
        </div>
      
    </section>
  )
}