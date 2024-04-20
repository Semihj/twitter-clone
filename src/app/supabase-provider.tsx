"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { SupabaseClient, User } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/supabase.types";
import { Toaster } from "sonner";
import { createBrowserClient } from "@supabase/ssr";
import { UserStoreProvider, useUserStore } from "./store-provider";
import { revalidatePath } from "next/cache";





type SupabaseContext = {
  supabase: SupabaseClient<Database>;
};

export const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,

)

const {currentUser,signInUser} = useUserStore((state) => state)


  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();


  useEffect(() => {
   
       const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((res) => {
      router.refresh()
      console.log(res)
    });
    
  
   supabase.auth.getSession().then((res) => {
      console.log(res)
      if (!res.data.session) {
        router.replace("/signin")
        return;
      } 
      supabase.auth.getUser().then((res) => signInUser(res.data.user))
      setUser(res.data.session.user);
    });
    return () => {
      subscription.unsubscribe();
    };
 
    
   
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase }}>
      <>
      <><Toaster/></>
        {children}
      </>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};