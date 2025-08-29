import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidPlatform = (platform: string) => {
  return (
    platform === decodeURIComponent("trip-advisor") ||
    platform === decodeURIComponent("booking.com") ||
    platform === decodeURIComponent("expedia")
  );
};

export const formatTravelDate = (dateString: string | null): string => {
  if (!dateString) return "";

  // Handle YYYY-MM format
  const dateRegex = /^(\d{4})-(\d{2})$/;
  const match = dateString.match(dateRegex);

  if (match) {
    const [, year, month] = match;
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthIndex = parseInt(month, 10) - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${monthNames[monthIndex]} ${year}`;
    }
  }

  // Return original string if format doesn't match
  return dateString;
};
