import React, { useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { DarkTheme } from '@/constants/colors';
import { MenuItem } from '@/types';

type MenuSectionProps = {
  menu: MenuItem[];
  colors: typeof DarkTheme;
};

export default function MenuSection({ menu, colors }: MenuSectionProps) {
  // Group menu items by category
  const organizedMenu = React.useMemo(() => {
    const categories = [...new Set(menu.map(item => item.category))];
    return categories.map(category => ({
      title: category,
      data: menu.filter(item => item.category === category)
    }));
  }, [menu]);

  return (
    <View style={styles.container}>
      <SectionList
        sections={organizedMenu}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[styles.sectionHeader, { color: colors.text }]}>
            {title}
          </Text>
        )}
        renderItem={({ item }) => (
          <View style={[styles.menuItem, { backgroundColor: colors.backgroundElevated }]}>
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemHeader}>
                <Text style={[styles.menuItemName, { color: colors.text }]}>
                  {item.name}
                </Text>
                {item.isPopular && (
                  <View style={[styles.popularTag, { backgroundColor: colors.primary }]}>
                    <Text style={styles.popularText}>Popular</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.menuItemDescription, { color: colors.textSecondary }]}>
                {item.description}
              </Text>
              <Text style={[styles.menuItemPrice, { color: colors.text }]}>
                S/.{item.price.toFixed(2)}
              </Text>
            </View>
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
  sectionHeader: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  menuItem: {
    borderRadius: 8,
    marginBottom: 12,
  },
  menuItemContent: {
    padding: 12,
  },
  menuItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  menuItemName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  popularTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  popularText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: '#FFFFFF',
  },
  menuItemDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  menuItemPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});