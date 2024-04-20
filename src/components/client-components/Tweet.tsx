"use server";

import { Database } from "@/lib/supabase.types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import React, { useTransition } from "react";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { IoShareOutline, IoStatsChart } from "react-icons/io5";
import { toast } from "sonner";
import { likeTweet } from "@/lib/supabase/mutation";
import LikeBtn from "./likebtn";
import { getLikesCount, isLiked } from "@/lib/supabase/queries";
import { useUserStore } from "@/app/store-provider";
import { SupabaseClient } from "@supabase/supabase-js";
import { log } from "console";
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

type TweetProps = {
  tweet: Database["public"]["Tables"]["tweets"]["Row"] & {
    profiles: Pick<
      Database["public"]["Tables"]["profiles"]["Row"],
      "full_name" | "username"
    >;
  },
  currentUser?: string | undefined;
};

dayjs.extend(relativeTime);

export  default async function Tweet({ tweet,currentUser }: TweetProps) {

  const getTweetsLikeCount = await getLikesCount(tweet.id)

  
    const liked = await isLiked({
    tweetId:tweet.id,
    userId:currentUser
  })
  
  return (
    <div className="p-2 border-t-[0.5px]  flex space-x-4 border-gray-600 h-full w-full ">
      <div className="">
        <div className="w-10 h-10 bg-slate-400 rounded-full cursor-pointer"></div>
      </div>
      <div className="flex flex-col  space-y-2  h-full w-full ">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center space-x-1 w-full">
            <div className="font-bold">{tweet.profiles.full_name ?? ""}</div>
            <div className="text-gray-500">@{tweet.profiles.username}</div>
            <div className="text-gray-500">
              <BsDot />
            </div>
            <div className="text-gray-500">
              {dayjs(tweet.created_at).fromNow()}
            </div>
          </div>
          <div>
            <BsThreeDots />
          </div>
        </div>
        <div className="text-white text-sm   min-h-full">{tweet.text}</div>
        <div className="bg-slate-400 aspect-square h-20 sm:h-40 md:h-50 xl:h-80 w-full  rounded-xl"></div>
        <div className="flex items-center space-x-2  justify-between ">
          <div className="rounded-full hover:bg-white/10 cursor-pointer p-2 transit duration-200 ">
            <BsChat className="text-xl " />
          </div>
          <div className="rounded-full hover:bg-white/10 cursor-pointer p-2 transit duration-200 ">
            <AiOutlineRetweet className="text-xl " />
          </div>

          <LikeBtn tweetId={tweet.id} count={getTweetsLikeCount.count} isUserHasLiked={liked}  />
          <div className="rounded-full hover:bg-white/10 cursor-pointer p-2 transit duration-200 ">
            <IoStatsChart className="text-xl " />
          </div>
          <div className="rounded-full hover:bg-white/10 cursor-pointer p-2 transit duration-200 ">
            <IoShareOutline className="text-xl " />
          </div>
        </div>
      </div>
    </div>
  );
}
