"use client";
import type { NextPage } from 'next';
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';

const Navbar: NextPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {/* Desktop navbar */}
      <div className="w-full relative bg-white overflow-hidden flex flex-row items-center justify-between py-6 px-[120px] box-border gap-0 text-left text-lg text-black font-roboto-mono min-h-[120px] md:flex hidden border-b border-gray-200">
        {/* Logo och namn */}
        <div className="w-[180px] h-[240px] flex flex-col items-center justify-center">
          <Link href="/" className="block">
            <div className="flex items-center justify-center w-[210px] h-[240px]">
              <Image
                className="rounded-full object-cover "
                width={210}
                height={240}
                alt="Logo"
                src="/Logga.png"
              />
            </div>
          </Link>
        </div>
        {/* Navigation */}
        <div className="bg-white flex flex-row items-center justify-center py-4 px-[70px] gap-16 text-xl">
          <Link href="/team" className="relative hover:underline">Team</Link>
          <Link href="/kontakt" className="relative hover:underline">Kontakt</Link>
        </div>
      </div>
      {/* Mobil navbar */}
      <div className="w-full flex items-center justify-between py-4 px-6 bg-white md:hidden">
        {/* Logga till vänster */}
        <Link href="/" className="block">
          <div className="flex items-center justify-center w-[60px] h-[60px]">
            <Image
              className="rounded-full object-cover"
              width={60}
              height={60}
              alt="Logo"
              src="/Logga.png"
            />
          </div>
        </Link>
        {/* Hamburgermeny till höger */}
        <button
          className="flex items-center justify-center p-2 text-black z-20"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Öppna meny"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 hover:rotate-180 hover:text-[var(--accent)] hover:scale-110 transition-transform duration-300 ease-in-out"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        {/* Mobilmeny overlay */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black/80 z-10 " onClick={() => setMenuOpen(false)} />
        )}
        {/* Mobilmeny innehåll */}
        <div className={`fixed top-0 right-0 h-full text-black  w-2/3 max-w-xs bg-white shadow-lg z-30 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 md:hidden flex flex-col pt-24 gap-8 text-xl font-bold`}
          style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
        >
          <Link href="/team" className="px-8 py-4 border-b border-gray-200 hover:bg-gray-100 hover:underline hover:text-[var(--accent)]" onClick={() => setMenuOpen(false)}>Team</Link>
          <Link href="/kontakt" className="px-8 py-4 border-b border-gray-200 hover:bg-gray-100 hover:underline hover:text-[var(--accent)]" onClick={() => setMenuOpen(false)}>Kontakt</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;