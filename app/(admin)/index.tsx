import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

import { Text, View } from '../../components/Themed';
import { COLORS } from '../../constants/Colors';

export default function AdminDashboardScreen() {
  const { user } = useUser();
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Mock data - replace with actual API calls
  const stats = {
    totalOrders: 156,
    pendingOrders: 23,
    completedOrders: 133,
    totalRevenue: 45600,
    averageOrderValue: 292,
  };

  const recentOrders = [
    {
      id: '1',
      customerName: 'John Doe',
      service: 'Wash & Fold',
      items: 5,
      amount: 250,
      status: 'pending',
      time: '2 hours ago',
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      service: 'Dry Cleaning',
      items: 3,
      amount: 300,
      status: 'in_progress',
      time: '4 hours ago',
    },
    {
      id: '3',
      customerName: 'Mike Johnson',
      service: 'Wash & Fold',
      items: 8,
      amount: 400,
      status: 'completed',
      time: '1 day ago',
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

  const adminActions = [
    {
      id: 'orders',
      title: 'Manage Orders',
      subtitle: 'View and update order status',
      icon: 'list-outline',
      onPress: () => router.push('/orders'),
    },
    {
      id: 'customers',
      title: 'Customers',
      subtitle: 'View customer information',
      icon: 'people-outline',
      onPress: () => router.push('/customers'),
    },
    {
      id: 'services',
      title: 'Services',
      subtitle: 'Manage service offerings',
      icon: 'settings-outline',
      onPress: () => router.push('/services'),
    },
    {
      id: 'analytics',
      title: 'Analytics',
      subtitle: 'View business insights',
      icon: 'analytics-outline',
      onPress: () => router.push('/analytics'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.adminName}>{user?.firstName || 'Admin'}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={26} color={COLORS.text} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {['today', 'week', 'month'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.selectedPeriodButton
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period && styles.selectedPeriodText
              ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="receipt-outline" size={24} color={COLORS.primary} />
              <Text style={styles.statLabel}>Total Orders</Text>
            </View>
            <Text style={styles.statValue}>{stats.totalOrders}</Text>
            <Text style={styles.statChange}>+12% from last period</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="time-outline" size={24} color={COLORS.warning} />
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <Text style={styles.statValue}>{stats.pendingOrders}</Text>
            <Text style={styles.statChange}>-5% from last period</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="checkmark-circle-outline" size={24} color={COLORS.success} />
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <Text style={styles.statValue}>{stats.completedOrders}</Text>
            <Text style={styles.statChange}>+8% from last period</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="cash-outline" size={24} color={COLORS.primary} />
              <Text style={styles.statLabel}>Revenue</Text>
            </View>
            <Text style={styles.statValue}>₹{stats.totalRevenue.toLocaleString()}</Text>
            <Text style={styles.statChange}>+15% from last period</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {adminActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={action.onPress}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name={action.icon as any} size={28} color={COLORS.primary} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity onPress={() => router.push('/orders')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.ordersContainer}>
            {recentOrders.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                onPress={() => router.push(`/order/${order.id}`)}
              >
                <View style={styles.orderHeader}>
                  <View style={styles.orderInfo}>
                    <Text style={styles.customerName}>{order.customerName}</Text>
                    <Text style={styles.orderService}>{order.service}</Text>
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
                  <Text style={styles.orderDetailsText}>
                    {order.items} items • ₹{order.amount} • {order.time}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  greeting: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  adminName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedPeriodButton: {
    backgroundColor: COLORS.white,
  },
  periodText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  selectedPeriodText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    color: COLORS.success,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  viewAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  ordersContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  orderCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  orderInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  orderService: {
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
    marginTop: 4,
  },
  orderDetailsText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});