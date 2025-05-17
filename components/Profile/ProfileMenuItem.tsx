import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { Video as LucideIcon } from 'lucide-react-native';

type ProfileMenuItemProps = {
  title: string;
  icon: LucideIcon;
  badge?: string;
  rightContent?: React.ReactNode;
  onPress: () => void;
};

export default function ProfileMenuItem({ 
  title, 
  icon: Icon, 
  badge, 
  rightContent,
  onPress 
}: ProfileMenuItemProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity 
      style={styles.menuItem}
      onPress={onPress}
    >
      <View style={styles.menuItemLeft}>
        <Icon size={20} color={colors.text} style={styles.menuIcon} />
        <Text style={[styles.menuItemText, { color: colors.text }]}>
          {title}
        </Text>
        
        {badge && (
          <View style={[styles.badge, { backgroundColor: colors.primary }]}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      
      {rightContent ? (
        rightContent
      ) : (
        <ChevronRight size={20} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
});