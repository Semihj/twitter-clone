"use client";

import { revalidate } from "@/app/page";
import { useUserStore } from "@/app/store-provider";
import { likeTweet, unlikeTweet } from "@/lib/supabase/mutation";
import { isLiked } from "@/lib/supabase/queries";
import { cn } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import React, { useState, useTransition } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "sonner";

type LikeBtnProps = {
  tweetId: string;
  count: number | null;
  isUserHasLiked: boolean | undefined;
};

export default function LikeBtn({
  tweetId,
  count,
  isUserHasLiked,
}: LikeBtnProps) {
  const [isLikePending, startTransition] = useTransition();
  const { currentUser } = useUserStore((state) => state);
  const [isLoading, setisLoading] = useState(false)

  return (
    <div>
      <button
        onClick={() => {
          setisLoading(true)
          if (currentUser) {
            return startTransition(() => {

              if (isUserHasLiked) {
                unlikeTweet({
                  tweetId: tweetId,
                  userId: currentUser.id,
                });
                setisLoading(false)
                
              } else if (!isUserHasLiked) {
                likeTweet({
                  tweetId: tweetId,
                  userId: currentUser.id,
                });
                setisLoading(false)
              }
            });
          } else {
            toast.error("please login to like a tweet");
          }
        }}
        className="rounded-full hover:bg-white/10 cursor-pointer flex items-center space-x-1 p-2 transit duration-200 "
      >
        {isLoading ? "loading" : isUserHasLiked ? (
          <AiFillHeart className="text-xl w-5 h-5 text-rose-600" />
        ) : (
          <AiOutlineHeart className={cn("text-xl w-5 h-5 ")} />
        )}

        <p>{ isLoading ? "": count} </p>
      </button>
    </div>
  );
}
