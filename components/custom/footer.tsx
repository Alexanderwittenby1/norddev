import React from 'react'

export const Footer = () => {
  return (
    <div >
      <footer 
      className="bg-black bg-cover text-white py-4 flex flex-col justify-end items-start min-h-[260px]"
      style={{clipPath: 'polygon(0 0, 100% 25%, 100% 100%, 0% 100%)'}}>
      
        <div 
        
        className="container mx-auto flex flex-col items-center justify-center space-y-2">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} NordDev. All rights reserved.
          </p>
          <a href="/privacy-policy" className="text-sm hover:underline">
            Integritetspolicy
          </a>
        </div>
      </footer>
    </div>
  )
}