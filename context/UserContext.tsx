import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getCurrentUser } from '@/controllers/authController';
import { User } from '@/types';

type UserContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isPro: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
  isPro: false,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export const useUser = () => useContext(UserContext);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = !!user;
  
  const isPro = isLoggedIn && user.isPro;

  useEffect(() => {
    // Try to load user from storage on app start
    const initializeUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    initializeUser();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        isPro,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext }