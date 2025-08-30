"use client";

import { VerificationBadge } from "@/components/icons/badge";
import { LocationCoverImages } from "@/components/location/location-cover-images";
import { LocationDashboard } from "@/components/location/location-dashboard";
import { PlatformSelection } from "@/components/platform-selection";
import { Reviews } from "@/components/location/reviews";
import Loader from "@/components/ui/loader";
import { REVIEWS } from "@/data/reviews";
import { isValidPlatform } from "@/lib/utils";
import { ILocationSuggestion, IPlatform, IReview } from "@/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { LocationInfo } from "@/components/location/location-info";
import { timings } from "@/lib/variables";

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
      }, timings.location.delay);
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

      {/* COVER IMAGES */}
      {activeLocation?.image && activeLocation.image.length > 0 && (
        <LocationCoverImages
          images={activeLocation?.image}
          name={activeLocation?.name}
        />
      )}

      {/* ABOUT */}
      <LocationInfo activeLocation={activeLocation} />

      {/* LOCATION DASHBOARD */}
      <LocationDashboard reviews={allReviews} />

      {/* REVIEWS */}
      <Reviews allReviews={allReviews} />
    </main>
  );
};

export default PlaceById;
