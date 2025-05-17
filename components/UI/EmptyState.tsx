import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Heart, User, Map, Bookmark, Search } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

type EmptyStateProps = {
  title: string;
  message: string;
  buttonText?: string;
  buttonLink?: string;
  icon: 'heart' | 'user' | 'map' | 'bookmark' | 'search';
};

export default function EmptyState({
  title,
  message,
  buttonText,
  buttonLink,
  icon,
}: EmptyStateProps) {
  const { colors } = useTheme();
  
  const renderIcon = () => {
    const size = 64;
    const color = colors.textSecondary;
    
    switch (icon) {
      case 'heart':
        return <Heart size={size} color={color} />;
      case 'user':
        return <User size={size} color={color} />;
      case 'map':
        return <Map size={size} color={color} />;
      case 'bookmark':
        return <Bookmark size={size} color={color} />;
      case 'search':
        return <Search size={size} color={color} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: colors.backgroundElevated }]}>
        {renderIcon()}
      </View>
      
      <Text style={[styles.title, { color: colors.text }]}>
        {title}
      </Text>
      
      <Text style={[styles.message, { color: colors.textSecondary }]}>
        {message}
      </Text>
      
      {buttonText && buttonLink && (
        <Link href={buttonLink} asChild>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});