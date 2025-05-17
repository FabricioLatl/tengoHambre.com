import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Star, MapPin, Clock, Heart } from 'lucide-react-native';
import { Restaurant } from '@/types';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/hooks/useUser';

type RestaurantListItemProps = {
  restaurant: Restaurant;
};

export default function RestaurantListItem({ restaurant }: RestaurantListItemProps) {
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
      {/* Restaurant Image */}
      <Image source={{ uri: restaurant.coverImage }} style={styles.image} />
      
      {/* Favorite Button */}
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
      
      {/* Restaurant Info */}
      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <Text style={[styles.rating, { color: colors.text }]}>
              {restaurant.rating}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.cuisine, { color: colors.textSecondary }]}>
          {restaurant.cuisine} • {restaurant.priceRange}
        </Text>
        
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <MapPin size={14} color={colors.textSecondary} />
            <Text style={[styles.detailText, { color: colors.textSecondary }]} numberOfLines={1}>
              {restaurant.neighborhood}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={14} color={colors.textSecondary} />
            <Text 
              style={[
                styles.detailText, 
                { 
                  color: restaurant.isOpenNow ? colors.success : colors.error 
                }
              ]}
            >
              {restaurant.isOpenNow ? 'Abierto' : 'Cerrado'}
            </Text>
          </View>
        </View>
        
        {isPro && restaurant.hasDiscount && (
          <View style={[styles.discountTag, { backgroundColor: colors.primary }]}>
            <Text style={styles.discountText}>
              {restaurant.discountPercent}% descuento PRO
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginLeft: 4,
  },
  discountTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  discountText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
});