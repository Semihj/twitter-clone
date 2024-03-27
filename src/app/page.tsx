import LeftSideBar from "@/components/LeftSideBar";
import Main from "@/components/Main";
import { BsSearch } from "react-icons/bs";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="max-w-[80vw] w-full h-full flex relative ">
        <LeftSideBar />
        <Main />
        <section className=" w-[30%]  flex flex-col items-stretch px-4  mt-4  h-screen  ">
          <div className="">
            <div className="relative w-full h-full">
              
              <input
                type="text"
                placeholder="Search Twitter"
                className="w-full outline-none peer focus:outline-primary transition duration-200 bg-neutral-900/90 h-full outline-[2px] outline rounded-full py-4 px-8"
              />
              <label htmlFor="search" className="absolute top-0 p-2 h-full flex items-center justify-center text-gray-500 peer-focus:text-primary ">
                <BsSearch className="w-5 h-5 " />
              </label>
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-neutral-900 my-4 ">
            <h2 className="p-4 font-bold text-2xl my-2 " >What's Happenning</h2>
            <div className="">
              {Array.from({length:5}).map((_,i) => (
                <div className="hover:bg-white/10 p-4 last:rounded-xl transition duration-200" key={i}>
                  <div className="font-bold text-lg" >#trending item {i +1} </div>
                  <div className="text-sm text-neutral-400 " >21.2k</div>
                </div>
              ))}
            </div>
         
          </div>
          <div className="flex flex-col rounded-xl bg-neutral-900 my-2 ">
            <h2 className="p-4 font-bold text-2xl my-2 " >Who to follow</h2>
            <div className="">
              {Array.from({length:4}).map((_,i) => (
                <div className="hover:bg-white/10 p-4 flex items-center space-x-4 w-full justify-between last:rounded-xl transition duration-200" key={i}>
                <div className="flex  gap-2 items-center"> <div className="w-10 h-10 bg-neutral-600 rounded-full"></div>
                  <div className="flex flex-col ">
                    <div className="font-bold text-white ">Other User</div>
                    <div className="text-gray-500 text-xs">@user123 </div>
                </div>   </div>
                  <div className=""><button className="rounded-full px-4 py-2 bg-white text-neutral-950" >Follow</button></div>
                </div>
              ))}
            </div>
         
          </div>
        </section>
      </div>
    </div>
  );
}
