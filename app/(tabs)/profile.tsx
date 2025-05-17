import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Switch,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { 
  User, 
  LogOut, 
  Settings, 
  CreditCard, 
  BookMarked, 
  ChevronRight,
  Moon,
  MessageSquare,
  Heart,
  Star
} from 'lucide-react-native';
import { useUser } from '@/hooks/useUser';
import { useTheme } from '@/context/ThemeContext';
import EmptyState from '@/components/UI/EmptyState';
import ProfileMenuItem from '@/components/Profile/ProfileMenuItem';

export default function ProfileScreen() {
  const { user, isLoggedIn, logout, isPro } = useUser();
  const { colors, isDark, toggleTheme } = useTheme();
  
  if (!isLoggedIn) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <EmptyState
          title="Inicia sesión para ver tu perfil"
          message="Accede a tu cuenta para ver y editar tu perfil"
          buttonText="Iniciar sesión"
          buttonLink="/auth/login"
          icon="user"
        />
      </View>
    );
  }

  const handleLogout = () => {
    logout();
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={[styles.avatarContainer, { backgroundColor: colors.backgroundElevated }]}>
              {user?.photoURL ? (
                <Image source={{ uri: user.photoURL }} style={styles.avatar} />
              ) : (
                <User size={40} color={colors.textSecondary} />
              )}
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.name, { color: colors.text }]}>
                {user?.displayName || "Usuario"}
              </Text>
              <Text style={[styles.email, { color: colors.textSecondary }]}>
                {user?.email}
              </Text>
            </View>
          </View>
          
          {isPro ? (
            <View style={styles.proTag}>
              <Text style={styles.proText}>PRO</Text>
            </View>
          ) : (
            <TouchableOpacity style={[styles.upgradeButton, { backgroundColor: colors.primary }]}>
              <Text style={styles.upgradeText}>Hazte PRO</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Sections */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Cuenta</Text>
          
          <View style={[styles.menuSection, { backgroundColor: colors.backgroundElevated }]}>
            <ProfileMenuItem 
              title="Editar perfil" 
              icon={User} 
              onPress={() => {}} 
            />
            <ProfileMenuItem 
              title="Métodos de pago" 
              icon={CreditCard} 
              onPress={() => {}} 
            />
            {isPro && (
              <ProfileMenuItem 
                title="Suscripción PRO" 
                icon={Star} 
                onPress={() => {}} 
                badge="Activa"
              />
            )}
            <ProfileMenuItem 
              title="Configuración" 
              icon={Settings} 
              onPress={() => {}} 
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Actividad</Text>
          
          <View style={[styles.menuSection, { backgroundColor: colors.backgroundElevated }]}>
            <ProfileMenuItem 
              title="Historial de visitas" 
              icon={BookMarked} 
              onPress={() => {}} 
            />
            <ProfileMenuItem 
              title="Reseñas escritas" 
              icon={MessageSquare} 
              onPress={() => {}} 
            />
            <ProfileMenuItem 
              title="Restaurantes guardados" 
              icon={Heart} 
              onPress={() => {}} 
              rightContent={<Text style={{ color: colors.textSecondary, fontFamily: 'Poppins-Medium' }}>12</Text>}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferencias</Text>
          
          <View style={[styles.menuSection, { backgroundColor: colors.backgroundElevated }]}>
            <View style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Moon size={20} color={colors.text} style={styles.menuIcon} />
                <Text style={[styles.menuItemText, { color: colors.text }]}>Modo oscuro</Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: colors.primaryLight }}
                thumbColor={isDark ? colors.primary : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: colors.error }]}
          onPress={handleLogout}
        >
          <LogOut size={18} color="#FFFFFF" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={[styles.appVersion, { color: colors.textSecondary }]}>
            TengoHambre v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  nameContainer: {
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 2,
  },
  email: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  proTag: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  proText: {
    fontFamily: 'Poppins-Bold',
    color: '#000',
    fontSize: 12,
  },
  upgradeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  upgradeText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    fontSize: 14,
  },
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 12,
  },
  menuSection: {
    borderRadius: 12,
    overflow: 'hidden',
  },
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
  chevron: {
    marginLeft: 'auto',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 80,
  },
  appVersion: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
});