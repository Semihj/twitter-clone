import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { IoShareOutline, IoStatsChart } from "react-icons/io5";
export default function Main() {
    
  return (
    <main className="w-[60%] py-4 flex mx-2 h-full min-h-screen flex-col  border-l-[0.5px] border-r-[0.5px] border-t-[0] border-b-[0] border-gray-600">
    <h1 className="text-xl font-bold my-4 p-6 backdrop-blur-md sticky top-0 bg-black/10">
      Home
    </h1>
    <div className=" flex items-stretch  space-x-2 p-2  border-t-[0.5px] border-b-[0.5px] border-gray-600 h-32 relative">
      <div className="w-10 h-10 bg-slate-400 rounded-full flex-none cursor-pointer "></div>
      <div className="flex flex-col w-full  h-full">
        <div className="w-full border-gray-600  ">
          <input
            type="text"
            className="w-full h-full bg-transparent placeholder:text-2xl focus:outline-none border-gray-600 p-4  "
            placeholder="What's happening!"
          />
        </div>
        <div className="w-full justify-between items-center flex ">
          <div className=""></div>
          <div className="w-full max-w-[100px] ">
            <button className="bg-primary px-4 py-2 text-white font-bold text-center text-lg rounded-full m-4 p-4 hover:bg-opacity-70 transition duration-200 ">
              {" "}
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          className="p-4 border-t-[0.5px]  flex space-x-4 border-gray-600 "
          key={i}
        >
          <div className="h-full">
            <div className="w-10 h-10 bg-slate-400 rounded-full cursor-pointer"></div>
          </div>
          <div className="flex flex-col space-y-2 ">
            <div className="flex items-center space-x-1 " >
              <div className="font-bold text-lg cursor-pointer">Semih</div>
              <div className="text-gray-400 text-sm">@semih_devv</div>
              <div className="flex items-center text-gray-400 text-sm">
                <BsDot />
                <span>50m</span>
              </div>
              <div className="flex w-full justify-end">
                <div className="rounded-full hover:bg-white/10 p-2 transition duration-200">
                <BsThreeDots className="cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="text-white text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
              architecto unde reiciendis laborum quos animi delectus eos
              temporibus maiores aliquam consequuntur repellat voluptatem,
              labore facere laboriosam obcaecati fuga harum id amet. Non
              tenetur dolorem corporis voluptate ad nemo at asperiores rem
            </div>
            <div className="bg-slate-400 aspect-square h-96 rounded-xl"></div>
            <div className="flex items-center space-x-2 w-full justify-between ">
              <div className="rounded-full hover:bg-white/10 cursor-pointer p-2 transit duration-200 ">
                <BsChat  className="text-xl "/>
              </div>
              <div className="rounded-full hover:bg-white/10 cursor-pointer p-2 transit duration-200 ">
                <AiOutlineRetweet  className="text-xl "/>
              </div>
              <div className="rounded-full hover:bg-white/10 cursor-pointer p-2 transit duration-200 ">
                <AiOutlineHeart className="text-xl " />
              </div>
              <div className="rounded-full hover:bg-white/10 cursor-pointer p-2 transit duration-200 ">
                <IoStatsChart className="text-xl " />
              </div>
              <div className="rounded-full hover:bg-white/10 cursor-pointer p-2 transit duration-200 ">
                <IoShareOutline className="text-xl " />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </main>
  )
}
