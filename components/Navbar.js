"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";





const Navbar = () => {
  const pathname = usePathname();
  const showNavBar = ["/","/generate"].includes(pathname)
  if (!showNavBar) return null;


  return <nav className='bg-white w-[80vw] fixed top-10 right-[10vw] rounded-full p-4 flex justify-around items-center' > 
    <div className='logo flex gap-20'> {/* Adjust the width as needed */}
        <Link href={"/"}>
        <img src="/logo.png" alt="logo" className=' h-20'/>

        </Link>
        <ul className='flex gap-10 items-center text-gray-600'>
        <Link href="/"><li>Templates</li></Link>
        <Link href="/"><li>Marketplace</li></Link>
        <Link href="/"><li>Discover</li></Link>
        <Link href="/"><li>Pricing</li></Link>
        <Link href="/"><li>Learn</li></Link>
        </ul>
    </div>
    <div className='flex gap-3'>
      <button className='login font-bold bg-gray-200 rounded-3xl p-4 '>Log In</button>
      <button className='signup font-bold p-4 px-8 rounded-full text-white bg-blue-950'>Sign Up Free</button>
    </div>

</nav>
}

export default Navbar
