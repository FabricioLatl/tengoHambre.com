import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView, 
  Switch 
} from 'react-native';
import { X } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

type FilterModalProps = {
  isVisible: boolean;
  onClose: () => void;
  filters: {
    cuisines: string[];
    neighborhoods: string[];
    priceRange: string[];
    onlyDiscounts: boolean;
    onlyOpen: boolean;
  };
  onApply: (filters: FilterModalProps['filters']) => void;
  cuisines: string[];
  neighborhoods: string[];
  priceRanges: string[];
};

export default function FilterModal({
  isVisible,
  onClose,
  filters,
  onApply,
  cuisines,
  neighborhoods,
  priceRanges,
}: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState({...filters});
  const { colors } = useTheme();

  const handleReset = () => {
    setLocalFilters({
      cuisines: [],
      neighborhoods: [],
      priceRange: [],
      onlyDiscounts: false,
      onlyOpen: false,
    });
  };

  const handleApply = () => {
    onApply(localFilters);
  };

  const toggleCuisine = (cuisine: string) => {
    setLocalFilters(prev => {
      if (prev.cuisines.includes(cuisine)) {
        return {
          ...prev,
          cuisines: prev.cuisines.filter(c => c !== cuisine),
        };
      } else {
        return {
          ...prev,
          cuisines: [...prev.cuisines, cuisine],
        };
      }
    });
  };

  const toggleNeighborhood = (neighborhood: string) => {
    setLocalFilters(prev => {
      if (prev.neighborhoods.includes(neighborhood)) {
        return {
          ...prev,
          neighborhoods: prev.neighborhoods.filter(n => n !== neighborhood),
        };
      } else {
        return {
          ...prev,
          neighborhoods: [...prev.neighborhoods, neighborhood],
        };
      }
    });
  };

  const togglePriceRange = (priceRange: string) => {
    setLocalFilters(prev => {
      if (prev.priceRange.includes(priceRange)) {
        return {
          ...prev,
          priceRange: prev.priceRange.filter(p => p !== priceRange),
        };
      } else {
        return {
          ...prev,
          priceRange: [...prev.priceRange, priceRange],
        };
      }
    });
  };

  const toggleDiscounts = () => {
    setLocalFilters(prev => ({
      ...prev,
      onlyDiscounts: !prev.onlyDiscounts,
    }));
  };

  const toggleOpen = () => {
    setLocalFilters(prev => ({
      ...prev,
      onlyOpen: !prev.onlyOpen,
    }));
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.backgroundElevated }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Filtros</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.filtersContainer}>
            {/* Cuisine Filters */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: colors.text }]}>Cocina</Text>
              <View style={styles.optionsContainer}>
                {cuisines.map((cuisine) => (
                  <TouchableOpacity
                    key={cuisine}
                    style={[
                      styles.filterChip,
                      {
                        backgroundColor: localFilters.cuisines.includes(cuisine)
                          ? colors.primary
                          : colors.background,
                        borderColor: localFilters.cuisines.includes(cuisine)
                          ? colors.primary
                          : colors.borderColor,
                      },
                    ]}
                    onPress={() => toggleCuisine(cuisine)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        {
                          color: localFilters.cuisines.includes(cuisine)
                            ? '#FFFFFF'
                            : colors.text,
                        },
                      ]}
                    >
                      {cuisine}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Neighborhood Filters */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: colors.text }]}>Zona</Text>
              <View style={styles.optionsContainer}>
                {neighborhoods.map((neighborhood) => (
                  <TouchableOpacity
                    key={neighborhood}
                    style={[
                      styles.filterChip,
                      {
                        backgroundColor: localFilters.neighborhoods.includes(neighborhood)
                          ? colors.primary
                          : colors.background,
                        borderColor: localFilters.neighborhoods.includes(neighborhood)
                          ? colors.primary
                          : colors.borderColor,
                      },
                    ]}
                    onPress={() => toggleNeighborhood(neighborhood)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        {
                          color: localFilters.neighborhoods.includes(neighborhood)
                            ? '#FFFFFF'
                            : colors.text,
                        },
                      ]}
                    >
                      {neighborhood}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Price Range Filters */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: colors.text }]}>Precio</Text>
              <View style={styles.optionsContainer}>
                {priceRanges.map((priceRange) => (
                  <TouchableOpacity
                    key={priceRange}
                    style={[
                      styles.filterChip,
                      {
                        backgroundColor: localFilters.priceRange.includes(priceRange)
                          ? colors.primary
                          : colors.background,
                        borderColor: localFilters.priceRange.includes(priceRange)
                          ? colors.primary
                          : colors.borderColor,
                      },
                    ]}
                    onPress={() => togglePriceRange(priceRange)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        {
                          color: localFilters.priceRange.includes(priceRange)
                            ? '#FFFFFF'
                            : colors.text,
                        },
                      ]}
                    >
                      {priceRange}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Additional Filters */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: colors.text }]}>Adicionales</Text>
              
              <View style={styles.switchOption}>
                <Text style={[styles.switchLabel, { color: colors.text }]}>
                  Solo con descuentos PRO
                </Text>
                <Switch
                  value={localFilters.onlyDiscounts}
                  onValueChange={toggleDiscounts}
                  trackColor={{ false: '#767577', true: colors.primaryLight }}
                  thumbColor={localFilters.onlyDiscounts ? colors.primary : '#f4f3f4'}
                />
              </View>
              
              <View style={styles.switchOption}>
                <Text style={[styles.switchLabel, { color: colors.text }]}>
                  Solo restaurantes abiertos
                </Text>
                <Switch
                  value={localFilters.onlyOpen}
                  onValueChange={toggleOpen}
                  trackColor={{ false: '#767577', true: colors.primaryLight }}
                  thumbColor={localFilters.onlyOpen ? colors.primary : '#f4f3f4'}
                />
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.resetButton, { borderColor: colors.borderColor }]}
              onPress={handleReset}
            >
              <Text style={[styles.resetButtonText, { color: colors.text }]}>
                Limpiar
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.applyButton, { backgroundColor: colors.primary }]}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>
                Aplicar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  closeButton: {
    padding: 4,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  filterChipText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  switchOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
  },
  resetButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  applyButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});