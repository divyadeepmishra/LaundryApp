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

export default function AdminOrdersScreen() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('all');

  // Mock data - replace with actual API calls
  const orders = [
    {
      id: '1',
      customerName: 'John Doe',
      customerPhone: '+91 98765 43210',
      service: 'Wash & Fold',
      items: 5,
      amount: 250,
      status: 'pending',
      pickupDate: '2024-01-15',
      pickupTime: '10:00 AM',
      deliveryDate: '2024-01-17',
      deliveryTime: '2:00 PM',
      address: '123 Main St, Apartment 4B',
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      customerPhone: '+91 98765 43211',
      service: 'Dry Cleaning',
      items: 3,
      amount: 300,
      status: 'in_progress',
      pickupDate: '2024-01-14',
      pickupTime: '11:00 AM',
      deliveryDate: '2024-01-16',
      deliveryTime: '3:00 PM',
      address: '456 Oak Ave, Unit 7',
    },
    {
      id: '3',
      customerName: 'Mike Johnson',
      customerPhone: '+91 98765 43212',
      service: 'Wash & Fold',
      items: 8,
      amount: 400,
      status: 'completed',
      pickupDate: '2024-01-13',
      pickupTime: '9:00 AM',
      deliveryDate: '2024-01-15',
      deliveryTime: '1:00 PM',
      address: '789 Pine Rd, House 12',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return COLORS.warning;
      case 'in_progress':
        return COLORS.primary;
      case 'completed':
        return COLORS.success;
      default:
        return COLORS.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In Progress';
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

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    Alert.alert(
      'Update Status',
      `Change order status to ${newStatus}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Update',
          onPress: () => {
            // Here you would call your API to update the order status
            Alert.alert('Success', 'Order status updated successfully!');
          },
        },
      ]
    );
  };

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Manage Orders</Text>
        <TouchableOpacity>
          <Ionicons name="filter" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['all', 'pending', 'in_progress', 'completed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('_', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderId}>Order #{order.id}</Text>
                <Text style={styles.customerName}>{order.customerName}</Text>
                <Text style={styles.customerPhone}>{order.customerPhone}</Text>
              </View>
              <View style={styles.orderStatus}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                    {getStatusText(order.status)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.orderDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="shirt-outline" size={16} color={COLORS.textSecondary} />
                <Text style={styles.detailText}>{order.service} • {order.items} items</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="cash-outline" size={16} color={COLORS.textSecondary} />
                <Text style={styles.detailText}>₹{order.amount}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="location-outline" size={16} color={COLORS.textSecondary} />
                <Text style={styles.detailText}>{order.address}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
                <Text style={styles.detailText}>
                  Pickup: {formatDate(order.pickupDate)} at {order.pickupTime}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} />
                <Text style={styles.detailText}>
                  Delivery: {formatDate(order.deliveryDate)} at {order.deliveryTime}
                </Text>
              </View>
            </View>

            <View style={styles.orderActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => router.push(`/order/${order.id}`)}
              >
                <Text style={styles.actionButtonText}>View Details</Text>
              </TouchableOpacity>
              
              {order.status === 'pending' && (
                <TouchableOpacity 
                  style={[styles.actionButton, styles.primaryButton]}
                  onPress={() => handleUpdateStatus(order.id, 'in_progress')}
                >
                  <Text style={styles.primaryButtonText}>Start Processing</Text>
                </TouchableOpacity>
              )}
              
              {order.status === 'in_progress' && (
                <TouchableOpacity 
                  style={[styles.actionButton, styles.primaryButton]}
                  onPress={() => handleUpdateStatus(order.id, 'completed')}
                >
                  <Text style={styles.primaryButtonText}>Mark Complete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
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
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.primary + '20',
  },
  tabText: {
    fontSize: 14,
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
  orderCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  customerPhone: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  orderStatus: {
    marginLeft: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  orderActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});
