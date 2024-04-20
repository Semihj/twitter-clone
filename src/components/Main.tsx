import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { IoShareOutline, IoStatsChart } from "react-icons/io5";
import ComposeTweet from "./server-components/compose-tweet";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase.types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import { getTweets, isLiked } from "@/lib/supabase/queries";
import Tweet from "./client-components/Tweet";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

dayjs.extend(relativeTime)


 export default async function Main() {

  const cookieStore = cookies()

  const supabaseClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

 const {data:userData,error} = await supabaseClient.auth.getUser()


  console.log(userData?.user?.id);
  

  

const res = await getTweets();


  return (
    
    <main className="w-full xl:w-[50%]  flex  h-full min-h-screen flex-col overflow-x-hidden  border-l-[0.5px] border-r-[0.5px] border-t-[0] border-b-[0] border-gray-600">
    <h1 className="text-xl font-bold my-4 p-6 backdrop-blur-md sticky top-0 bg-black/10">
      Home
    </h1>
   <ComposeTweet/>
    <div className="flex flex-col w-full overflow-x-hidden h-full ">
     { res?.data?.map((tweet) => (
       <Tweet key={tweet.id} tweet={tweet} currentUser={userData?.user?.id} />
      ))}
    </div>
  </main>
  )
}
