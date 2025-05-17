import { Restaurant, MenuItem, Review } from '@/types';
import { mockRestaurants } from '@/data/mockRestaurants';

// Get all restaurants
export const getRestaurants = async (): Promise<Restaurant[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRestaurants);
    }, 500);
  });
};

// Get restaurant by ID
export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const restaurant = mockRestaurants.find((r) => r.id === id);
      if (restaurant) {
        resolve(restaurant);
      } else {
        reject(new Error('Restaurant not found'));
      }
    }, 500);
  });
};

// Get restaurants by category
export const getRestaurantsByCategory = async (category: string): Promise<Restaurant[]> => {
  // In a real app, this would be an API call with filtering
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredRestaurants = mockRestaurants.filter(
        (r) => r.cuisine.toLowerCase() === category.toLowerCase()
      );
      resolve(filteredRestaurants);
    }, 500);
  });
};

// Get popular restaurants
export const getPopularRestaurants = async (): Promise<Restaurant[]> => {
  // In a real app, this would be an API call with sorting
  return new Promise((resolve) => {
    setTimeout(() => {
      const popularRestaurants = [...mockRestaurants]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
      resolve(popularRestaurants);
    }, 500);
  });
};

// Get restaurants with discounts (for PRO users)
export const getDiscountRestaurants = async (): Promise<Restaurant[]> => {
  // In a real app, this would be an API call with filtering
  return new Promise((resolve) => {
    setTimeout(() => {
      const discountRestaurants = mockRestaurants.filter(
        (r) => r.hasDiscount && r.discountPercent > 0
      );
      resolve(discountRestaurants);
    }, 500);
  });
};

// Add a review to a restaurant
export const addReview = async (
  restaurantId: string,
  review: Omit<Review, 'id' | 'date'>
): Promise<Review> => {
  // In a real app, this would be an API call to add a review
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReview: Review = {
        ...review,
        id: Math.random().toString(36).substring(2, 9),
        date: new Date().toISOString(),
      };
      
      // Find the restaurant and add the review (in a real app, this would update a database)
      const restaurantIndex = mockRestaurants.findIndex(r => r.id === restaurantId);
      if (restaurantIndex >= 0) {
        mockRestaurants[restaurantIndex].reviews.unshift(newReview);
        mockRestaurants[restaurantIndex].reviewCount++;
        
        // Recalculate average rating
        const totalRating = mockRestaurants[restaurantIndex].reviews.reduce(
          (sum, r) => sum + r.rating, 0
        );
        mockRestaurants[restaurantIndex].rating = parseFloat(
          (totalRating / mockRestaurants[restaurantIndex].reviews.length).toFixed(1)
        );
      }
      
      resolve(newReview);
    }, 500);
  });
};

// Get restaurant menu
export const getRestaurantMenu = async (restaurantId: string): Promise<MenuItem[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const restaurant = mockRestaurants.find((r) => r.id === restaurantId);
      if (restaurant) {
        resolve(restaurant.menu);
      } else {
        reject(new Error('Restaurant not found'));
      }
    }, 500);
  });
};

// Search restaurants
export const searchRestaurants = async (
  query: string,
  filters?: {
    cuisine?: string;
    neighborhood?: string;
    priceRange?: string;
    onlyDiscounts?: boolean;
  }
): Promise<Restaurant[]> => {
  // In a real app, this would be an API call with search parameters
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = mockRestaurants;
      
      // Apply text search
      if (query) {
        results = results.filter(
          (restaurant) =>
            restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
            restaurant.cuisine.toLowerCase().includes(query.toLowerCase()) ||
            restaurant.neighborhood.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // Apply filters
      if (filters) {
        if (filters.cuisine) {
          results = results.filter((r) => r.cuisine === filters.cuisine);
        }
        
        if (filters.neighborhood) {
          results = results.filter((r) => r.neighborhood === filters.neighborhood);
        }
        
        if (filters.priceRange) {
          results = results.filter((r) => r.priceRange === filters.priceRange);
        }
        
        if (filters.onlyDiscounts) {
          results = results.filter((r) => r.hasDiscount);
        }
      }
      
      resolve(results);
    }, 500);
  });
};