// app/(delivery)/order/[id].tsx
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';

import { Text, View } from '../../../components/Themed';
import { COLORS } from '../../../constants/Colors';

// Sample data - in a real app, you'd fetch this using the `id`
const orderDetails = {
  'ORD-001': {
    type: 'pickup',
    customerName: 'Rohan Sharma',
    address: '123, Sector 17, Chandigarh',
    phone: '+91 98765 43210',
    items: ['1 Bag - Wash & Fold'],
    notes: 'Please ring the bell twice.',
    coords: {
      latitude: 30.741482,
      longitude: 76.768066,
    },
  },
   'ORD-002': {
    type: 'delivery',
    customerName: 'Priya Singh',
    address: '456, Phase 7, Mohali',
    phone: '+91 91234 56789',
    items: ['1 Suit', '2 Formal Shirts'],
    notes: 'Leave at the front desk if not available.',
     coords: {
      latitude: 30.704649,
      longitude: 76.717873,
    },
  }
};

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const order = orderDetails[id as keyof typeof orderDetails] || orderDetails['ORD-001'];

  const isPickup = order.type === 'pickup';
  const actionText = isPickup ? 'Mark as Picked Up' : 'Mark as Delivered';

  const handleStatusUpdate = () => {
    Alert.alert(
      'Confirm Action',
      `Are you sure you want to mark this order as ${isPickup ? 'Picked Up' : 'Delivered'}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => router.back() }, // Simulate success and go back
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Customer & Address Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{isPickup ? 'Pickup From' : 'Deliver To'}</Text>
          <Text style={styles.customerName}>{order.customerName}</Text>
          <Text style={styles.address}>{order.address}</Text>
          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL(`tel:${order.phone}`)}>
              <Ionicons name="call" size={20} color={COLORS.primary} />
              <Text style={styles.contactButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL(`sms:${order.phone}`)}>
              <Ionicons name="chatbubble-ellipses" size={20} color={COLORS.primary} />
              <Text style={styles.contactButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Map View */}
        <View style={styles.card}>
          <MapView
            style={styles.map}
            initialRegion={{
              ...order.coords,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={order.coords} title={order.customerName} />
          </MapView>
        </View>

        {/* Order Items & Notes */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Items</Text>
          {order.items.map((item, index) => (
            <Text key={index} style={styles.itemText}>• {item}</Text>
          ))}
          {order.notes && (
            <>
              <View style={styles.divider} />
              <Text style={styles.cardTitle}>Notes</Text>
              <Text style={styles.notesText}>{order.notes}</Text>
            </>
          )}
        </View>
      </ScrollView>

      {/* Sticky Footer Action Button */}
      <View style={styles.stickyFooter}>
        <TouchableOpacity style={styles.actionButton} onPress={handleStatusUpdate}>
          <Ionicons name={isPickup ? 'arrow-up' : 'checkmark-done'} size={22} color={COLORS.white} />
          <Text style={styles.actionButtonText}>{actionText}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  customerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  address: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 56, 92, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  contactButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  map: {
    height: 200,
    borderRadius: 12,
  },
  itemText: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  notesText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
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
  actionButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
});