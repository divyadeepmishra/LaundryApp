// app/(customer)/service/[id].tsx
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
import { router, useLocalSearchParams } from 'expo-router';

import { Text, View } from '../../../components/Themed';
import { COLORS } from '../../../constants/Colors';

// In a real app, you would fetch this data from your API using the `id`
const serviceData: { [key: string]: any } = {
  'wash-fold': {
    name: 'Wash & Fold',
    image: 'https://images.unsplash.com/photo-1593113646773-ae62c1c2c3b7?w=800',
    description: 'Perfect for your everyday laundry. We wash, dry, and professionally fold your clothes, so they’re ready to be put away.',
    price: 120,
    unit: 'kg',
    features: [
      'Eco-friendly detergents',
      'Color separation',
      'Professional folding',
      'Standard 48-hour turnaround',
    ],
  },
  'dry-clean': {
    name: 'Dry Cleaning',
    image: 'https://images.unsplash.com/photo-1608752421598-a53a2a138c20?w=800',
    description: 'Expert care for your delicate and special garments. Ideal for suits, dresses, and formal wear that require a gentle touch.',
    price: 300,
    unit: 'item',
    features: [
      'Gentle on fabrics',
      'Advanced stain removal',
      'Professional pressing',
      'Protective packaging',
    ],
  },
};

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = serviceData[id] || serviceData['wash-fold']; // Fallback to a default

  const FeatureItem = ({ text }: { text: string }) => (
    <View style={styles.featureItem}>
      <Ionicons name="checkmark-circle-outline" size={22} color={COLORS.success} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: service.image }} style={styles.image} />
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.description}>{service.description}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>What's Included</Text>
          {service.features.map((feature: string) => (
            <FeatureItem key={feature} text={feature} />
          ))}

          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Pricing</Text>
          <View style={styles.priceCard}>
            <Text style={styles.priceText}>Starts at</Text>
            <Text style={styles.priceValue}>₹{service.price} <Text style={styles.priceUnit}>/ {service.unit}</Text></Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.stickyFooter}>
        <TouchableOpacity style={styles.bookButton} onPress={() => router.push('/bookings')}>
          <Text style={styles.bookButtonText}>Proceed to Book</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 44,
    height: 44,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  serviceName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 12,
  },
  priceCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  priceText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  priceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 4,
  },
  priceUnit: {
    fontSize: 16,
    fontWeight: 'normal',
    color: COLORS.textSecondary,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 30,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
});