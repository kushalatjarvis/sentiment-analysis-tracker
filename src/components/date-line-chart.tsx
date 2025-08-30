"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
import { timings } from "@/lib/variables";

export const description =
  "A sentiment trend line chart showing sentiment scores over time";

// Helper function to format date for grouping
const formatDateForGrouping = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // YYYY-MM-DD format
};

// Helper function to process reviews and create chart data
const processReviewsForChart = (reviews: IReview[]) => {
  const dateGroups = new Map<
    string,
    {
      total: number;
      positive: number;
      neutral: number;
      negative: number;
    }
  >();

  reviews.forEach((review) => {
    // Use review date or fallback to a default date if not available
    const reviewDate =
      review.travelDate || new Date().toISOString().split("T")[0];
    const dateKey = formatDateForGrouping(reviewDate);

    if (!dateGroups.has(dateKey)) {
      dateGroups.set(dateKey, {
        total: 0,
        positive: 0,
        neutral: 0,
        negative: 0,
      });
    }

    const group = dateGroups.get(dateKey)!;
    group.total += 1;

    switch (review.sentiment) {
      case "Positive":
        group.positive += 1;
        break;
      case "Neutral":
        group.neutral += 1;
        break;
      case "Negative":
        group.negative += 1;
        break;
    }
  });

  // Convert to chart data format and sort by date
  const chartData = Array.from(dateGroups.entries())
    .map(([date, counts]) => ({
      date,
      totalReviews: counts.total,
      positive: counts.positive,
      neutral: counts.neutral,
      negative: counts.negative,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return chartData;
};

const chartConfig = {
  totalReviews: {
    label: "Total Reviews",
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

export function DateLineChart({ reviews }: { reviews: IReview[] }) {
  const [activeSentiment, setActiveSentiment] =
    React.useState<keyof typeof chartConfig>("totalReviews");

  const chartData = React.useMemo(
    () => processReviewsForChart(reviews),
    [reviews]
  );

  const sentimentTotals = React.useMemo(
    () => ({
      totalReviews: chartData.reduce((acc, curr) => acc + curr.totalReviews, 0),
      positive: chartData.reduce((acc, curr) => acc + curr.positive, 0),
      neutral: chartData.reduce((acc, curr) => acc + curr.neutral, 0),
      negative: chartData.reduce((acc, curr) => acc + curr.negative, 0),
    }),
    [chartData]
  );

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Trend Over Time</CardTitle>
          <CardDescription>
            {/* Sentiment trend across dates based on {totalReviews} reviews */}
          </CardDescription>
        </div>
        <div className="flex">
          {(["totalReviews", "positive", "neutral", "negative"] as const).map(
            (sentiment) => {
              return (
                <button
                  key={sentiment}
                  data-active={activeSentiment === sentiment}
                  className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                  onClick={() => setActiveSentiment(sentiment)}
                >
                  <span className="text-muted-foreground text-xs">
                    {chartConfig[sentiment].label}
                  </span>
                  <span className="text-lg leading-none font-bold sm:text-3xl">
                    {sentimentTotals[sentiment].toLocaleString()}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {activeSentiment === "totalReviews" ? (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value: string | number) => {
                  const date = new Date(value.toString());
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[0, "dataMax"]}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[200px]"
                    labelFormatter={(value: string) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Line
                dataKey="positive"
                type="monotone"
                stroke="var(--chart-2)"
                strokeWidth={2}
                dot={false}
                name="Positive"
              />

              <Line
                dataKey="negative"
                type="monotone"
                stroke="var(--chart-3)"
                strokeWidth={2}
                dot={false}
                name="Negative"
              />
              <Line
                dataKey="neutral"
                type="monotone"
                stroke="var(--chart-4)"
                strokeWidth={2}
                dot={false}
                name="Neutral"
              />
            </LineChart>
          </ChartContainer>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value: string | number) => {
                  const date = new Date(value.toString());
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[0, "dataMax"]}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[200px]"
                    nameKey={activeSentiment}
                    labelFormatter={(value: string) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />

              <Line
                dataKey={activeSentiment}
                type="monotone"
                stroke={`var(--color-${activeSentiment})`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
