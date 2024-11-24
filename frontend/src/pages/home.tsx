"use client";

import { useState } from "react";

import Login from "../components/auth/login";
import Register from "../components/auth/register";
import { usePageTitle } from '../components/common/usePageTitle';

export default function Home() {
  
  const [isRegister, setIsRegister] = useState(false);
  usePageTitle(isRegister ? "Register" : "Login");
  return (
    <div className="flex flex-row justify-end bg-zinc-50">
      <div className="absolute top-64 left-96 text-blue-800 text-9xl font-semibold">
        <div className="relative">
          <span className="inline-block transform -rotate-12 translate-y-2">bu</span>
          <span className="text-blue-600 inline-block transform rotate-12 translate-y-2">lingo</span>
        </div>
      </div>
      {isRegister ? (
        <Register setIsRegister={setIsRegister} />
      ) : (
        <Login setIsRegister={setIsRegister} />
      )}
    </div>
  );
}
