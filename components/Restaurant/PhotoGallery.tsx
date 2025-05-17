import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { DarkTheme } from '@/constants/colors';

type PhotoGalleryProps = {
  photos: string[];
  colors: typeof DarkTheme;
};

const { width } = Dimensions.get('window');
const numColumns = 2;
const itemWidth = (width - 40) / numColumns;

export default function PhotoGallery({ photos, colors }: PhotoGalleryProps) {
  if (!photos || photos.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.backgroundElevated }]}>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          No hay fotos disponibles
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item, index) => `photo-${index}`}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.photoContainer}>
            <Image source={{ uri: item }} style={styles.photo} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.photosList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photosList: {
    paddingVertical: 8,
  },
  photoContainer: {
    width: itemWidth,
    height: itemWidth,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  emptyContainer: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});