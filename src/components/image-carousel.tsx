"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { CirclePause, CirclePlay } from "lucide-react";

export const ImageCarousel = () => {
  const images = [
    "/carousel/01.jpg",
    "/carousel/02.jpg",
    "/carousel/03.jpg",
    "/carousel/04.jpg",
    "/carousel/05.jpg",
    "/carousel/06.jpg",
    "/carousel/07.jpg",
  ];

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(1);
  const currentImage = images[currentImageIndex - 1];

  useEffect(() => {
    if (isPlaying) {
      console.log(currentImageIndex);
      if (currentImageIndex >= images.length) {
        intervalRef.current = setInterval(() => {
          setCurrentImageIndex(1);
        }, 2000);
      } else {
        intervalRef.current = setInterval(() => {
          setCurrentImageIndex((prev) => prev + 1);
        }, 2000);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentImageIndex, images.length]);

  return (
    <div className="w-full h-full overflow-hidden bg-primary max-w-7xl mx-auto my-12 rounded-xl p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 relative my-container">
      <div className="w-full rounded-sm sm:rounded-xl overflow-hidden h-48 sm:h-120">
        <Image
          src={currentImage}
          alt={currentImage}
          width={1000}
          height={1000}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="flex items-center gap-4 justify-between w-full h-full relative">
        {/* Border Right */}
        <div className="bg-black w-0.25 h-full sm:block hidden" />

        <div className="flex flex-col gap-4 justify-center items-center w-full">
          <h1 className="max-w-lg text-3xl sm:text-6xl font-bold text-center  sm:leading-13 tracking-tighter">
            Find things to do for everything you&apos;re into
          </h1>

          <p className="font-semibold text-xl my-0 sm:my-4  text-center">
            Browse 400,000+ experiences and book with us.
          </p>

          {/* <Button className="bg-black rounded-full py-6 px-8">
            Explore Experiences
          </Button> */}

          <div className="flex items-center gap-4 absolute right-0 bottom-0">
            <Button
              variant="none"
              onClick={() => setIsPlaying(!isPlaying)}
              className="cursor-pointer !size-4"
            >
              {isPlaying ? (
                <CirclePause className="size-6" />
              ) : (
                <CirclePlay className="size-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
