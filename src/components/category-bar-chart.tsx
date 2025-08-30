"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

export const description = "Category breakdown showing sentiment percentages";

const chartConfig = {
  positive: {
    label: "Positive",
    color: "var(--chart-2)",
  },
  negative: {
    label: "Negative",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function CategoryBarChart({ reviews }: { reviews: IReview[] }) {
  const chartData = useMemo(() => {
    // Get all unique categories from reviews
    const allCategories = new Set<
      | "Pricing"
      | "Experience"
      | "Customer Support"
      | "Operations"
      | "Facilities"
    >();
    reviews.forEach((review) => {
      review.category?.forEach((cat) => allCategories.add(cat));
    });

    // Process data for each category
    return Array.from(allCategories)
      .map((category) => {
        const categoryReviews = reviews.filter((review) =>
          review.category?.includes(category)
        );

        const totalCategoryReviews = categoryReviews.length;
        const positiveReviews = categoryReviews.filter(
          (review) => review.sentiment?.toLowerCase() === "positive"
        ).length;
        const negativeReviews = categoryReviews.filter(
          (review) => review.sentiment?.toLowerCase() === "negative"
        ).length;

        const positivePercentage =
          totalCategoryReviews > 0
            ? Math.round((positiveReviews / totalCategoryReviews) * 100)
            : 0;
        const negativePercentage =
          totalCategoryReviews > 0
            ? Math.round((negativeReviews / totalCategoryReviews) * 100)
            : 0;

        return {
          category,
          positive: positivePercentage,
          negative: negativePercentage,
          totalReviews: totalCategoryReviews,
        };
      })
      .sort((a, b) => b.totalReviews - a.totalReviews); // Sort by total reviews
  }, [reviews]);

  const totalReviews = reviews.length;
  const categoriesWithData = chartData.filter(
    (item) => item.totalReviews > 0
  ).length;

  if (totalReviews === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
          <CardDescription>No reviews available</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[250px]">
          <p className="text-muted-foreground">No data to display</p>
        </CardContent>
      </Card>
    );
  }

  if (categoriesWithData === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
          <CardDescription>No category data available</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[250px]">
          <p className="text-muted-foreground">
            {totalReviews} review{totalReviews !== 1 ? "s" : ""} found, but no
            category data available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>
          Sentiment percentages by category ({categoriesWithData} categories)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="positive" fill="var(--chart-2)" radius={4} />
            <Bar dataKey="negative" fill="var(--chart-3)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
