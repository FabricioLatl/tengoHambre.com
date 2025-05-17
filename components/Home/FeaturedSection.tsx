import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Star } from 'lucide-react-native';
import { Restaurant } from '@/types';
import { useTheme } from '@/context/ThemeContext';

type FeaturedSectionProps = {
  restaurants: Restaurant[];
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

export default function FeaturedSection({ restaurants }: FeaturedSectionProps) {
  const { colors } = useTheme();

  if (restaurants.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Destacados</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={CARD_WIDTH + 16}
        decelerationRate="fast"
      >
        {restaurants.map((restaurant) => (
          <Link 
            key={restaurant.id} 
            href={`/restaurant/${restaurant.id}`}
            asChild
          >
            <TouchableOpacity style={styles.card}>
              <Image
                source={{ uri: restaurant.coverImage }}
                style={styles.cardImage}
              />
              <View style={styles.overlay} />
              <View style={styles.cardContent}>
                {restaurant.isPremiumPartner && (
                  <View style={styles.premiumBadge}>
                    <Star size={12} color="#000000" fill="#FFD700" />
                    <Text style={styles.premiumText}>Premium</Text>
                  </View>
                )}
                <Text style={styles.cardTitle}>{restaurant.name}</Text>
                <View style={styles.cardDetails}>
                  <Text style={styles.cardCuisine}>{restaurant.cuisine}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingText}>{restaurant.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginLeft: 16,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
  card: {
    width: CARD_WIDTH,
    height: 200,
    marginHorizontal: 8,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  premiumText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: '#000000',
    marginLeft: 2,
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 4,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCuisine: {
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 4,
  },
});