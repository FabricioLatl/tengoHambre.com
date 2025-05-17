import { User } from '@/types';

// Mock login function
export const loginUser = async (email: string, password: string): Promise<User> => {
  // In a real app, this would be an API call to authenticate the user
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        // Simulate successful login with mock user data
        resolve({
          id: '1',
          email,
          displayName: 'Usuario Demo',
          photoURL: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
          isPro: false,
          favoriteRestaurants: [],
          createdAt: new Date().toISOString(),
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

// Mock registration function
export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  // In a real app, this would be an API call to register a new user
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name && email && password) {
        // Simulate successful registration with mock user data
        resolve({
          id: Math.random().toString(36).substring(2, 9),
          email,
          displayName: name,
          favoriteRestaurants: [],
          isPro: false,
          createdAt: new Date().toISOString(),
        });
      } else {
        reject(new Error('Invalid registration data'));
      }
    }, 1000);
  });
};

// Mock function to get the current user
export const getCurrentUser = async (): Promise<User | null> => {
  // In a real app, this would check local storage or a token
  return Promise.resolve(null);
};

// Mock logout function
export const logoutUser = async (): Promise<void> => {
  // In a real app, this would clear tokens and session data
  return Promise.resolve();
};

// Mock password reset function
export const resetPassword = async (email: string): Promise<boolean> => {
  // In a real app, this would trigger a password reset email
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};