"use client";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gray-800 fixed bottom-0 w-full text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex space-x-4">
                    <a href="https://github.com/vivekborkar17" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-2xl hover:text-gray-400 transition" />
                    </a>
                    <a href="https://www.linkedin.com/in/vivek-borkar-6b1ba0215" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-2xl hover:text-gray-400 transition" />
                    </a>
                    <a href="https://x.com/iamvivekborkak?t=Kihge-aiZwPip-T-ma6D_g&s=09" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-2xl hover:text-gray-400 transition" />
                    </a>
                    <a href="https://www.instagram.com/iamvivekkkkkk/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-2xl hover:text-gray-400 transition" />
                    </a>
                </div>
                <div className="text-sm">
                    Made by <span className="font-bold">Vivek ❤️</span>
                </div>
            </div>
        </footer>
    );
}
