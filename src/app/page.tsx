import LeftSideBar from "@/components/LeftSideBar";
import RightSection from "@/components/RightSection";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="max-w-[80vw] w-full h-full flex relative ">
        <LeftSideBar />
        <Main />
      <RightSection/>
      </div>
    </div>
  );
}
