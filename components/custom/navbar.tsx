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
    <div className="w-full h-16 bg-gray-800 text-black flex items-center justify-between px-4">
      {/* Vänster: Logga */}
      <Link href="/">
        <div className="flex items-center">
          <Image 
            src="/NordDev.png"
            alt="NordDev Logo"
            width={50}
            height={50}
            className="rounded-full mr-2 "
          />
        </div>
      </Link>
      {/* Höger: Navigation */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="flex items-center ">
            <Link href="/kontakt">
              <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-white"}>
                Kontakta oss
              </NavigationMenuLink>
            </Link>
            <Link href="/om-oss">
              <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-white"}>
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