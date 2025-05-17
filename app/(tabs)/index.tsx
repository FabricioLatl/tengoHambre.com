import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { Link } from 'expo-router';
import { getRestaurants } from '@/controllers/restaurantController';
import Header from '@/components/UI/Header';
import CategorySelector from '@/components/Home/CategorySelector';
import RestaurantCard from '@/components/Restaurant/RestaurantCard';
import FeaturedSection from '@/components/Home/FeaturedSection';
import { Restaurant } from '@/types';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
        // Filter featured restaurants (premium partners)
        setFeaturedRestaurants(data.filter(r => r.isPremiumPartner));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="TengoHambre" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Section */}
        <FeaturedSection restaurants={featuredRestaurants} />
        
        {/* Categories Section */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Categorías</Text>
          <CategorySelector />
        </View>
        
        {/* Recommended Section */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recomendados para ti</Text>
          <View style={styles.restaurantsGrid}>
            {loading ? (
              <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Cargando restaurantes...</Text>
            ) : (
              restaurants.slice(0, 6).map((restaurant) => (
                <Link 
                  key={restaurant.id} 
                  href={`/restaurant/${restaurant.id}`}
                  asChild
                >
                  <TouchableOpacity style={styles.restaurantCardContainer}>
                    <RestaurantCard restaurant={restaurant} />
                  </TouchableOpacity>
                </Link>
              ))
            )}
          </View>
        </View>
        
        {/* PRO Promotion Section */}
        <View style={[styles.proContainer, { backgroundColor: colors.primary }]}>
          <Text style={styles.proTitle}>¡Hazte PRO!</Text>
          <Text style={styles.proDescription}>
            Obtén descuentos exclusivos de 25-30% en nuestros restaurantes asociados
          </Text>
          <TouchableOpacity style={styles.proButton}>
            <Text style={styles.proButtonText}>Ver Beneficios</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  restaurantsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  restaurantCardContainer: {
    width: (width - 40) / 2,
    marginBottom: 16,
  },
  loadingText: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    padding: 20,
  },
  proContainer: {
    margin: 16,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  proTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#FFF',
    marginBottom: 8,
  },
  proDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  proButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  proButtonText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#C8102E', // Peruvian flag red
    fontSize: 14,
  },
  bottomPadding: {
    height: 80,
  },
});