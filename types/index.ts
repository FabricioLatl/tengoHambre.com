export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  address: string;
  neighborhood: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  reviewCount: number;
  priceRange: string;
  priceDescription: string;
  hours: string;
  phone: string;
  website?: string;
  isOpenNow: boolean;
  isPremiumPartner: boolean;
  hasDiscount: boolean;
  discountPercent: number;
  coverImage: string;
  photos: string[];
  isFavorite?: boolean;
  reviews: Review[];
  menu: MenuItem[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  date: string;
  photos?: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isPopular?: boolean;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isPro: boolean;
  proExpiryDate?: string;
  favoriteRestaurants: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}