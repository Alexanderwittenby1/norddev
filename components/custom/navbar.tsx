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


const Navbar = () => {
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4">
      <NavigationMenu className="bg-gray-800 text-white">
          <NavigationMenuList>
              <NavigationMenuItem>
                  <NavigationMenuTrigger className='bg-black text-2xl'>Item One</NavigationMenuTrigger>
                      <NavigationMenuContent className='bg-gray-700 text-white w-[200px]'>
                          <NavigationMenuLink className='w-[100px] text-2xl'>Om oss</NavigationMenuLink>
                      </NavigationMenuContent>
              </NavigationMenuItem>
          </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default Navbar