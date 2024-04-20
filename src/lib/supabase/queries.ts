"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase.types";
import { randomUUID } from "crypto";
import { supabaseServer } from ".";

export const getTweets = async () => {
  return await supabaseServer
    .from("tweets")
    .select(
      `
   *,
   profiles (
    username,
    full_name
   )
   `
    )
    .order("created_at", { ascending: false })
    .returns<
      (Database["public"]["Tables"]["tweets"]["Row"] & {
        profiles: Pick<
          Database["public"]["Tables"]["profiles"]["Row"],
          "full_name" | "username"
        >;
      })[]
    >();
};

export const getLikesCount = async (tweetId: string) => {
  const res = await supabaseServer
    .from("likes")
    .select("id", { count: "exact" })
    .eq("tweet_id", tweetId);

  return res;
};

export const isLiked = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId?: string;
}) => {

  if (!userId) return false;

  const { data, error } = await supabaseServer
   .from("likes")
   .select("id")
   .eq("tweet_id",tweetId)
   .eq("user_id",userId)
   .single()

   return Boolean(data?.id);
   
   
};
