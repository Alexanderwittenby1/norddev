import { Basic } from 'next/font/google'
import React from 'react'
import { object } from 'zod'

export default function Erbjudande() {
    const prisplaner = {
        basic: {
            price: 999,
            features: [
                "Grundläggande funktioner",
                "1 användare",
                "E-postsupport"
            ]
        },
        pro: {
            price: 1999,
            features: [
                "Allt i Basic",
                "Fler användare",
                "Prioriterad support"
            ]
        },
        premium: {
            price: 2999,
            features: [
                "Allt i Pro",
                "Obegränsade användare",
                "Personlig support"
            ]
        }
    }
  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-gray-100 py-24'>
        <div className='w-full max-w-7xl mx-auto px-4 2xl:px-0'>
          <h2 className='text-2xl font-bold mb-4'>Våra Erbjudanden</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {Object.entries(prisplaner).map(([key, plan]) => (
               
                
              <div key={key} className='bg-white rounded-lg shadow-md p-6'>
                <h3 className='text-lg font-semibold mb-2'>{key.charAt(0).toUpperCase() + key.slice(1)} Plan</h3>
                <p className='text-gray-700 mb-4'>Pris: {plan.price} SEK</p>
                <h4 className='font-semibold mb-2'>Funktioner:</h4>
                <ul className='list-disc list-inside'>
                  {plan.features.map((feature, index) => (
                    <li key={index} className='text-gray-600'>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}
