import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Star, Heart } from 'lucide-react-native';
import { Restaurant } from '@/types';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/hooks/useUser';

type RestaurantCardProps = {
  restaurant: Restaurant;
};

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { colors } = useTheme();
  const { isPro } = useUser();
  const [isFavorite, setIsFavorite] = React.useState(restaurant.isFavorite || false);

  const toggleFavorite = (e: any) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // In a real app, this would call an API to update favorites
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundElevated }]}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: restaurant.coverImage }} style={styles.image} />
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={toggleFavorite}
        >
          <Heart 
            size={20} 
            color="#FFFFFF" 
            fill={isFavorite ? '#FF4D4D' : 'transparent'} 
          />
        </TouchableOpacity>
        {isPro && restaurant.hasDiscount && (
          <View style={[styles.discountBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.discountText}>{restaurant.discountPercent}%</Text>
          </View>
        )}
      </View>
      
      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text 
          style={[styles.restaurantName, { color: colors.text }]}
          numberOfLines={1}
        >
          {restaurant.name}
        </Text>
        
        <View style={styles.detailsRow}>
          <Text style={[styles.cuisine, { color: colors.textSecondary }]}>
            {restaurant.cuisine}
          </Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={[styles.rating, { color: colors.text }]}>
              {restaurant.rating}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.neighborhood, { color: colors.textSecondary }]} numberOfLines={1}>
          {restaurant.neighborhood}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    height: 120,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  infoContainer: {
    padding: 10,
  },
  restaurantName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cuisine: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginLeft: 2,
  },
  neighborhood: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
});