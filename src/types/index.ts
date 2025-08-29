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
  userId: string;
  name: string;
  contributions: {
    totalContributions: number;
    helpfulVotes: number;
  };
  username: string;
  userLocation: {
    shortName: string;
    name: string;
    id: string;
  };
  avatar: {
    id: string;
    width: number;
    height: number;
    image: string;
  };
  link: string;
}

interface IPlaceInfo {
  id: string;
  name: string;
  rating: number;
  numberOfReviews: number;
  locationString: string;
  latitude: number;
  longitude: number;
  webUrl: string;
  website: string;
  address: string;
  addressObj: {
    street1: string;
    street2: null;
    city: string;
    state: string;
    country: string;
    postalcode: string;
  };
  ratingHistogram: {
    count1: number;
    count2: number;
    count3: number;
    count4: number;
    count5: number;
  };
}
export interface IReview {
  id: string;
  url: string;
  title: string;
  lang: string;
  locationId: string;
  publishedDate: string;
  publishedPlatform: string;
  rating: number;
  helpfulVotes: number;
  text: string;
  roomTip: string | null;
  travelDate: string;
  tripType: "Family" | "Couple" | "Friends" | "Business" | "Other";
  user: IReviewUser;
  ownerResponse: null;
  subratings: [];
  photos: [];
  placeInfo: IPlaceInfo;
}
