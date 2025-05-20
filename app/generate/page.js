"use client";
import React, { Suspense } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from 'next/image';

const GenerateContent = () => {
    const searchParams = useSearchParams();
    const [links, setLinks] = useState(() => {
        const linksParam = searchParams.get("links");
        return linksParam ? JSON.parse(linksParam) : [{ link: '', linktext: '' }];
    });
    const [handle, setHandle] = useState(searchParams.get("handle") || "");
    const [pic, setPic] = useState(searchParams.get("pic") || "");
    const [desc, setDesc] = useState(searchParams.get("desc") || "");
    const [key, setKey] = useState(searchParams.get("key") || "");
    const [displayName, setDisplayName] = useState(searchParams.get("displayName") || "");
    const [userId, setUserId] = useState(searchParams.get("userId") || "defaultUser");

    const handleChange = (index, link, linktext) => {
        setLinks((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i === index) {
                    return { link, linktext };
                } else {
                    return item;
                }
            });
        });
    };

    const addLink = () => {
        setLinks(links.concat([{ link: '', linktext: '' }]));
    };

    const submitLinks = async () => {
        if (!handle.trim()) {
            toast.error("Handle cannot be empty.");
            return;
        }

        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                links,
                handle,
                pic,
                desc,
                key,
                displayName,
                userId,
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/add`, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                toast.success(result.message);
                setLinks([]);
                setPic('');
                setHandle('');
                setDesc('');
                setKey('');
                setDisplayName('');
                window.location.href = `/${handle}?userId=${userId}`;
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Error submitting data:", error.message);
            toast.error("An error occurred while submitting the form.");
        }
    };

    return (
        <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 min-h-screen grid grid-cols-1 md:grid-cols-2 pb-14 pt-32">
            <div className="col1 flex flex-col justify-center items-center px-6 md:ml-[10vw] gap-10 mt-[10vh]">
                <h1 className="font-bold text-3xl md:text-4xl text-white text-center">Create Your Linknest</h1>
                <div className="flex flex-col gap-4 w-full max-w-md">
                    <div className="item">
                        <h1 className="font-semibold text-xl md:text-2xl text-white">
                            Step 1: Add your social handle links
                        </h1>
                        <input
                            className="w-full px-4 py-2 bg-white rounded-4xl shadow-md"
                            type="text"
                            value={handle || ""}
                            onChange={e => { setHandle(e.target.value); }}
                            placeholder="Choose a Handle"
                        />
                    </div>
                    <h1 className="font-semibold text-xl md:text-2xl text-white">Step 2: Add your display name</h1>
                    <input
                        className="w-full px-4 py-2 bg-white rounded-4xl shadow-md"
                        type="text"
                        value={displayName || ""}
                        onChange={e => { setDisplayName(e.target.value); }}
                        placeholder="Enter display name"
                    />
                    <h1 className="font-semibold text-xl md:text-2xl text-white">Step 3: Add your links</h1>
                    {links && links.map((item, index) => (
                        <div key={index} className="item flex flex-col md:flex-row gap-4">
                            <input
                                className="w-full px-4 py-2 bg-white rounded-4xl shadow-md"
                                type="text"
                                value={item.link || ""}
                                onChange={e => { handleChange(index, e.target.value, item.linktext); }}
                                placeholder="Enter link"
                            />
                            <input
                                className="w-full px-4 py-2 bg-white rounded-4xl shadow-md"
                                type="text"
                                value={item.linktext || ""}
                                onChange={e => { handleChange(index, item.link, e.target.value); }}
                                placeholder="Enter link text"
                            />
                        </div>
                    ))}
                    <button
                        onClick={addLink}
                        className="bg-purple-700 text-white py-2 px-6 rounded-full shadow-md hover:bg-purple-800 transition-all"
                    >
                        + Add Link
                    </button>
                    <h1 className="font-semibold text-xl md:text-2xl text-white">
                        Step 4: Add a profile picture and description
                    </h1>
                    <div className="item flex flex-col gap-5">
                        <input
                            className="w-full px-4 py-2 bg-white rounded-4xl shadow-md"
                            type="text"
                            value={pic || ""}
                            onChange={e => { setPic(e.target.value); }}
                            placeholder="Enter link to your picture"
                        />
                        <input
                            className="w-full px-4 py-2 bg-white rounded-4xl shadow-md"
                            type="text"
                            value={desc || ""}
                            onChange={e => { setDesc(e.target.value); }}
                            placeholder="Enter your description"
                        />
                        <button
                            disabled={!pic || !handle || !links[0].linktext}
                            onClick={submitLinks}
                            className="bg-purple-700 disabled:bg-purple-500 text-white py-2 px-10 rounded-full shadow-md hover:bg-purple-800 transition-all"
                        >
                            Create your Linknest
                        </button>
                    </div>
                    <h1 className="font-semibold text-xl md:text-2xl text-white">
                        Step 5: Add a key for editing or deleting the page
                    </h1>
                    <input
                        className="w-full px-4 py-2 bg-white rounded-4xl shadow-md"
                        type="text"
                        value={key || ""}
                        onChange={e => setKey(e.target.value)}
                        placeholder="Enter a key for editing or deleting"
                        disabled={!!searchParams.get("key")}
                    />
                    <ToastContainer />
                </div>
            </div>
            <div className="col2 hidden md:flex justify-center items-center">
                <Image src="/generate.png" alt="Generate your page" layout="responsive" width={700} height={400} unoptimized />
            </div>
        </div>
    );
};

const Generate = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenerateContent />
        </Suspense>
    );
};

export default Generate;
