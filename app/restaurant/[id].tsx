import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  Platform 
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Phone, 
  Clock, 
  DollarSign,
  Star, 
  MessageSquare,
  Image as ImageIcon,
  Bookmark,
  Menu
} from 'lucide-react-native';
import Animated, { 
  useAnimatedScrollHandler, 
  useAnimatedStyle, 
  useSharedValue, 
  interpolate, 
  Extrapolation 
} from 'react-native-reanimated';
import { getRestaurantById } from '@/controllers/restaurantController';
import MenuSection from '@/components/Restaurant/MenuSection';
import PhotoGallery from '@/components/Restaurant/PhotoGallery';
import ReviewsList from '@/components/Restaurant/ReviewsList';
import { useUser } from '@/hooks/useUser';
import { useTheme } from '@/context/ThemeContext';
import { Restaurant as RestaurantType } from '@/types';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { darkMapStyle } from '@/constants/mapStyles';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 300;

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams();
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [activeTab, setActiveTab] = useState('menu');
  const [isFavorite, setIsFavorite] = useState(false);
  const { isPro } = useUser();
  const { colors } = useTheme();
  
  const scrollY = useSharedValue(0);
  
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const data = await getRestaurantById(id as string);
        setRestaurant(data);
        setIsFavorite(data.isFavorite || false);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };
    
    fetchRestaurant();
  }, [id]);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
        [1, 0.5, 0],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT],
            [0, -HEADER_HEIGHT / 2],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const navbarAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolate(
        scrollY.value,
        [0, HEADER_HEIGHT - 60],
        ['transparent', colors.backgroundElevated],
        Extrapolation.CLAMP
      ),
    };
  });

  const navbarTitleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [HEADER_HEIGHT - 80, HEADER_HEIGHT - 40],
        [0, 1],
        Extrapolation.CLAMP
      ),
    };
  });

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // This would call an API to update favorites in a real app
  };

  const handleShare = () => {
    // This would trigger share functionality in a real app
    alert('Compartir restaurante');
  };

  if (!restaurant) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Cargando restaurante...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Animated Header */}
      <Animated.View 
        style={[
          styles.header, 
          headerAnimatedStyle
        ]}
      >
        <Image 
          source={{ uri: restaurant.coverImage }} 
          style={styles.coverImage} 
        />
        <View style={styles.headerOverlay} />
      </Animated.View>

      {/* Navbar */}
      <Animated.View style={[styles.navbar, navbarAnimatedStyle]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Animated.Text 
          style={[
            styles.navbarTitle, 
            navbarTitleAnimatedStyle,
            { color: colors.text }
          ]}
          numberOfLines={1}
        >
          {restaurant.name}
        </Animated.Text>
        
        <View style={styles.navbarRightButtons}>
          <TouchableOpacity style={styles.navbarButton} onPress={toggleFavorite}>
            <Heart 
              size={24} 
              color="#FFFFFF" 
              fill={isFavorite ? '#FF4D4D' : 'transparent'} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navbarButton} onPress={handleShare}>
            <Share2 size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Content */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentContainer}>
          {/* Restaurant Info Card */}
          <View style={[styles.infoCard, { backgroundColor: colors.backgroundElevated }]}>
            <View style={styles.titleRow}>
              <Text style={[styles.restaurantName, { color: colors.text }]}>
                {restaurant.name}
              </Text>
              {restaurant.isPremiumPartner && (
                <View style={styles.premiumBadge}>
                  <Star size={12} color="#000000" fill="#FFD700" />
                  <Text style={styles.premiumText}>Premium</Text>
                </View>
              )}
            </View>
            
            <View style={styles.cuisineRow}>
              <Text style={[styles.cuisineText, { color: colors.textSecondary }]}>
                {restaurant.cuisine}
              </Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Text style={[styles.ratingText, { color: colors.text }]}>
                  {restaurant.rating} ({restaurant.reviewCount})
                </Text>
              </View>
            </View>
            
            {isPro && restaurant.discountPercent > 0 && (
              <View style={[styles.discountBadge, { backgroundColor: colors.primary }]}>
                <Text style={styles.discountText}>
                  {restaurant.discountPercent}% descuento PRO
                </Text>
              </View>
            )}
          </View>
          
          {/* Details */}
          <View style={[styles.detailsCard, { backgroundColor: colors.backgroundElevated }]}>
            <View style={styles.detailRow}>
              <MapPin size={18} color={colors.primary} />
              <Text style={[styles.detailText, { color: colors.text }]}>
                {restaurant.address}, {restaurant.neighborhood}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Phone size={18} color={colors.primary} />
              <Text style={[styles.detailText, { color: colors.text }]}>
                {restaurant.phone}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Clock size={18} color={colors.primary} />
              <Text style={[styles.detailText, { color: colors.text }]}>
                {restaurant.isOpenNow ? 'Abierto ahora • ' : 'Cerrado ahora • '} 
                {restaurant.hours}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <DollarSign size={18} color={colors.primary} />
              <Text style={[styles.detailText, { color: colors.text }]}>
                {restaurant.priceRange} • {restaurant.priceDescription}
              </Text>
            </View>
          </View>
          
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[
                styles.tabButton, 
                activeTab === 'menu' && { borderBottomColor: colors.primary }
              ]}
              onPress={() => setActiveTab('menu')}
            >
              <Menu size={18} color={activeTab === 'menu' ? colors.primary : colors.textSecondary} />
              <Text 
                style={[
                  styles.tabText, 
                  { 
                    color: activeTab === 'menu' ? colors.primary : colors.textSecondary 
                  }
                ]}
              >
                Menú
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.tabButton, 
                activeTab === 'reviews' && { borderBottomColor: colors.primary }
              ]}
              onPress={() => setActiveTab('reviews')}
            >
              <MessageSquare size={18} color={activeTab === 'reviews' ? colors.primary : colors.textSecondary} />
              <Text 
                style={[
                  styles.tabText, 
                  { 
                    color: activeTab === 'reviews' ? colors.primary : colors.textSecondary 
                  }
                ]}
              >
                Reseñas
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.tabButton, 
                activeTab === 'photos' && { borderBottomColor: colors.primary }
              ]}
              onPress={() => setActiveTab('photos')}
            >
              <ImageIcon size={18} color={activeTab === 'photos' ? colors.primary : colors.textSecondary} />
              <Text 
                style={[
                  styles.tabText, 
                  { 
                    color: activeTab === 'photos' ? colors.primary : colors.textSecondary 
                  }
                ]}
              >
                Fotos
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === 'menu' && (
              <MenuSection menu={restaurant.menu} colors={colors} />
            )}
            
            {activeTab === 'reviews' && (
              <ReviewsList reviews={restaurant.reviews} restaurantId={restaurant.id} colors={colors} />
            )}
            
            {activeTab === 'photos' && (
              <PhotoGallery photos={restaurant.photos} colors={colors} />
            )}
          </View>
          
          {/* Map Section */}
          <View style={styles.mapSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Ubicación</Text>
            
            {Platform.OS === 'web' ? (
              <View style={[styles.webMapPlaceholder, { backgroundColor: colors.backgroundElevated }]}>
                <MapPin size={24} color={colors.primary} />
                <Text style={[styles.webMapText, { color: colors.text }]}>
                  {restaurant.address}, {restaurant.neighborhood}
                </Text>
              </View>
            ) : (
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: restaurant.coordinates.latitude,
                    longitude: restaurant.coordinates.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
                  provider={PROVIDER_GOOGLE}
                  customMapStyle={darkMapStyle}
                >
                  <Marker
                    coordinate={restaurant.coordinates}
                    title={restaurant.name}
                  >
                    <View style={[styles.markerContainer, { backgroundColor: colors.primary }]}>
                      <MapPin size={14} color="#FFFFFF" />
                    </View>
                  </Marker>
                </MapView>
              </View>
            )}
          </View>
        </View>
      </Animated.ScrollView>
      
      {/* Bottom Action Bar */}
      <View style={[styles.bottomBar, { backgroundColor: colors.backgroundElevated }]}>
        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: colors.backgroundElevated, borderColor: colors.primary }]}
          onPress={toggleFavorite}
        >
          <Heart 
            size={20} 
            color={colors.primary} 
            fill={isFavorite ? colors.primary : 'transparent'} 
          />
          <Text style={[styles.saveButtonText, { color: colors.primary }]}>
            {isFavorite ? 'Guardado' : 'Guardar'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.reserveButton, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.reserveButtonText}>Reservar mesa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    paddingTop: Platform.OS === 'ios' ? 40 : 30,
    paddingHorizontal: 16,
    zIndex: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    maxWidth: 200,
  },
  navbarRightButtons: {
    flexDirection: 'row',
  },
  navbarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  scrollContent: {
    paddingTop: HEADER_HEIGHT - 20,
    paddingBottom: 100,
  },
  contentContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  restaurantName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    flex: 1,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  premiumText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: '#000000',
    marginLeft: 2,
  },
  cuisineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cuisineText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  discountBadge: {
    marginTop: 12,
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  discountText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  detailsCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginLeft: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 6,
  },
  tabContent: {
    marginBottom: 24,
  },
  mapSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  webMapPlaceholder: {
    height: 100,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  webMapText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 8,
  },
  markerContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 1,
    marginRight: 12,
  },
  saveButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 6,
  },
  reserveButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  reserveButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});