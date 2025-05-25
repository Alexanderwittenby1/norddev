import React from 'react'

export const Footer = () => {
  return (
    <div>
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} NordDev. All rights reserved.
            </p>
            <p className="text-sm">
                skapad av NordDev
            </p>
            </div>
        </footer>
    </div>
  )
}
