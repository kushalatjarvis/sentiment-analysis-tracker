"use client";

import { PLATFORMS } from "@/data";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { useRouter } from "next/navigation";

export const PlatformSelection = ({
  className,
}: {
  className?: ClassValue;
}) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "my-container flex flex-col items-center justify-center gap-4 w-full h-screen -pt-16 max-w-7xl",
        className
      )}
    >
      <h2 className="text-3xl font-black mb-4 sm:mb-0">
        Select the platform :
      </h2>

      <ul className="flex flex-col sm:flex-row justify-center items-center gap-4 px-8">
        {PLATFORMS.map((platform) => (
          <li key={platform.id}>
            <Button
              className="cursor-pointer rounded-lg border-2 border-black p-2 w-full min-h-28 sm:min-h-40 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-in-out bg-transparent hover:bg-transparent shadow-none"
              onClick={() => {
                router.push(
                  `?platform=${encodeURIComponent(
                    platform.name.toLowerCase().replace(" ", "-")
                  )}`
                );
              }}
            >
              <Image
                className="sm:w-full px-16 max-sm:aspect-video h-full object-contain"
                src={platform.image}
                alt={platform.name}
                width={1000}
                height={1000}
                priority
              />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
