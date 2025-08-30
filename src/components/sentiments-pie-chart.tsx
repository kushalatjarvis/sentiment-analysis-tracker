"use client";

import { Pie, PieChart } from "recharts";
import { useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IReview } from "@/types";

export const description = "A pie chart showing sentiment analysis of reviews";

const chartConfig = {
  count: {
    label: "Reviews",
  },
  positive: {
    label: "Positive",
    color: "var(--chart-2)",
  },
  negative: {
    label: "Negative",
    color: "var(--chart-3)",
  },
  neutral: {
    label: "Neutral",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

interface SentimentsPieChartProps {
  reviews: IReview[];
}

export function SentimentsPieChart({ reviews }: SentimentsPieChartProps) {
  const chartData = useMemo(() => {
    const sentimentCounts = reviews.reduce(
      (acc, review) => {
        // Handle undefined, null, or empty sentiment values
        const sentiment = review.sentiment?.toLowerCase();
        if (
          sentiment &&
          (sentiment === "positive" ||
            sentiment === "negative" ||
            sentiment === "neutral")
        ) {
          acc[sentiment as keyof typeof acc]++;
        }
        return acc;
      },
      { positive: 0, negative: 0, neutral: 0 }
    );

    return [
      {
        sentiment: "positive",
        count: sentimentCounts.positive,
        fill: "var(--chart-1)",
      },
      {
        sentiment: "negative",
        count: sentimentCounts.negative,
        fill: "var(--chart-2)",
      },
      {
        sentiment: "neutral",
        count: sentimentCounts.neutral,
        fill: "var(--chart-3)",
      },
    ].filter((item) => item.count > 0); // Only show sentiments that have reviews
  }, [reviews]);

  const totalReviews = reviews.length;
  const validSentimentReviews = useMemo(() => {
    return reviews.filter((r) => {
      const sentiment = r.sentiment?.toLowerCase();
      return (
        sentiment &&
        (sentiment === "positive" ||
          sentiment === "negative" ||
          sentiment === "neutral")
      );
    }).length;
  }, [reviews]);

  if (totalReviews === 0) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Sentiment Analysis</CardTitle>
          <CardDescription>No reviews available</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 flex items-center justify-center min-h-[250px]">
          <p className="text-muted-foreground">No data to display</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Sentiment Analysis</CardTitle>
        <CardDescription>
          Distribution of {validSentimentReviews} review
          {validSentimentReviews !== 1 ? "s" : ""} with sentiment data
          {totalReviews !== validSentimentReviews && (
            <span className="text-xs text-muted-foreground block">
              ({totalReviews - validSentimentReviews} review
              {totalReviews - validSentimentReviews !== 1 ? "s" : ""} missing
              sentiment)
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              label={({ sentiment, count }) => `${sentiment}: ${count}`}
              nameKey="sentiment"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
