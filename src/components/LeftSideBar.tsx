import Link from "next/link";
import React from "react";
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
  return (
    <section className="sticky top-0 w-[20%] flex flex-col items-strech h-screen   ">
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
        <button className="bg-primary text-white w-full rounded-full ml-1 p-4 hover:bg-opacity-70 transition duration-200 ">
          Tweet
        </button>
      </div>
        <button className=" text-white hover:bg-white/10 w-full rounded-full mb-5 flex items-center justify-between space-x-2  p-4 hover:bg-opacity-70 transition duration-200 ">
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
        </button>
    </section>
  );
}
