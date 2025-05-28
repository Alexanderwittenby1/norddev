"use client";
import Image from "next/image";
import React, { useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="z-10 absolute w-full bg-transparent text-black flex items-center justify-between px-4 h-16 border-b border-gray-200/20 shadow-md transition-all duration-300 ease-in-out">
      {/* Vänster: Logga */}
      <Link href="/">
        <div className="flex items-center">
          <Image 
            src="/NordDev.png"
            alt="NordDev Logo"
            width={50}
            height={50}
            className="rounded-full duration-200 ease-in-out hover:scale-105 "
          />
        </div>
      </Link>
      {/* Hamburger ikon för mobil */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 "
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Öppna meny"
      >
        <span className={`block w-6 h-0.5 bg-black mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
        <span className={`block w-6 h-0.5 bg-black mb-1 transition-all ${menuOpen ? "rotate-45 -translate-y-1.5" : ""}`}></span>
        <span className={`block w-6 h-0.5 bg-black transition-all ${menuOpen ? "rotate-45 -translate-y-2" : ""}`}></span>
      </button>
      {/* Höger: Navigation */}
      <NavigationMenu className={`md:flex items-center justify-end mx-2 ${menuOpen ? "flex flex-col absolute top-16 right-4 bg-white rounded shadow-lg p-4 z-50" : "hidden md:flex"}`}>
        <NavigationMenuList
          className={`${
            menuOpen ? "flex flex-col items-stretch gap-2" : "flex md:flex-row flex-col sm:flex-row items-center"
          }`}
        >
          <NavigationMenuItem className="flex items-center flex-col sm:flex-row items-start">
            <Link href="/kontakt">
              <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-white font-bold border-2 bg-red-500 border-black hover:scale-105 transition-all duration-200 ease-in-out"}>
                Kontakta oss
              </NavigationMenuLink>
            </Link>
            <Link href="/om-oss">
              <NavigationMenuLink className={navigationMenuTriggerStyle() + " md:ml-4 mt-2 md:mt-0 text-black border-2 bg-white border-black hover:scale-105 transition-all duration-200 ease-in-out "}>
                Om oss
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default Navbar