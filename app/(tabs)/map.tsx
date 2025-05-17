import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'expo-router';
import { MapPin, Search, X } from 'lucide-react-native';
import { TextInput } from 'react-native-gesture-handler';
import { getRestaurants } from '@/controllers/restaurantController';
import RestaurantBottomSheet from '@/components/Map/RestaurantBottomSheet';
import { Restaurant } from '@/types';
import { useTheme } from '@/context/ThemeContext';

// Only import MapView and related components when not on web
let MapView: any;
let Marker: any;
let PROVIDER_GOOGLE: any;
let darkMapStyle: any;

if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
  darkMapStyle = require('@/constants/mapStyles').darkMapStyle;
}

export default function MapScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const mapRef = useRef<any>(null);
  const { colors } = useTheme();
  
  const initialRegion = {
    latitude: -12.0464,
    longitude: -77.0428,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };
    
    fetchData();
  }, []);

  const handleMarkerPress = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsBottomSheetVisible(true);
    
    // Animate to the selected restaurant location
    mapRef.current?.animateToRegion({
      latitude: restaurant.coordinates.latitude,
      longitude: restaurant.coordinates.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 300);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetVisible(false);
    setSelectedRestaurant(null);
  };

  const filteredRestaurants = searchQuery
    ? restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : restaurants;

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.backgroundElevated }]}>
        <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Buscar restaurantes, cocina o zonas"
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <X size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Map */}
      {Platform.OS === 'web' ? (
        <View style={styles.webMapPlaceholder}>
          <Text style={{ color: colors.text, textAlign: 'center', fontFamily: 'Poppins-Medium' }}>
            Mapa interactivo disponible en aplicación móvil.
          </Text>
          <View style={styles.webRestaurantsList}>
            {filteredRestaurants.map(restaurant => (
              <Link 
                key={restaurant.id} 
                href={`/restaurant/${restaurant.id}`}
                asChild
              >
                <TouchableOpacity style={[styles.webRestaurantItem, { backgroundColor: colors.backgroundElevated }]}>
                  <MapPin size={18} color={colors.primary} />
                  <View style={styles.webRestaurantInfo}>
                    <Text style={[styles.webRestaurantName, { color: colors.text }]}>{restaurant.name}</Text>
                    <Text style={{ color: colors.textSecondary, fontFamily: 'Poppins-Regular', fontSize: 12 }}>
                      {restaurant.neighborhood} • {restaurant.cuisine}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          provider={PROVIDER_GOOGLE}
          customMapStyle={darkMapStyle}
        >
          {filteredRestaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              coordinate={restaurant.coordinates}
              title={restaurant.name}
              description={restaurant.cuisine}
              onPress={() => handleMarkerPress(restaurant)}
            >
              <View style={[
                styles.markerContainer, 
                { backgroundColor: restaurant.isPremiumPartner ? colors.primary : colors.markerDefault }
              ]}>
                <MapPin size={14} color="#FFFFFF" />
              </View>
            </Marker>
          ))}
        </MapView>
      )}

      {/* Bottom Sheet for Selected Restaurant */}
      {selectedRestaurant && (
        <RestaurantBottomSheet
          restaurant={selectedRestaurant}
          isVisible={isBottomSheetVisible}
          onClose={closeBottomSheet}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 10,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  clearButton: {
    padding: 4,
  },
  markerContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webMapPlaceholder: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  webRestaurantsList: {
    width: '100%',
    maxWidth: 500,
    marginTop: 20,
  },
  webRestaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  webRestaurantInfo: {
    marginLeft: 12,
  },
  webRestaurantName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginBottom: 2,
  },
});