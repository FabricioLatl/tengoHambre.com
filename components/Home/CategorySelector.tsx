import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const categories = [
  {
    id: '1',
    name: 'Cebichería',
    image: 'https://images.pexels.com/photos/6941027/pexels-photo-6941027.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  },
  {
    id: '2',
    name: 'Pollería',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  },
  {
    id: '3',
    name: 'Chifa',
    image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  },
  {
    id: '4',
    name: 'Nikkei',
    image: 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  },
  {
    id: '5',
    name: 'Criolla',
    image: 'https://images.pexels.com/photos/9242256/pexels-photo-9242256.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  },
  {
    id: '6',
    name: 'Anticuchería',
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  }
];

export default function CategorySelector() {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryItem}
        >
          <View style={[styles.imageContainer, { backgroundColor: colors.backgroundElevated }]}>
            <Image source={{ uri: category.image }} style={styles.categoryImage} />
            <View style={styles.overlay} />
          </View>
          <Text style={[styles.categoryName, { color: colors.text }]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  categoryItem: {
    marginHorizontal: 8,
    alignItems: 'center',
    width: 80,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    marginBottom: 8,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  categoryName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    textAlign: 'center',
  },
});