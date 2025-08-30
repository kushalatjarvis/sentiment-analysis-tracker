import Image from "next/image";
import React from "react";

export const LocationCoverImages = ({
  images,
  name,
}: {
  images: string[];
  name: string;
}) => {
  return (
    <div className="rounded-xl grid grid-cols-1 sm:grid-cols-3 grid-rows-2 sm:grid-rows-1 max-h-90 md:max-h-120 lg:max-h-160 gap-1 overflow-hidden">
      <Image
        src={images[0]}
        alt={name}
        width={1000}
        height={1000}
        className="row-span-2 sm:row-span-1 sm:col-span-2 w-full h-full object-cover object-center"
      />

      <div className="sm:grid grid-rows-2 gap-1 h-full hidden">
        <div className="overflow-hidden">
          <Image
            src={images[1]}
            alt={name}
            width={1000}
            height={1000}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="overflow-hidden">
          <Image
            src={images[2]}
            alt={name}
            width={1000}
            height={1000}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};
