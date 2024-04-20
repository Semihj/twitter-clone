"use client"
import { useSupabase } from "@/app/supabase-provider";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiHomeCircle, BiUser } from "react-icons/bi";
import {
  BsBell,
  BsBookmark,
  BsTwitter,
  BsEnvelope,
  BsThreeDots,
} from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";
import { HiEnvelope } from "react-icons/hi2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { Database } from "@/lib/supabase.types";

const NAVIGATION_ITEMS = [
  {
    title: "Twitter",
    icon: BsTwitter,
  },
  {
    title: "Home",
    icon: BiHomeCircle,
  },
  {
    title: "Explore",
    icon: HiOutlineHashtag,
  },
  {
    title: "Notifications",
    icon: BsBell,
  },
  {
    title: "Messages",
    icon: BsEnvelope,
  },
  {
    title: "Bookmarks",
    icon: BsBookmark,
  },
  {
    title: "Profile",
    icon: BiUser,
  },
];


export default function LeftSideBar() {
  const [user,setUser] = useState({})
  
  const  {supabase} = useSupabase()
  const router = useRouter();
  useEffect(() => {
  
 supabase.auth.getUser().then(res => setUser(res.data.user?.user_metadata))
  }, [])

  return (
    <section className="sticky hidden top-0 w-[20%] xl:flex flex-col items-strech h-screen p-2   ">
      <div className="flex flex-col items-strech h-full space-y-4 mt-4">
        {NAVIGATION_ITEMS.map((item) => {
          return (
            <Link
              href={`/${item.title.toLowerCase()}`}
              className="hover:bg-white/10 transition duration-200 text-2xl rounded-3xl py-2 px-6 flex items-center justify-start w-fit space-x-4  "
              key={item.title}
            >
              <div className="">
                <item.icon className="text-4xl" />
              </div>
              <div className="">
                {item.title !== "Twitter" ? item.title : ""}
              </div>
            </Link>
          );
        })}
        <button className="bg-twitterColor text-white w-full rounded-full ml-1 p-4 hover:bg-opacity-70 transition duration-200 ">
          Tweet
        </button>
      </div>
      <DropdownMenu>
 
        <DropdownMenuTrigger className=" text-white hover:bg-white/10 w-full rounded-full mb-5 flex items-center justify-between space-x-2  p-4 hover:bg-opacity-70 transition duration-200 ">
          <div className="flex items-center space-x-2">
            <div className="rounded-full w-12 h-12 bg-slate-500"></div>
            <div className="flex flex-col items-start text-lg text-left">
              <div className="font-semibold">semih</div>
              <div className="text-slate-600 text-sm">@{user?.username}</div>
            </div>
          </div>
          <div className="flex  items-end">
            <BsThreeDots />
          </div>
        </DropdownMenuTrigger>
  <DropdownMenuContent className="w-full text-white bg-black p-4 rounded-2xl font-bold text-[21px] " >
    <DropdownMenuItem className="w-full cursor-pointer " onClick={async () => {
      const { error } = await supabase.auth.signOut()
    
      if(error) {
        console.log(error)
      } else {
        router.refresh()
      }
    }} >Log Out @{user?.username}</DropdownMenuItem>
 
  </DropdownMenuContent>
</DropdownMenu>

 {/*        <button className=" text-white hover:bg-white/10 w-full rounded-full mb-5 flex items-center justify-between space-x-2  p-4 hover:bg-opacity-70 transition duration-200 ">
          <div className="flex items-center space-x-2">
            <div className="rounded-full w-12 h-12 bg-slate-500"></div>
            <div className="flex flex-col items-start text-lg text-left">
              <div className="font-semibold">semih</div>
              <div className="text-slate-600 text-sm">@semih_devv</div>
            </div>
          </div>
          <div className="flex  items-end">
            <BsThreeDots />
          </div>
        </button> */}
    </section>
  );
}
