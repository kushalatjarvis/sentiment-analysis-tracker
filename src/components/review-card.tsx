"use client";

import React, { useState } from "react";
import { IReview } from "@/types";
import { Star, ThumbsUp } from "lucide-react";
import { cn, formatTravelDate } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

interface IReviewCardProps {
  review: IReview;
}

export const ReviewCard = ({ review }: IReviewCardProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <li className="p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center">
        {/* User Info */}
        {review.user && (
          <div className="flex items-center gap-4">
            {review.user?.avatar?.image && (
              <Image
                src={review.user?.avatar?.image}
                alt={review.user.name}
                width={40}
                height={40}
                className="size-10 rounded-full"
              />
            )}

            <div className="flex flex-col">
              {review.user?.name && (
                <h2 className="text-lg font-semibold">{review.user.name}</h2>
              )}

              {review.user?.contributions?.totalContributions && (
                <p className="text-xs text-gray-500">
                  {review.user?.userLocation?.name}
                  {review.user?.userLocation?.name && " • "}
                  {review.user.contributions.totalContributions} contributions
                </p>
              )}
            </div>
          </div>
        )}

        {/* Helpful Votes */}
        <div className="flex items-center gap-1 my-4">
          <ThumbsUp size={16} className="fill-orange-500" />
          {review.helpfulVotes}
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1 my-4">
        {Array.from(Array(5).fill(review.rating)).map((_, index) => (
          <Star
            key={index}
            size={16}
            className={cn(
              "fill-orange-500",
              index > review.rating && "fill-gray-300"
            )}
          />
        ))}
      </div>

      {/* Review title */}
      <h2 className="text-lg font-semibold">{review.title}</h2>

      {/* Date and trip type */}
      {(review.tripType || review.travelDate) && (
        <p className="text-sm text-gray-500 my-2">
          {formatTravelDate(review.travelDate)} •{" "}
          <span className="capitalize">{review?.tripType.toLowerCase()}</span>
        </p>
      )}

      {/* Review Text */}
      <p className="text-sm text-gray-500">
        {isCollapsed ? review.text : review.text.slice(0, 180)}
      </p>

      {review.text.length > 180 && (
        <Button
          variant="link"
          className="text-sm text-gray-500 mt-2 underline cursor-pointer p-0"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {!isCollapsed ? "Read more" : "Read less"}
        </Button>
      )}
    </li>
  );
};
