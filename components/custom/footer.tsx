import React from 'react'
import Link from "next/link";
import Image from "next/image";
export const Footer = () => {
  return (
    <div >
      <footer className="bg-[url(/grain.jpg)] bg-cover text-white py-4 flex flex-col justify-center items-start min-h-[260px]">
        <div className='w-full mx-auto px-4 2xl:px-0 flex justify-evenly items-center '>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 '>
            <div className="container mx-auto flex flex-col items-start space-y-2">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} NordDev. All rights reserved.
              </p>
              <a href="/privacy-policy" className="text-sm hover:underline">
                Integritetspolicy
              </a>
            </div>
            <div className="container mx-auto flex flex-col items-start space-y-2">
            <h1><u>Kontakt</u></h1>
            <a href="mailto:example@example.com">info@nordiskdev.se</a>
              <a href="tel:0457-xxxxxx"> 0457-xxxxxx </a>
            </div>
            <div className="container mx-auto flex flex-col items-start space-y-2">
              <h1><u>Social medier</u></h1>
              <a href="https://www.facebook.com"> Facebook </a>
              <a href="https://www.linkedin.com"> Linkedin </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}











