import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { Link } from 'expo-router';
import { Star, X, MapPin, Heart, ArrowRight } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { Restaurant } from '@/types';

type RestaurantBottomSheetProps = {
  restaurant: Restaurant;
  isVisible: boolean;
  onClose: () => void;
};

export default function RestaurantBottomSheet({
  restaurant,
  isVisible,
  onClose,
}: RestaurantBottomSheetProps) {
  const { colors } = useTheme();
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const [isFavorite, setIsFavorite] = React.useState(restaurant.isFavorite || false);

  useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, this would call an API to update favorites
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { 
          backgroundColor: colors.backgroundElevated,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.handleBar} />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.restaurantInfo}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: restaurant.coverImage }} style={styles.image} />
          {restaurant.isPremiumPartner && (
            <View style={styles.premiumBadge}>
              <Star size={12} color="#000000" fill="#FFD700" />
              <Text style={styles.premiumText}>Premium</Text>
            </View>
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.restaurantName, { color: colors.text }]}>
            {restaurant.name}
          </Text>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <Text style={[styles.rating, { color: colors.text }]}>
              {restaurant.rating} ({restaurant.reviewCount})
            </Text>
          </View>
          
          <Text style={[styles.cuisine, { color: colors.textSecondary }]}>
            {restaurant.cuisine} • {restaurant.priceRange}
          </Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={14} color={colors.primary} />
            <Text style={[styles.location, { color: colors.textSecondary }]}>
              {restaurant.neighborhood}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.favoriteButton, { borderColor: colors.borderColor }]} 
          onPress={toggleFavorite}
        >
          <Heart 
            size={20} 
            color={colors.primary} 
            fill={isFavorite ? colors.primary : 'transparent'} 
          />
        </TouchableOpacity>
        
        <Link 
          href={`/restaurant/${restaurant.id}`}
          asChild
          style={[styles.viewDetailsButton, { backgroundColor: colors.primary }]}
        >
          <TouchableOpacity>
            <Text style={styles.viewDetailsText}>Ver detalles</Text>
            <ArrowRight size={16} color="#FFFFFF" style={styles.arrowIcon} />
          </TouchableOpacity>
        </Link>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 12,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#666',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 8,
    padding: 8,
  },
  restaurantInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  premiumText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 8,
    color: '#000000',
    marginLeft: 2,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  restaurantName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  cuisine: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 12,
  },
  viewDetailsButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDetailsText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    fontSize: 14,
  },
  arrowIcon: {
    marginLeft: 8,
  },
});