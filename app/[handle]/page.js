import Link from 'next/link';
import React from 'react';
import clientPromise from '@/lib/mongodb';
import ShareButton from '@/components/ShareButton';
import Image from 'next/image';
import InteractiveButtons from '@/components/InteractiveButtons';

export default async function Page({ params }) {
    const { handle } = params; // No need to await params
    let item;

    try {
        const client = await clientPromise;
        const db = client.db("linknest");
        const collection = db.collection("links");

        // Fetch the handle
        item = await collection.findOne({ handle: handle });
        if (!item) {
            return <div className="text-center text-2xl font-semibold mt-20 text-red-500">Handle not found!</div>;
        }
    } catch (error) {
        console.error("Database error:", error.message);
        return <div className="text-center text-2xl font-semibold mt-20 text-red-500">An error occurred while fetching the data.</div>;
    }

    return (
        <div className="flex min-h-screen items-center justify-center py-10 px-4 md:px-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            {item && (
                <div className="photo flex flex-col gap-8 items-center bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-lg">
                    <Image src={item.pic} alt="profile" width={128} height={128} className="rounded-full border-4 border-purple-500" unoptimized />
                    <span className="text-xl md:text-2xl font-bold text-purple-700">@{item.handle}</span>
                    <span className="text-2xl md:text-4xl font-extrabold text-purple-900 mt-2 text-center">{item.displayName}</span>
                    <span className="des w-full text-center text-gray-700">{item.desc}</span>
                    <div className="links flex flex-col gap-4 w-full">
                        {item.links.map((item, index) => (
                            <Link 
                                target="_blank" 
                                href={item.link.startsWith("http://") || item.link.startsWith("https://") ? item.link : `https://${item.link}`} 
                                key={index}
                            >
                                <div className="py-4 px-5 flex items-center justify-center w-full bg-purple-100 hover:bg-purple-200 rounded-md shadow-md transition-all">
                                    {item.linktext}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <ShareButton />
                    <InteractiveButtons
                        handle={item.handle}
                        keyValue={item.key}
                        links={item.links}
                        pic={item.pic}
                        desc={item.desc}
                    />
                </div>
            )}
        </div>
    );
}