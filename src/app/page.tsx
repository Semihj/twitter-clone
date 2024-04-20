import LeftSideBar from "@/components/LeftSideBar";
import Main from "@/components/Main";
import RightSection from "@/components/RightSection";
import SupabaseProvider from "./supabase-provider";

export const revalidate = 0

export default function Home() {
  
  return (
    <div className="w-screen h-full flex justify-center items-center bg-black text-white ">
      <div className="  xl:max-w-[70vw] w-[90vw] h-full flex relative  ">
        <SupabaseProvider>
          <LeftSideBar />
          <Main />
          <RightSection />
        </SupabaseProvider>
      </div>
    </div>
  );
}
