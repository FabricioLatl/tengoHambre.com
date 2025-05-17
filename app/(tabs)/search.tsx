import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { Search, X, Filter } from 'lucide-react-native';
import { getRestaurants } from '@/controllers/restaurantController';
import RestaurantListItem from '@/components/Restaurant/RestaurantListItem';
import FilterModal from '@/components/Search/FilterModal';
import { Restaurant } from '@/types';
import { useTheme } from '@/context/ThemeContext';

export default function SearchScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    cuisines: [] as string[],
    neighborhoods: [] as string[],
    priceRange: [] as string[],
    onlyDiscounts: false,
    onlyOpen: false
  });
  const { colors } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
        setFilteredRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters]);

  const applyFilters = () => {
    let results = restaurants;
    
    // Apply text search
    if (searchQuery) {
      results = results.filter(
        restaurant =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply cuisine filter
    if (filters.cuisines.length > 0) {
      results = results.filter(restaurant => 
        filters.cuisines.includes(restaurant.cuisine)
      );
    }
    
    // Apply neighborhood filter
    if (filters.neighborhoods.length > 0) {
      results = results.filter(restaurant => 
        filters.neighborhoods.includes(restaurant.neighborhood)
      );
    }
    
    // Apply price range filter
    if (filters.priceRange.length > 0) {
      results = results.filter(restaurant => 
        filters.priceRange.includes(restaurant.priceRange)
      );
    }
    
    // Apply discount filter
    if (filters.onlyDiscounts) {
      results = results.filter(restaurant => 
        restaurant.hasDiscount
      );
    }
    
    // Apply open now filter
    if (filters.onlyOpen) {
      // In a real app, this would check against current time and restaurant hours
      results = results.filter(restaurant => 
        restaurant.isOpenNow
      );
    }
    
    setFilteredRestaurants(results);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setIsFilterModalVisible(false);
  };

  // Get unique values for filter options
  const cuisines = [...new Set(restaurants.map(r => r.cuisine))];
  const neighborhoods = [...new Set(restaurants.map(r => r.neighborhood))];
  const priceRanges = [...new Set(restaurants.map(r => r.priceRange))];

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        No encontramos resultados
      </Text>
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        Intenta con otros términos o ajusta los filtros
      </Text>
    </View>
  );

  const areFiltersActive = () => {
    return (
      filters.cuisines.length > 0 ||
      filters.neighborhoods.length > 0 ||
      filters.priceRange.length > 0 ||
      filters.onlyDiscounts ||
      filters.onlyOpen
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Header */}
      <View style={styles.header}>
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
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            { backgroundColor: areFiltersActive() ? colors.primary : colors.backgroundElevated }
          ]} 
          onPress={() => setIsFilterModalVisible(true)}
        >
          <Filter size={20} color={areFiltersActive() ? '#FFFFFF' : colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Results count */}
      <View style={styles.resultsHeader}>
        <Text style={[styles.resultsCount, { color: colors.text }]}>
          {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'resultado' : 'resultados'}
        </Text>
      </View>

      {/* Restaurant List */}
      <FlatList
        data={filteredRestaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/restaurant/${item.id}`} asChild>
            <TouchableOpacity>
              <RestaurantListItem restaurant={item} />
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
      />

      {/* Filter Modal */}
      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        filters={filters}
        onApply={handleApplyFilters}
        cuisines={cuisines}
        neighborhoods={neighborhoods}
        priceRanges={priceRanges}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
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
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsCount: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
});