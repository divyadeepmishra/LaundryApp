// app/(customer)/service/[id].tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

import { Text, View } from '../../../components/Themed';
import { COLORS } from '../../../constants/Colors';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useUser();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Mock service data - replace with API call
  const services = {
    'wash-fold': {
      id: 'wash-fold',
      name: 'Wash & Fold',
      description: 'Professional washing and folding service for your everyday clothes.',
      price: 50,
      unit: 'per kg',
      image: 'https://images.unsplash.com/photo-1620632694205-5b6bab29813c?w=800',
      features: [
        'Professional washing with premium detergents',
        'Gentle cycle for fabric care',
        'Neat folding and packaging',
        'Ready within 24-48 hours',
      ],
      instructions: 'Please separate whites and colors. Remove any items from pockets.',
    },
    'dry-clean': {
      id: 'dry-clean',
      name: 'Dry Cleaning',
      description: 'Expert dry cleaning for delicate and formal wear.',
      price: 100,
      unit: 'per item',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800',
      features: [
        'Professional dry cleaning process',
        'Stain removal treatment',
        'Pressing and finishing',
        'Ready within 48-72 hours',
      ],
      instructions: 'Please check care labels. Some items may require special handling.',
    },
    'iron-press': {
      id: 'iron-press',
      name: 'Iron & Press',
      description: 'Professional ironing and pressing for crisp, wrinkle-free clothes.',
      price: 30,
      unit: 'per item',
      image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a0?w=800',
      features: [
        'Professional ironing service',
        'Wrinkle-free finish',
        'Proper folding',
        'Ready within 24 hours',
      ],
      instructions: 'Clothes should be clean and dry. We do not wash clothes.',
    },
  };

  const service = services[id as keyof typeof services];

  if (!service) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Service not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const totalPrice = service.price * quantity;

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Missing Information', 'Please select pickup date and time.');
      return;
    }

    Alert.alert(
      'Confirm Booking',
      `Book ${quantity} ${service.unit} of ${service.name} for ₹${totalPrice}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            // Here you would integrate with your backend API
            Alert.alert('Success', 'Booking confirmed! You will receive a confirmation shortly.');
            router.push('/bookings');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{service.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Service Image */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Ionicons name="shirt" size={64} color={COLORS.primary} />
          </View>
        </View>

        {/* Service Info */}
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.serviceDescription}>{service.description}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{service.price}</Text>
            <Text style={styles.unit}>/{service.unit}</Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          {service.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Booking Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Details</Text>
          
          {/* Quantity */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Quantity ({service.unit})</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Ionicons name="remove" size={20} color={COLORS.text} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Pickup Date */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Pickup Date</Text>
            <TouchableOpacity style={styles.dateButton}>
              <Ionicons name="calendar-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.dateButtonText}>
                {selectedDate || 'Select date'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Pickup Time */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Pickup Time</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.timeSlotsContainer}
            >
              {timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.selectedTimeSlot
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.selectedTimeSlotText
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Special Instructions */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Special Instructions (Optional)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Any special requirements..."
              placeholderTextColor={COLORS.textSecondary}
              value={specialInstructions}
              onChangeText={setSpecialInstructions}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Instructions</Text>
          <Text style={styles.instructionsText}>{service.instructions}</Text>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{totalPrice}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Book Now</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    height: 200,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  serviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 16,
    lineHeight: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  unit: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quantityButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateButtonText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginLeft: 12,
  },
  timeSlotsContainer: {
    paddingHorizontal: 4,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 4,
    backgroundColor: COLORS.white,
  },
  selectedTimeSlot: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeSlotText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  selectedTimeSlotText: {
    color: COLORS.white,
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 16,
    color: COLORS.text,
    textAlignVertical: 'top',
  },
  instructionsText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
});