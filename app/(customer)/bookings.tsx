// app/(customer)/(tabs)/bookings.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

import { Text, View } from '../../components/Themed';
import { COLORS } from '../../constants/Colors';

export default function BookingsScreen() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data - replace with actual API calls
  const bookings = {
    upcoming: [
      {
        id: '1',
        service: 'Wash & Fold',
        items: 5,
        weight: '2.5 kg',
        pickupDate: '2024-01-15',
        pickupTime: '10:00 AM',
        deliveryDate: '2024-01-17',
        deliveryTime: '2:00 PM',
        status: 'confirmed',
        totalAmount: 125,
      },
      {
        id: '2',
        service: 'Dry Cleaning',
        items: 3,
        weight: '1.2 kg',
        pickupDate: '2024-01-18',
        pickupTime: '11:00 AM',
        deliveryDate: '2024-01-20',
        deliveryTime: '3:00 PM',
        status: 'pending',
        totalAmount: 300,
      },
    ],
    completed: [
      {
        id: '3',
        service: 'Wash & Fold',
        items: 8,
        weight: '4.0 kg',
        pickupDate: '2024-01-10',
        pickupTime: '9:00 AM',
        deliveryDate: '2024-01-12',
        deliveryTime: '1:00 PM',
        status: 'completed',
        totalAmount: 200,
        rating: 5,
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return COLORS.success;
      case 'pending':
        return COLORS.warning;
      case 'completed':
        return COLORS.primary;
      default:
        return COLORS.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderBookingCard = (booking: any) => (
    <TouchableOpacity 
      key={booking.id} 
      style={styles.bookingCard}
      onPress={() => router.push(`/service/booking/${booking.id}`)}
    >
      <View style={styles.bookingHeader}>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{booking.service}</Text>
          <Text style={styles.bookingDetails}>
            {booking.items} items • {booking.weight}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
              {getStatusText(booking.status)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bookingTimeline}>
        <View style={styles.timelineItem}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.timelineText}>
            Pickup: {formatDate(booking.pickupDate)} at {booking.pickupTime}
          </Text>
        </View>
        <View style={styles.timelineItem}>
          <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.timelineText}>
            Delivery: {formatDate(booking.deliveryDate)} at {booking.deliveryTime}
          </Text>
        </View>
      </View>

      <View style={styles.bookingFooter}>
        <Text style={styles.amount}>₹{booking.totalAmount}</Text>
        {booking.rating && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={COLORS.warning} />
            <Text style={styles.ratingText}>{booking.rating}/5</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
        <TouchableOpacity 
          style={styles.newBookingButton}
          onPress={() => router.push('/service/wash-fold')}
        >
          <Ionicons name="add" size={20} color={COLORS.white} />
          <Text style={styles.newBookingText}>New Booking</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming ({bookings.upcoming.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed ({bookings.completed.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {bookings[activeTab as keyof typeof bookings].length > 0 ? (
          bookings[activeTab as keyof typeof bookings].map(renderBookingCard)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>No {activeTab} bookings</Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'upcoming' 
                ? 'Create your first booking to get started'
                : 'Your completed bookings will appear here'
              }
            </Text>
            {activeTab === 'upcoming' && (
              <TouchableOpacity 
                style={styles.emptyButton}
                onPress={() => router.push('/service/wash-fold')}
              >
                <Text style={styles.emptyButtonText}>Create Booking</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  newBookingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newBookingText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.primary + '20',
  },
  tabText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  bookingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  bookingDetails: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  statusContainer: {
    marginLeft: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bookingTimeline: {
    marginBottom: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});