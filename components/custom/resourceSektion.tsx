import React from 'react';
import { Geist, Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function ResourceSektion() {
  return (
    <div className='min-h-screen border-t-2 border-red-500 bg-gray-200/50 flex'>

        <div className='w-full max-w-7xl mx-auto px-4 2xl:px-0 text-3xl'>
          <div>
             
             {/*Sektion med text om vårt tjänstpaket.*/}

             <div>
              <p className={`${geistMono.variable} pt-4 font-semibold`}> Vi erbjuder....</p>
             </div>

             <div className='grid grid-cols-1 xl:grid-cols-3 gap-8 sm:grid-cols-1  '>
              <div className='bg-gray-200 w-full h-[500px]'>
                <h2>Vad är skalbar resurs?</h2> 
              </div>
             <h2>Skalbar resurs</h2>
             
             

             </div>
             
          </div>
           

        </div>
    </div>
  )
}

