import { PLATFORMS } from "@/data";
import Image from "next/image";
import React from "react";

export const PlatformSelection = () => {
  return (
    <div className="flex items-center justify-center gap-4 w-full max-w-5xl mx-auto">
      <ul className="flex w-full justify-between items-center gap-4">
        {PLATFORMS.map((platform) => (
          <li key={platform.id}>
            <Image
              className="rounded border-2 border-black p-2 w-full min-h-40 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-in-out"
              src={platform.image}
              alt={platform.name}
              width={1000}
              height={1000}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
