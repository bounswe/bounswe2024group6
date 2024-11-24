"use client";

import { useState } from "react";

import Login from "../components/auth/login";
import Register from "../components/auth/register";
import { usePageTitle } from '../components/common/usePageTitle';

export default function Home() {
  const [isRegister, setIsRegister] = useState(false);
  usePageTitle(isRegister ? "Register" : "Login");
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center bg-zinc-50">
      {/* Logo Section */}
      <div className="w-full md:w-2/3 flex justify-center items-center p-8">
        <div className="text-blue-800 text-7xl md:text-9xl font-semibold">
          <div className="relative">
            <span className="inline-block transform -rotate-12 translate-y-2">bu</span>
            <span className="text-blue-600 inline-block transform rotate-12 translate-y-2">lingo</span>
          </div>
        </div>
      </div>

      {/* Auth Section */}
      <div className="w-full md:w-1/3 h-full bg-white shadow-xl">
        <div className="flex justify-center items-center min-h-screen p-8">
          {isRegister ? (
            <Register setIsRegister={setIsRegister} />
          ) : (
            <Login setIsRegister={setIsRegister} />
          )}
        </div>
      </div>
    </div>
  );
}
