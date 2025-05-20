"use client";

import React from 'react';

export default function InteractiveButtons({ handle, keyValue, links, pic, desc, userId }) {
    const handleDelete = async () => {
        const userKey = prompt("Enter the key to delete this page:");
        if (userKey !== keyValue) {
            alert("Invalid key!");
            return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/delete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ handle, key: userKey, userId }),
        });

        const result = await response.json();
        if (result.success) {
            alert("Page deleted successfully!");
            window.location.href = "/";
        } else {
            alert(result.message);
        }
    };

    const handleEdit = () => {
        const userKey = prompt("Enter the key to edit this page:");
        if (userKey !== keyValue) {
            alert("Invalid key!");
            return;
        }

        // Redirect to the generate page with pre-filled data
        const query = new URLSearchParams({
            handle,
            key: userKey,
            links: JSON.stringify(links),
            pic,
            desc,
            userId,
        }).toString();
        window.location.href = `/generate?${query}`;
    };

    return (
        <div className="flex gap-4">
            <button
                onClick={handleEdit}
                className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-all"
            >
                Edit Page
            </button>
            <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-red-600 transition-all"
            >
                Delete Page
            </button>
        </div>
    );
}
