// app/(customer)/(tabs)/bookings.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Text, View } from '../../components/Themed';
import { COLORS } from '../../constants/Colors';

interface Booking {
  id: number;
  serviceName: string;
  serviceType: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  time: string;
  price: number;
  image: string;
  items: string[];
}

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [refreshing, setRefreshing] = useState(false);

  const bookings: Booking[] = [
    {
      id: 1,
      serviceName: 'QuickWash Express',
      serviceType: 'Wash & Fold',
      status: 'upcoming',
      date: 'Aug 25, 2025',
      time: '10:30 AM',
      price: 240,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      items: ['2 Shirts', '1 Jeans', '3 T-shirts'],
    },
    {
      id: 2,
      serviceName: 'Premium Laundry Care',
      serviceType: 'Dry Clean',
      status: 'in_progress',
      date: 'Aug 24, 2025',
      time: '2:00 PM',
      price: 450,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400',
      items: ['1 Suit', '2 Formal Shirts'],
    },
    {
      id: 3,
      serviceName: 'Eco Wash Station',
      serviceType: 'Wash & Fold',
      status: 'completed',
      date: 'Aug 20, 2025',
      time: '11:00 AM',
      price: 180,
      image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a0?w=400',
      items: ['5 T-shirts', '2 Jeans'],
    },
     {
      id: 4,
      serviceName: 'QuickWash Express',
      serviceType: 'Wash & Fold',
      status: 'cancelled',
      date: 'Aug 18, 2025',
      time: '09:00 AM',
      price: 150,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      items: ['3 Shirts', '2 Trousers'],
    },
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const getStatusInfo = (status: Booking['status']) => {
    switch (status) {
      case 'upcoming':
        return { text: 'Upcoming', color: COLORS.warning, icon: 'time-outline' };
      case 'in_progress':
        return { text: 'In Progress', color: COLORS.primary, icon: 'hourglass-outline' };
      case 'completed':
        return { text: 'Completed', color: COLORS.success, icon: 'checkmark-circle-outline' };
      case 'cancelled':
        return { text: 'Cancelled', color: COLORS.error, icon: 'close-circle-outline' };
      default:
        return { text: 'Unknown', color: COLORS.gray, icon: 'help-circle-outline' };
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'upcoming') {
      return booking.status === 'upcoming' || booking.status === 'in_progress';
    }
    return booking.status === 'completed' || booking.status === 'cancelled';
  });

  const BookingCard = ({ booking }: { booking: Booking }) => {
    const statusInfo = getStatusInfo(booking.status);
    return(
      <TouchableOpacity style={styles.bookingCard}>
        <View style={styles.cardHeader}>
          <Image source={{ uri: booking.image }} style={styles.serviceImage} />
          <View style={styles.headerInfo}>
            <Text style={styles.serviceName}>{booking.serviceName}</Text>
            <Text style={styles.serviceType}>{booking.serviceType}</Text>
          </View>
          <Text style={styles.price}>₹{booking.price}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
            <Text style={styles.detailText}>{booking.date} at {booking.time}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name={statusInfo.icon as any} size={16} color={statusInfo.color} />
            <Text style={[styles.detailText, { color: statusInfo.color }]}>{statusInfo.text}</Text>
          </View>
        </View>
        
        {booking.status === 'completed' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Rate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Reorder</Text>
            </TouchableOpacity>
          </View>
        )}
         {booking.status === 'upcoming' && (
          <View style={styles.actionButtons}>
             <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Track Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>History</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={80} color={COLORS.border} />
            <Text style={styles.emptyTitle}>No Bookings Yet</Text>
            <Text style={styles.emptyText}>
              Your {activeTab === 'upcoming' ? 'active' : 'past'} bookings will appear here.
            </Text>
            <TouchableOpacity style={styles.bookNowButton} onPress={() => router.replace('/')}>
              <Text style={styles.bookNowText}>Book a Service</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bookingCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  serviceImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  serviceType: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },

  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 6,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  secondaryButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 24,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  bookNowButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  bookNowText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});