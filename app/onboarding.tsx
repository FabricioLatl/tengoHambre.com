import { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    title: 'Descubre restaurantes',
    description: 'Encuentra los mejores lugares para comer, desde restaurantes famosos hasta pequeños tesoros escondidos en Lima.',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  },
  {
    title: 'Explora el mapa',
    description: 'Usa nuestro mapa interactivo para encontrar restaurantes cercanos y descubrir nuevos lugares en tu vecindario.',
    image: 'https://images.pexels.com/photos/6205791/pexels-photo-6205791.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  },
  {
    title: 'Guarda tus favoritos',
    description: 'Marca los restaurantes que te gustan para visitarlos después y mantener una lista de tus lugares preferidos.',
    image: 'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  },
  {
    title: 'Hazte PRO',
    description: 'Obtén acceso a descuentos exclusivos de 25-30% en restaurantes asociados con una suscripción PRO.',
    image: 'https://images.pexels.com/photos/5409023/pexels-photo-5409023.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  }
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();

  const handleNext = async () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of onboarding
      try {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      } catch (error) {
        console.error('Error saving onboarding status:', error);
      }
      router.replace('/favorites');
    }
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
    router.replace('/map');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={[styles.skipText, { color: colors.textSecondary }]}>Saltar</Text>
      </TouchableOpacity>

      <Animated.FlatList
        data={onboardingData}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <View style={styles.slide}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.4)' }]} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={styles.flatListContent}
        initialScrollIndex={currentIndex}
      />

      <View style={styles.pagination}>
        {onboardingData.map((_, index) => {
          return (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex ? { backgroundColor: colors.primary, width: 24 } : { backgroundColor: colors.borderColor }
              ]}
            />
          );
        })}
      </View>

      <TouchableOpacity 
        style={[styles.nextButton, { backgroundColor: colors.primary }]} 
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>
          {currentIndex === onboardingData.length - 1 ? 'Comenzar' : 'Siguiente'}
        </Text>
        <ChevronRight size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  flatListContent: {
    alignItems: 'center',
  },
  slide: {
    width,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 450,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 40,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  paginationDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  nextButtonText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 8,
  },
});