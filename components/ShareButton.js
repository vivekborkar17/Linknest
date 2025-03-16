"use client"; // Ensures this runs on the client side

import React from 'react';

export default function ShareButton() {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    text: 'Check out this amazing page!',
                    url: window.location.href,
                });
                console.log('Page shared successfully!');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback for unsupported browsers
            await navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <button
            onClick={handleShare}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
            Share This Page
        </button>
    );
}
