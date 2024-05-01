import React from "react";

export default function Home() {
  return (
    <div className="absolute inset-0 -z-10 flex flex-col justify-center items-center h-full w-full px-5 py-24" style={{ background: 'radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)' }}>
      {/* Title and Description */}
      <h1 className="scroll-m-20 text-7xl font-extrabold tracking-tight p-4
      bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">Squarify</h1>
      <p className="scroll-m-20 text-xl font-semibold tracking-tight max-w-md text-center">
        Web app to track expenses - as a group. Effortlessly manage owed dues and view past outings using custom groups. 🤑
      </p>
    </div>
  );
}

