// app/(customer)/(tabs)/profile.tsx
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text, View } from '../../components/Themed';
import { COLORS } from '../../constants/Colors';

interface ProfileOption {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  type: 'navigation' | 'switch';
  value?: boolean;
}

export default function ProfileScreen() {
  const user = {
    name: 'Maharaj',
    email: 'maharaj@laundry.dev',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  };

  const accountOptions: ProfileOption[] = [
    { id: 'addresses', title: 'My Addresses', icon: 'location-outline', type: 'navigation' },
    { id: 'payment', title: 'Payment Methods', icon: 'card-outline', type: 'navigation' },
  ];

  const appOptions: ProfileOption[] = [
    { id: 'notifications', title: 'Notifications', icon: 'notifications-outline', type: 'switch', value: true },
    { id: 'dark_mode', title: 'Dark Mode', icon: 'moon-outline', type: 'switch', value: false },
  ];
  
  const supportOptions: ProfileOption[] = [
    { id: 'help', title: 'Help & Support', icon: 'help-circle-outline', type: 'navigation' },
    { id: 'terms', title: 'Terms of Service', icon: 'document-text-outline', type: 'navigation' },
  ];

  const ProfileOptionRow = ({ option, isLast }: { option: ProfileOption, isLast?: boolean }) => (
    <TouchableOpacity style={[styles.optionRow, isLast && { borderBottomWidth: 0 }]}>
      <Ionicons name={option.icon} size={24} color={COLORS.textSecondary} />
      <Text style={styles.optionTitle}>{option.title}</Text>
      {option.type === 'switch' ? (
        <Switch
          value={option.value}
          trackColor={{ false: COLORS.border, true: COLORS.primary }}
          thumbColor={COLORS.white}
        />
      ) : (
        <Ionicons name="chevron-forward" size={22} color={COLORS.textSecondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* User Info Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.optionsContainer}>
            {accountOptions.map((option, index) => (
              <ProfileOptionRow 
                key={option.id} 
                option={option}
                isLast={index === accountOptions.length - 1}
              />
            ))}
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
           <View style={styles.optionsContainer}>
            {appOptions.map((option, index) => (
              <ProfileOptionRow 
                key={option.id} 
                option={option}
                isLast={index === appOptions.length - 1}
              />
            ))}
          </View>
        </View>
        
        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
           <View style={styles.optionsContainer}>
            {supportOptions.map((option, index) => (
              <ProfileOptionRow 
                key={option.id} 
                option={option}
                isLast={index === supportOptions.length - 1}
              />
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        
        <Text style={styles.appVersion}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface, // Use light gray for the background
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scrollContent: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  userEmail: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: 'rgba(255, 56, 92, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  optionsContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionTitle: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 16,
  },
  logoutButton: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    color: COLORS.error,
    fontWeight: '600',
  },
  appVersion: {
    textAlign: 'center',
    marginTop: 24,
    color: COLORS.textLight,
    fontSize: 12,
  },
});