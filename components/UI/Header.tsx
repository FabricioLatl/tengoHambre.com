import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { router, usePathname } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

type HeaderProps = {
  title?: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
};

export default function Header({
  title,
  showBackButton = false,
  rightComponent,
}: HeaderProps) {
  const { colors } = useTheme();
  const pathname = usePathname();
  
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={[
      styles.container, 
      { backgroundColor: colors.background }
    ]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        {title && (
          <Text style={[styles.title, { color: colors.text }]}>
            {title}
          </Text>
        )}
      </View>
      
      {rightComponent && (
        <View style={styles.rightContainer}>
          {rightComponent}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});