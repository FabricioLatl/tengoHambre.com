import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { getFavoriteRestaurants } from '@/controllers/userController';
import RestaurantCard from '@/components/Restaurant/RestaurantCard';
import EmptyState from '@/components/UI/EmptyState';
import Header from '@/components/UI/Header';
import { Restaurant } from '@/types';
import { useUser } from '@/hooks/useUser';
import { useTheme } from '@/context/ThemeContext';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useUser();
  const { colors } = useTheme();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (isLoggedIn) {
        try {
          const data = await getFavoriteRestaurants();
          setFavorites(data);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Favoritos" />
        <EmptyState
          title="Inicia sesión para ver tus favoritos"
          message="Guarda tus restaurantes favoritos para acceder a ellos rápidamente"
          buttonText="Iniciar sesión"
          buttonLink="/auth/login"
          icon="heart"
        />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Favoritos" />
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Cargando tus favoritos...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Favoritos" />
      
      {favorites.length === 0 ? (
        <EmptyState
          title="No tienes favoritos aún"
          message="Guarda restaurantes dando tap en el corazón"
          icon="heart"
        />
      ) : (
        <FlatList
          data={favorites}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Link 
              href={`/restaurant/${item.id}`}
              asChild
              style={styles.cardContainer}
            >
              <TouchableOpacity>
                <RestaurantCard restaurant={item} />
              </TouchableOpacity>
            </Link>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  cardContainer: {
    flex: 1,
    maxWidth: '50%',
    padding: 6,
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