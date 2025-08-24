// app/(customer)/(tabs)/index.tsx
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Text, View } from '../../components/Themed';
import { COLORS } from '../../constants/Colors';

export default function CustomerHomeScreen() {
  const user = { name: 'Maharaj' }; // Replace with actual user data from Clerk

  // This would come from your API, showing the user's most recent active booking
  const activeBooking = {
    id: 1,
    status: 'in_progress',
    statusText: 'Your clothes are being washed!',
    estimatedCompletion: 'Today, 6:00 PM',
  };

  const services = [
    { id: 'wash-fold', name: 'Wash & Fold', description: 'Fresh, folded, and ready to wear.', icon: 'shirt' },
    { id: 'dry-clean', name: 'Dry Cleaning', description: 'Expert care for delicate items.', icon: 'diamond' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={26} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Active Booking Status Card */}
        {activeBooking && (
          <TouchableOpacity style={styles.statusCard}>
            <View style={styles.statusIconContainer}>
              <Ionicons name="hourglass-outline" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusText}>{activeBooking.statusText}</Text>
              <Text style={styles.statusSubText}>Est. completion: {activeBooking.estimatedCompletion}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={COLORS.textSecondary} />
          </TouchableOpacity>
        )}

        {/* Hero Action Card */}
        <View style={styles.heroCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1620632694205-5b6bab29813c?w=800' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Need fresh clothes?</Text>
            <Text style={styles.heroSubtitle}>Let's get your laundry done.</Text>
            <TouchableOpacity style={styles.heroButton} onPress={() => router.push('/bookings')}>
              <Text style={styles.heroButtonText}>Create New Booking</Text>
              <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Our Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          {services.map((service) => (
            <TouchableOpacity 
              key={service.id} 
              style={styles.serviceCard}
              onPress={() => router.push(`/service/${service.id}`)}
            >
              <View style={styles.serviceIconContainer}>
                <Ionicons name={service.icon as any} size={28} color={COLORS.primary} />
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 56, 92, 0.1)',
    marginRight: 16,
  },
  statusInfo: {
    flex: 1,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  statusSubText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  heroCard: {
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 32,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 24,
    justifyContent: 'flex-end',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginRight: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  serviceDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});