import React from 'react'

export const Footer = () => {
  return (
    <div >
      <footer className="bg-[url(/grain.jpg)] bg-cover text-white py-4 flex flex-col justify-end items-start min-h-[160px]">
        <div className="container mx-auto flex flex-col items-start space-y-2">
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