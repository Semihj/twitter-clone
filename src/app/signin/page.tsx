"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { useSupabase } from "../supabase-provider";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { useUserStore } from "../store-provider";

export default function SignIn() {

  const {currentUser} = useUserStore((state) => state)
  console.log(currentUser);

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createBrowserClient("https://vyfwuyocdhdtrqsrtrgp.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5Znd1eW9jZGhkdHJxc3J0cmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1MzMzMjcsImV4cCI6MjAyNjEwOTMyN30.zWULDl9UDAloXr0vsPwNGiVsaw7lx4AtOod_3hoyxGA")
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleSignUp = async () => {
       const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });


  await supabase.auth.getSession().then((res) => {
      console.log(res)
      if (!res.data.session) {
        setIsOpen(true);
        return;
      } 
      router.replace("/")

    });
    return () => {
      subscription.unsubscribe();
    };
    }
    handleSignUp()
   
  }, [router, supabase]);
  return (
    <>
    <Toaster />
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-6">
        <h3 className="text-lg my-1">Please sign in to continue</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            setIsLoading(true);

            // first check if the username exists or not

            const { data: signInData, error: signInError } =
              await supabase.auth.signInWithPassword({
                email: email.trim(),
                password:password
              });

            if (signInError) {
              return toast.error(signInError.message);
              setIsLoading(false)
            }
            console.log(signInData)
            
            toast.success("user logged in successfully");
            setIsLoading(false);
          }}
        >
          <Input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
 
          <Input
            type="password"
            placeholder="password"
            min={3}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="my-2"
          />
    
          <Link href={"/signup"} >Don&apos;t Have An Account?</Link> 
          <div className="flex w-full justify-end">
            <Button  disabled={isLoading}>Login</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    </>
  )
}
