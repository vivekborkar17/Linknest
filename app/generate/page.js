"use client";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import { useSearchParams } from "next/navigation";


const Generate =  () => {
    const searchParams = useSearchParams();
    const [links, setLinks] = useState([{link: '', linktext: ''}]);
    const [handle, sethandlle] = useState(searchParams.get("handle"));
    const [pic, setpic] = useState('');
    const [desc, setdesc] = useState('');

    const handleChange = (index,link,linktext) => {
      setLinks((initialLinks)=>{
        return initialLinks.map((item,i)=>{
            if(i==index){
                return {link, linktext}
            }
            else{
                return item
            }
        })
      })
    }
    const addLink = (params) => {
      setLinks(links.concat([{link: '', linktext: ''}]))
    }
    
    



    const submitLinks = async   ( ) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "links": links,
          "handle": handle,
          "pic": pic,
          "desc": desc
        });
        console.log(raw)
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        const r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/add`, requestOptions);
        const result = await r.json()
        if(result.success){
          toast.success(result.message)
          setLinks([])
          setpic('')
          sethandlle('')
          setdesc('')

        }
        else{
            toast.error(result.message)
        }
    }
    
  return (
    
    <div className="bg-[#254F1A] min-h-[100vh] grid grid-cols-2 ">
      <div className="col1 flex flex-col justify-center items-center ml-[10vw] gap-10 mt-[10vh]">
        <h1 className="font-bold text-4xl ">Create Your Linknest</h1>
        <div className="flex flex-col gap-4">
          <div className="item">
            <h1 className="font-semibold text-2xl ">
              Step 1: Add your social handle links
            </h1>
            <input
              className="px-4 py-2 bg-white rounded-4xl"
              type="text"
              value={handle || ""}
              onChange={e=>{sethandlle(e.target.value)}}
              placeholder="Choose a Handle"
            />
          </div>
          <h1 className="font-semibold text-2xl ">Step 2: Add your links</h1>
          {links && links.map((item,index)=>{
            return <div  key ={index} className="item ">
            <input
              className="px-4 py-2 bg-white rounded-4xl"
              type="text"
              value={item.link || ""}
              onChange={e=>{handleChange(index,e.target.value,item.linktext)}}
              placeholder="Enter link"
            />
            <input
              className="px-4 mx-2 py-2 bg-white rounded-4xl"
              type="text"
              value={item.linktext || ""}
              onChange={e=>{handleChange(index,item.link,e.target.value)}}
              placeholder="Enter link text"
            />
          </div>
          })
}            <button onClick={()=>addLink()} className="bg-slate-900 -white py-2 w-fit rounded-full px-10 font-semibold">
              + Add Link
            </button>
          <h1 className="font-semibold text-2xl ">
            Step 3: Add a profile picture and description
            </h1>
            <div className="item flex flex-col gap-5 ">

            <input
              className="px-4 py-2 bg-white rounded-4xl"
              type="text"
              value={pic || ""}
              onChange={e=>{setpic(e.target.value)}}
              placeholder="Enter link your picture"
            />
            <input
              className="px-4 py-2 bg-white rounded-4xl"
              type="text"
              value={desc || ""}
              onChange={e=>{setdesc(e.target.value)}}
              placeholder="Enter your description"
            />
            <button disabled={pic==""|| handle=="" || links[0].linktext==""} onClick={()=>{submitLinks()}} className="bg-slate-900 disabled:bg-slate-700 w-fit text-white py-2  rounded-full px-10 font-semibold mx-2">
              Create your Linknest
            </button>
            </div>
            <ToastContainer />

          
        </div>
      </div>
      <div className="col2">
        <img
          className="w-full h-screen"
          src="/generate.png"
          alt="Generate your page"
        />
      </div>
    </div>
  );
};

export default Generate;
