import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Star } from 'lucide-react-native';
import { useUser } from '@/hooks/useUser';
import { DarkTheme } from '@/constants/colors';
import { Review } from '@/types';
import { addReview } from '@/controllers/restaurantController';

type ReviewsListProps = {
  reviews: Review[];
  restaurantId: string;
  colors: typeof DarkTheme;
};

export default function ReviewsList({ reviews, restaurantId, colors }: ReviewsListProps) {
  const [reviewsList, setReviewsList] = useState<Review[]>(reviews);
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isLoggedIn } = useUser();

  const handleReviewSubmit = async () => {
    if (!isLoggedIn || !userReview.trim()) return;

    setIsSubmitting(true);
    try {
      const newReview = await addReview(restaurantId, {
        userId: user?.id || '',
        userName: user?.displayName || 'Usuario',
        userPhoto: user?.photoURL,
        rating: userRating,
        comment: userReview.trim(),
        photos: []
      });
      
      setReviewsList([newReview, ...reviewsList]);
      setUserReview('');
    } catch (error) {
      console.error('Error adding review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render empty state if no reviews
  if (reviewsList.length === 0 && !isLoggedIn) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.backgroundElevated }]}>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>
          Aún no hay reseñas
        </Text>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          Inicia sesión para ser el primero en dejar una reseña
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Write a review section */}
      {isLoggedIn && (
        <View style={[styles.writeReviewContainer, { backgroundColor: colors.backgroundElevated }]}>
          <Text style={[styles.writeReviewTitle, { color: colors.text }]}>
            Escribe una reseña
          </Text>
          
          <View style={styles.ratingSelector}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <TouchableOpacity
                key={rating}
                onPress={() => setUserRating(rating)}
                style={styles.starButton}
              >
                <Star
                  size={24}
                  color="#FFD700"
                  fill={rating <= userRating ? '#FFD700' : 'transparent'}
                />
              </TouchableOpacity>
            ))}
          </View>
          
          <TextInput
            style={[
              styles.reviewInput, 
              { 
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: colors.borderColor
              }
            ]}
            placeholder="Comparte tu experiencia..."
            placeholderTextColor={colors.textSecondary}
            multiline
            value={userReview}
            onChangeText={setUserReview}
          />
          
          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: colors.primary },
              (!userReview.trim() || isSubmitting) && { opacity: 0.6 }
            ]}
            onPress={handleReviewSubmit}
            disabled={!userReview.trim() || isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Enviando...' : 'Publicar reseña'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Reviews list */}
      <FlatList
        data={reviewsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.reviewItem, { backgroundColor: colors.backgroundElevated }]}>
            <View style={styles.reviewHeader}>
              <View style={styles.userInfo}>
                {item.userPhoto ? (
                  <Image source={{ uri: item.userPhoto }} style={styles.userPhoto} />
                ) : (
                  <View style={[styles.userInitial, { backgroundColor: colors.primary }]}>
                    <Text style={styles.userInitialText}>
                      {item.userName.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                )}
                <View>
                  <Text style={[styles.userName, { color: colors.text }]}>
                    {item.userName}
                  </Text>
                  <Text style={[styles.reviewDate, { color: colors.textSecondary }]}>
                    {new Date(item.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    color="#FFD700"
                    fill={i < item.rating ? '#FFD700' : 'transparent'}
                  />
                ))}
              </View>
            </View>
            <Text style={[styles.reviewComment, { color: colors.text }]}>
              {item.comment}
            </Text>
            
            {item.photos && item.photos.length > 0 && (
              <View style={styles.photoGrid}>
                {item.photos.map((photo, index) => (
                  <Image key={index} source={{ uri: photo }} style={styles.reviewPhoto} />
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
  writeReviewContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  writeReviewTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 12,
  },
  ratingSelector: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  starButton: {
    marginRight: 8,
  },
  reviewInput: {
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    textAlignVertical: 'top',
    fontFamily: 'Poppins-Regular',
    marginBottom: 12,
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    fontSize: 14,
  },
  reviewItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInitial: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInitialText: {
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    fontSize: 18,
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  reviewDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  reviewPhoto: {
    width: 80,
    height: 80,
    borderRadius: 4,
    margin: 4,
  },
});