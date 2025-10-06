import React from 'react'
import Link from "next/link";
import Image from "next/image";
export const Footer = () => {
  return (
    <div >
      {/* DEB841 || DE9E36*/}
      <footer className="bg-[#DEB841] bg-cover text-[#050505] py-4 flex flex-col justify-center items-start min-h-[260px]">
        <div className='w-full mx-auto px-4 2xl:px-0 flex justify-evenly items-center '>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 '>
            <div className="container mx-auto flex flex-col items-start space-y-2 pr-4 border-r-1">
              <p><br /></p>
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
            <div className="container mx-auto flex flex-col items-start space-y-2 pl-4 border-l-1">
              <h1><u>Social medier</u></h1> 
              <a href="https://www.facebook.com">
              <span className="[&>svg]:h-5 [&>svg]:w-5 [&>svg]:fill-[#050505]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                  d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
              </svg>
            </span>
              </a>
                <a href="https://www.linkedin.com">
                <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#050505]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
              </svg>
            </span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}











