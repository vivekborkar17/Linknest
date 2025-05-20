"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function Home() {
  const [text, settext] = useState("");
  const router = useRouter();
  const userId = "defaultUser"; // Replace with actual user ID logic

  const createTree = () => {
    router.push(`/generate?handle=${text}&userId=${userId}`);
  };

  return (
    <main>
      <section className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 min-h-[100vh] grid grid-cols-2">
        <div className="flex flex-col justify-center items-start ml-[10vw] gap-10 mt-[10vh]">
          <h1 className="text-6xl font-extrabold text-white leading-tight">
            Everything you are. <br /> In one simple link in bio.
          </h1>
          <p className="text-lg font-medium text-white">
            Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate, and sell from your Instagram, TikTok, Twitter, YouTube, and other social media profiles.
          </p>
          <div className="flex gap-5">
            <input
              value={text}
              onChange={(e) => settext(e.target.value)}
              type="text"
              placeholder="linkne.st/your-url"
              className="bg-white p-5 px-8 rounded-xl text-gray-800 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={createTree}
              className="bg-purple-700 text-white p-5 rounded-full px-10 font-semibold shadow-md hover:bg-purple-800 transition-all"
            >
              Enter Your Handle
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center mr-[10vw]">
          <Image
            src="/home.png"
            alt="Homepage image"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
            unoptimized
          />
        </div>
      </section>
      <section className="bg-gray-100 min-h-[100vh] flex flex-col items-center py-20">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">
          Why Choose Linktree?
        </h2>
        <div className="grid grid-cols-3 gap-10 max-w-6xl">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-purple-700 mb-4">
              Easy to Use
            </h3>
            <p className="text-gray-600">
              Create your personalized link in bio in just a few clicks.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-purple-700 mb-4">
              Customizable
            </h3>
            <p className="text-gray-600">
              Add links, images, and descriptions to make it truly yours.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-purple-700 mb-4">
              Trusted by Millions
            </h3>
            <p className="text-gray-600">
              Join a community of creators and businesses worldwide.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
