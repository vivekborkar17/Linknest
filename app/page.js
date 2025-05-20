"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function Home() {
  const [text, settext] = useState("");
  const router = useRouter();
  const userId = "defaultUser"; // Replace with actual user ID logic

  const createTree = () => {
    if (!text.trim()) {
      alert("Please enter a valid handle.");
      return;
    }

    try {
      router.push(`/generate?handle=${text}&userId=${userId}`);
    } catch (error) {
      console.error("Error navigating to generate page:", error.message);
      alert("An error occurred while navigating to the generate page.");
    }
  };

  return (
    <main>
      <section className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 min-h-[100vh] grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center items-start px-6 md:ml-[10vw] gap-10 mt-[10vh]">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight text-center md:text-left">
            Everything you are. <br /> In one simple link in bio.
          </h1>
          <p className="text-base md:text-lg font-medium text-white text-center md:text-left">
            Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate, and sell from your Instagram, TikTok, Twitter, YouTube, and other social media profiles.
          </p>
          <div className="flex flex-col md:flex-row gap-5 w-full max-w-md">
            <input
              value={text}
              onChange={(e) => settext(e.target.value)}
              type="text"
              placeholder="linkne.st/your-url"
              className="w-full bg-white p-4 md:p-5 rounded-xl text-gray-800 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={createTree}
              className="bg-purple-700 text-white py-3 md:py-5 px-6 md:px-10 rounded-full font-semibold shadow-md hover:bg-purple-800 transition-all"
            >
              Enter Your Handle
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center px-6 md:mr-[10vw]">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full px-4">
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
