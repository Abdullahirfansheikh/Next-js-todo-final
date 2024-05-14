// @ts-nocheck

"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter()

  const { userDetail, isUserLogin } = useSelector((store) => store.userSlice);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div className="bg-[rgb(230,243,255)] px-[100px] max-sm:px-[20px] py-[50px] flex justify-between items-center">
    <Link href={"/"}>
      <p className="text-[28px] font-thin">○ C L E A N ○ B I N ○</p>
    </Link>
      <div className="flex max-lg:flex-row-reverse items-center">
        <div className="lg:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[28px] w-[28px] cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[28px] w-[28px] cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </div>
        <div
          className={`lg:flex ${
            isMenuOpen ? "flex flex-col" : "hidden"
          } text-[28px] max-xl:text-[20px] font-extrabold`}
        >
          {isUserLogin && <Link href='/userDashboard' className="mx-4 cursor-pointer">
          DASHBOARD
          </Link>}
          <Link href='/#ourservices' className="mx-4 cursor-pointer">
          OUR SERVICES
          </Link>
          <Link className="mx-4 cursor-pointer" href='/#pricelist'>
          PRICELIST
          </Link>
          {/* <p >OUR SERVICES</p> */}
          {/* <p className="mx-4 cursor-pointer">PRICELIST</p> */}

        {!isUserLogin ? (
          <>
            <Link className={` link_Text_list_items`} id='navlink' href='/signup'>
              <span className='text-[28px] text-black max-xl:text-[20px] font-semibold'>Signup</span>
            </Link>
            <Link className={` link_Text_list_items`} id='navlink' href='/login'>
              <span className='text-[28px] text-black max-xl:text-[20px] font-semibold'>
                Login
              </span>
            </Link>
          </>
        ) : (
          <button onClick={() => {
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
            router.push("/login")
          }} className="link_Text_list_items mx-8 cursor-pointer">
            <span className='text-[28px] text-black max-xl:text-[20px] font-semibold'>

            Logout
            </span>
          </button>
        )}

      </div>
    </div>
  
  </div>)
}

