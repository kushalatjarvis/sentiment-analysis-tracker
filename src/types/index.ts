export interface ILocationSuggestion {
  name: string;
  slug: string;
  platform?: IPlatform[];
  description?: string;
  duration?: string;
  address?: string;
  website?: string;
  phone?: string;
  id?: number;
  image?: string[];
  city?: string;
  country?: string;
  link?: string;
  aircode?: string;
}

export interface IPlatform {
  name: "Trip Advisor" | "Booking.com" | "Expedia";
  slug: string;
  reviews: IReview[];
}

interface IReviewUser {
  name: string;
  contributions: {
    totalContributions: number;
  };
  userLocation: {
    name: string;
  };
  avatar: {
    image: string;
  };
}

// IPlaceInfo interface removed - no longer used in cleaned data
export interface IReview {
  id: string;
  title: string;
  rating: number;
  helpfulVotes: number;
  text: string;
  travelDate: string | null;
  tripType:
    | "FAMILY"
    | "COUPLES"
    | "FRIENDS"
    | "BUSINESS"
    | "SOLO"
    | "NONE"
    | null;
  user: IReviewUser | null;
  category: ("Pricing" | "Experience" | "Customer Support" | "Operations" | "Facilities")[];
  sentiment: "Positive" | "Negative" | "Neutral";
}
