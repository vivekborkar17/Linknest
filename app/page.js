"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {


  const [text, settext] = useState("")
  const router = useRouter()

  const createTree = (params) => {
    
    router.push(`/generate?handle=${text}`) 
      
  }
  return (
    
    
    <main>
      <section className="bg-[#254F1A] min-h-[100vh] grid grid-cols-2 ">
      <div className="justify-center items-center flex flex-col ml-[10vw] gap-10 mt-[10vh]">

      <h1 className="text-7xl font-bold text-[#D2E823]">Everything you are.In one ,simple link in bio.</h1>
      <p className="text-mb font-bold text-[#D2E823]">Join 50M+ people using Linktree for their link in bio.  One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
      <div className="flex gap-5">
        <input value={text} onChange={(e)=>{settext(e.target.value)}} type="text" placeholder="linkne.st/your-url" className="bg-white p-5 px-8 rounded-xl text-gray-950 font-bold"  />
        <button onClick={()=>createTree()} className="bg-[#E3BAE4] p-5  rounded-full px-10 font-semibold">Enter Your handle</button>
      </div>

      </div>
      <div className="justify-center items-start flex flex-col mr-[10vw]">
        <img src="/home.png" alt="homapage image" />


      </div>

        
      </section>
      <section className="bg-red-500 min-h-[100vh]">
       

      </section>
    </main>
  );
}
