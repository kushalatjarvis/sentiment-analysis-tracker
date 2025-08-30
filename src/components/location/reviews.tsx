import React, { useState } from "react";
import { ReviewCard } from "@/components/review-card";
import { IReview } from "@/types";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Loader } from "lucide-react";

export const Reviews = ({ allReviews }: { allReviews: IReview[] }) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const reviewsPerPage = 9;
  const [offset, setOffset] = useState(reviewsPerPage);
  const [activeReviews, setActiveReviews] = useState<IReview[]>(
    allReviews.slice(0, reviewsPerPage)
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleViewMore = () => {
    setIsLoading(true);
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setActiveReviews(allReviews.slice(0, offset + reviewsPerPage));
      setOffset(offset + reviewsPerPage);
      setIsLoading(false);
    }, 1000);
  };

  return (
    activeReviews &&
    activeReviews.length > 0 && (
      <section>
        <h3 className="text-2xl font-bold my-6 text-center mt-20 sm:mt-10">
          See what travellers are saying
        </h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ul>

        <div className="flex w-full justify-center items-center my-10">
          {allReviews.length > activeReviews.length && (
            <Button
              onClick={handleViewMore}
              className="font-medium text-sm w-full sm:w-auto bg-secondary-foreground hover:bg-secondary-foreground/90 text-secondary !cursor-pointer h-12 min-w-20 px-8"
            >
              {isLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                "View more"
              )}
            </Button>
          )}
        </div>
      </section>
    )
  );
};
