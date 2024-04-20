import React from 'react'
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs"
import { Database } from '@/lib/supabase.types';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import FormClient from '../client-components/FormClient';
import { createServerClient } from '@supabase/ssr';
import {SupabaseClient} from "@supabase/supabase-js"
import { revalidatePath } from 'next/cache';



export default function ComposeTweet() {

  

    
    async function submitTweet(formData:FormData) {
        "use server";

        const tweet = formData.get("tweet")
        console.log(tweet)
      const cookieStore = cookies()
        
      const supabaseClient = createServerClient(
        "https://vyfwuyocdhdtrqsrtrgp.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5Znd1eW9jZGhkdHJxc3J0cmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1MzMzMjcsImV4cCI6MjAyNjEwOTMyN30.zWULDl9UDAloXr0vsPwNGiVsaw7lx4AtOod_3hoyxGA",
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value
            },
          },
        }
      )
        const supabaseServer =  new SupabaseClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL as string,
          process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY as string,
         
        )
        console.log(supabaseServer)
        console.log(supabaseClient)
      
      const {data:userData,error:userError} = await supabaseClient.auth.getUser()

      if(userError) return userError;
    const {data,error} =  await supabaseServer.from("tweets").insert({
        profile_id:userData.user.id,
        text:tweet?.toString(),
        id:randomUUID(),

      })
      
      revalidatePath("/")
      return {data,error};
      
    }   

  return (
   <FormClient
    serverAction={submitTweet}
   />
  )
}
