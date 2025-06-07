import React from 'react'

export const Footer = () => {
  return (
    <div className="bg-gray-800 text-white ">
        <footer className="bg-gray-800 text-white py-4 bottom-0">
            <div className="container mx-auto text-center">
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
