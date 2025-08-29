"use client";

import { VerificationBadge } from "@/components/icon/badge";
import { PlatformSelection } from "@/components/platform-selection";
import { Reviews } from "@/components/reviews";
import Loader from "@/components/ui/loader";
import { REVIEWS } from "@/data/reviews";
import { isValidPlatform } from "@/lib/utils";
import { ILocationSuggestion, IPlatform, IReview } from "@/types";
import { ArrowUpRight, ClockFading } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const PlaceById = () => {
  const { slug } = useParams();
  const router = useRouter();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const searchParams = useSearchParams();
  const platform = searchParams.get("platform");

  const [isLoading, setIsLoading] = useState(true);
  const [activeLocation, setActiveLocation] = useState<ILocationSuggestion>();
  const [activePlatform, setActivePlatform] = useState<IPlatform>();
  const [allReviews, setAllReviews] = useState<IReview[]>([]);

  useEffect(() => {
    setIsLoading(true);

    try {
      // if no place, redirect to home
      if (!slug) {
        router.push("/");
        throw new Error("Place not found");
      }

      const activePlace = REVIEWS.find((r) => r.slug === slug);

      if (!activePlace) {
        router.push("/");
        throw new Error("Place not found");
      }

      setActiveLocation(activePlace as ILocationSuggestion);

      // if no platform, redirect to trip-advisor
      if (!platform || (platform && !isValidPlatform(platform))) {
        router.push(`/${slug}`);
        throw new Error("Platform not found");
      }

      const activePlatform = activePlace?.platform.find(
        (p) => p.slug === platform
      );

      if (!activePlatform) {
        router.push(`/${slug}`);
        throw new Error("Platform not found");
      }

      setActivePlatform(activePlatform as IPlatform);

      timer.current = setTimeout(() => {
        setAllReviews(activePlatform.reviews as IReview[]);
        setIsLoading(false);
      }, 2500);
    } catch (error) {
      console.log(error);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [slug, platform, router]);

  if (!activeLocation) {
    return null;
  }

  if (!activePlatform) {
    return <PlatformSelection className="absolute inset-0 " />;
  }

  if (isLoading) {
    return (
      <main className="absolute inset-0 min-h-screen flex flex-col items-center justify-center bg-secondary w-full">
        <Loader
          location={activeLocation?.city || "Florida"}
          aircode={activeLocation?.aircode}
        />

        <p className="mt-8 text-lg font-bold">
          Let&apos;s go to {activeLocation?.city}...
        </p>
      </main>
    );
  }

  return (
    <main className="pt-20 my-container">
      <h1 className="text-4xl font-bold capitalize text-left max-sm:my-8 my-6">
        {activeLocation?.name}{" "}
        <span className="text-primary-foreground inline-block cursor-pointer">
          <VerificationBadge />
        </span>
      </h1>

      {activeLocation?.image && activeLocation.image.length > 0 && (
        <div className="rounded-xl grid grid-cols-1 sm:grid-cols-3 grid-rows-2 sm:grid-rows-1 max-h-90 md:max-h-120 lg:max-h-160 gap-1 overflow-hidden">
          <Image
            src={activeLocation.image[0]}
            alt={activeLocation?.name}
            width={1000}
            height={1000}
            className="row-span-2 sm:row-span-1 sm:col-span-2 w-full h-full object-cover object-center"
          />

          <div className="sm:grid grid-rows-2 gap-1 h-full hidden">
            <div className="overflow-hidden">
              <Image
                src={activeLocation.image[1]}
                alt={activeLocation?.name}
                width={1000}
                height={1000}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="overflow-hidden">
              <Image
                src={activeLocation.image[2]}
                alt={activeLocation?.name}
                width={1000}
                height={1000}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      )}

      <section className="flex flex-col sm:flex-row justify-between items-start gap-8">
        {/* ABOUT */}
        <section className="flex-7/9 w-full">
          <h3 className="text-2xl font-bold my-6 mt-10">About</h3>

          {/* DESCRIPTION */}
          {activeLocation?.description && (
            <p className="text-lg text-gray-500">
              {activeLocation?.description}
            </p>
          )}

          {/* DURATION */}
          {activeLocation?.duration && (
            <p className="flex items-center gap-2 mt-4 font-semibold">
              <ClockFading className="w-4 h-4" />
              Duration :{" "}
              <span className="font-extralight">
                {activeLocation?.duration}
              </span>
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

      <Reviews allReviews={allReviews} />
    </main>
  );
};

export default PlaceById;
