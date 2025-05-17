import { User, Restaurant } from '@/types';
import { mockRestaurants } from '@/data/mockRestaurants';

// Get user favorites
export const getFavoriteRestaurants = async (): Promise<Restaurant[]> => {
  // In a real app, this would fetch the user's favorite restaurants from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate favorite restaurants (random selection of 4 restaurants)
      const favorites = mockRestaurants
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      
      resolve(favorites);
    }, 500);
  });
};

// Toggle restaurant as favorite
export const toggleFavorite = async (
  userId: string,
  restaurantId: string
): Promise<{ success: boolean; isFavorite: boolean }> => {
  // In a real app, this would be an API call to add/remove a restaurant from favorites
  return new Promise((resolve) => {
    setTimeout(() => {
      const isFavorite = Math.random() > 0.5; // Randomly determine if it's now a favorite or not
      resolve({ success: true, isFavorite });
    }, 500);
  });
};

// Get user profile
export const getUserProfile = async (userId: string): Promise<User> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        email: 'usuario@ejemplo.com',
        displayName: 'Usuario Demo',
        photoURL: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        isPro: Math.random() > 0.5, // Randomly determine if user is PRO
        proExpiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        favoriteRestaurants: [],
        createdAt: new Date().toISOString(),
      });
    }, 500);
  });
};

// Update user profile
export const updateUserProfile = async (
  userId: string,
  profileData: Partial<User>
): Promise<User> => {
  // In a real app, this would be an API call to update user profile
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        email: profileData.email || 'usuario@ejemplo.com',
        displayName: profileData.displayName || 'Usuario Demo',
        photoURL: profileData.photoURL || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        isPro: profileData.isPro || false,
        proExpiryDate: profileData.proExpiryDate,
        favoriteRestaurants: profileData.favoriteRestaurants || [],
        createdAt: profileData.createdAt || new Date().toISOString(),
      });
    }, 500);
  });
};

// Subscribe user to PRO
export const subscribeToPro = async (
  userId: string
): Promise<{ success: boolean; user: User }> => {
  // In a real app, this would be an API call to handle payment and subscription
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedUser: User = {
        id: userId,
        email: 'usuario@ejemplo.com',
        displayName: 'Usuario Demo',
        photoURL: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        isPro: true,
        proExpiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        favoriteRestaurants: [],
        createdAt: new Date().toISOString(),
      };
      
      resolve({ success: true, user: updatedUser });
    }, 500);
  });
};