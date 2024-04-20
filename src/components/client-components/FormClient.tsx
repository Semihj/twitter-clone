"use client";

import React, { useRef } from "react";
import { toast } from "sonner";

type formClientComp = {
  serverAction: any;
};

export default function FormClient({ serverAction }: formClientComp) {
  const resetBtn = useRef<HTMLButtonElement>(null)
  
  const handleSubmitTweet = async (data: any) => {
    try {
      const res = await serverAction(data);
      if(res?.error) {
       return toast.error(res.error.message)
      }
      console.log(res);
      toast.success("tweet sent succesfully!");
      resetBtn.current?.click()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      action={handleSubmitTweet}
      className=" flex items-stretch w-full space-x-2 p-2  border-t-[0.5px] border-b-[0.5px] border-gray-600 h-32 relative"
    >
      <div className="w-10 h-10 bg-slate-400 rounded-full flex-none cursor-pointer "></div>
      <div className="flex flex-col w-full  h-full">
        <div className="w-full border-gray-600  ">
          <input
            type="text"
            name="tweet"
            className="w-full h-full bg-transparent placeholder:text-2xl focus:outline-none border-gray-600 p-4  "
            placeholder="What's happening!"
          />
        </div>
        <div className="w-full justify-between items-center flex ">
          <div className=""></div>
          <div className="w-full max-w-[100px] ">
            <button
              type="submit"
              className="bg-primary px-4 py-2 text-white font-bold text-center text-lg rounded-full m-4 p-4 hover:bg-opacity-70 transition duration-200 "
            >
              {" "}
              Tweet
            </button>
            <button ref={resetBtn} type="reset" className="invisible"  ></button>
          </div>
        </div>
      </div>
    </form>
  );
}
