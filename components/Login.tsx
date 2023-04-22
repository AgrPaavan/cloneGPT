"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const Login = () => {
  return (
    <div className="bg-[#74aa9c] h-screen flex flex-col items-center justify-center">
      <Image src="/gpt.svg" width={300} height={300} alt="OpenAI Logo" />
      <button
        className="text-white font-bold text-3xl animate-pulse"
        onClick={() => signIn("google")}
      >
        Sign In to use BetterGPT
      </button>
    </div>
  );
};

export default Login;
