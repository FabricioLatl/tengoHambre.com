import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { UserProvider } from '@/context/UserContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <UserProvider>
        <Stack screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: '#121212' }
        }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ 
            headerShown: false,
            presentation: 'fullScreenModal',
            animation: 'fade' 
          }} />
          <Stack.Screen name="restaurant/[id]" options={{ 
            headerShown: false,
            presentation: 'card',
            animation: 'slide_from_right',
          }} />
          <Stack.Screen name="auth/login" options={{ 
            headerShown: false,
            presentation: 'modal',
          }} />
          <Stack.Screen name="auth/signup" options={{ 
            headerShown: false, 
            presentation: 'modal',
          }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="light" />
      </UserProvider>
    </ThemeProvider>
  );
}