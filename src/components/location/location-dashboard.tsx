import { IReview } from "@/types";
import React from "react";
import { SentimentsPieChart } from "../sentiments-pie-chart";
import { CategoryBarChart } from "../category-bar-chart";
import { DateLineChart } from "../date-line-chart";

export const LocationDashboard = ({ reviews }: { reviews: IReview[] }) => {
  return (
    <div className="w-full mt-8 min-h-72">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SentimentsPieChart reviews={reviews} />
        <CategoryBarChart reviews={reviews} />
      </div>

      <div className="mt-6">
        <DateLineChart reviews={reviews} />
      </div>
    </div>
  );
};
