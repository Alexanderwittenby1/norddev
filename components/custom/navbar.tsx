import Image from "next/image";
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link";


const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black/0 text-black flex items-center justify-between px-4 h-16">
      {/* Vänster: Logga */}
      <Link href="/">
        <div className="flex items-center">
          <Image 
            src="/NordDev.png"
            alt="NordDev Logo"
            width={50}
            height={50}
            className="rounded-full mr-2  duration-200 ease-in-out hover:scale-105"
          />
        </div>
      </Link>
      {/* Höger: Navigation */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="flex items-center ">
            <Link href="/kontakt">
              <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-black border-2 bg-white border-black hover:scale-105 transition-all duration-200 ease-in-out"}>
                Kontakta oss
              </NavigationMenuLink>
            </Link>
            <Link href="/om-oss">
              <NavigationMenuLink className={navigationMenuTriggerStyle() + "text-black border-2 bg-white border-black hover:scale-105 transition-all duration-200 ease-in-out"}>
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