import { ILocationSuggestion } from "@/types";
import { ArrowUpRight, ClockFading } from "lucide-react";
import Link from "next/link";
import React from "react";

export const LocationInfo = ({
  activeLocation,
}: {
  activeLocation: ILocationSuggestion;
}) => {
  return (
    <section className="flex flex-col sm:flex-row justify-between items-start gap-8">
      <section className="flex-7/9 w-full">
        <h3 className="text-2xl font-bold my-6 mt-10">About</h3>

        {/* DESCRIPTION */}
        {activeLocation?.description && (
          <p className="text-lg text-gray-500">{activeLocation?.description}</p>
        )}

        {/* DURATION */}
        {activeLocation?.duration && (
          <p className="flex items-center gap-2 mt-4 font-semibold">
            <ClockFading className="w-4 h-4" />
            Duration :{" "}
            <span className="font-extralight">{activeLocation?.duration}</span>
          </p>
        )}
      </section>

      {/* OTHER DETAILS */}
      {activeLocation?.address && (
        <section className="flex-2/9 w-full">
          <h3 className="text-2xl font-bold my-6 mt-10">The area</h3>
          {/* ADDRESS */}
          {activeLocation?.address && (
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${activeLocation?.address}`}
              className="text-lg font-bold underline"
              target="_blank"
            >
              {activeLocation?.address}
            </Link>
          )}

          {/* CONTACT */}
          <h3 className="text-lg font-semibold my-2 mt-6">
            Reach out directly
          </h3>
          <div className="flex items-center gap-4">
            {/* WEBSITE */}
            {activeLocation?.website && (
              <Link
                href={activeLocation?.website}
                target="_blank"
                className="flex items-center underline font-bold text-xl"
              >
                Visit website <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}

            {activeLocation?.phone && (
              <Link
                href={activeLocation?.phone}
                target="_blank"
                className="flex items-center underline font-bold text-xl"
              >
                Call
              </Link>
            )}
          </div>
        </section>
      )}
    </section>
  );
};
