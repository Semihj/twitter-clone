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

export default function SignIn() {

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createBrowserClient("https://vyfwuyocdhdtrqsrtrgp.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5Znd1eW9jZGhkdHJxc3J0cmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1MzMzMjcsImV4cCI6MjAyNjEwOTMyN30.zWULDl9UDAloXr0vsPwNGiVsaw7lx4AtOod_3hoyxGA")
  
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const handleSignUp = async () => {
       const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });


  await  supabase.auth.getSession().then((res) => {
      console.log(res)
      if (!res.data.session) {
        setIsOpen(true);
        return;
      } 

      console.log(res.data.session.user);
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
            const { data, error } = await supabase
              .from("profiles")
              .select()
              .eq("username", username.trim());

            if (data && data?.length > 0) {
              return toast.error(
                "username already exists, please use another"
              );
            }

            const { data: signUpData, error: signUpError } =
              await supabase.auth.signUp({
                email: email.trim(),
                password:password,
                options: {
                  data: {
                    username,
                    full_name: fullName,
                  },
                  emailRedirectTo:"http://localhost:3000"
                },
              });

            if (signUpError) {
              return toast.error(signUpError.message);
            }
            toast.success("user created successfully");
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
            type="text"
            placeholder="username"
            min={3}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="my-2"
          />
          <Input
            type="password"
            placeholder="password"
            min={3}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="my-2"
          />
          <Input
            type="text"
            placeholder="your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="my-2"
          />
          <p className="text-sm text-gray-900 my-2">
            you will receive a login magic link!
          </p>
          <Link href={"/signin"} > Have An Account?</Link>

          <div className="flex w-full justify-end">
            <Button disabled={isLoading}>Sign Up</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    </>
  )
}
