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

export default function AdminAnalyticsScreen() {
  const { user } = useUser();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data - replace with actual API calls
  const analytics = {
    revenue: {
      total: 45600,
      change: 12.5,
      trend: 'up',
    },
    orders: {
      total: 156,
      change: 8.2,
      trend: 'up',
    },
    customers: {
      total: 89,
      change: 15.3,
      trend: 'up',
    },
    averageOrder: {
      total: 292,
      change: -2.1,
      trend: 'down',
    },
  };

  const topServices = [
    { name: 'Wash & Fold', orders: 89, revenue: 4450, percentage: 57 },
    { name: 'Dry Cleaning', orders: 45, revenue: 4500, percentage: 29 },
    { name: 'Iron & Press', orders: 22, revenue: 660, percentage: 14 },
  ];

  const recentActivity = [
    { type: 'order', message: 'New order #ORD-001 received', time: '2 hours ago' },
    { type: 'payment', message: 'Payment received for order #ORD-002', time: '4 hours ago' },
    { type: 'delivery', message: 'Order #ORD-003 delivered successfully', time: '6 hours ago' },
    { type: 'customer', message: 'New customer registered', time: '1 day ago' },
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 'trending-up' : 'trending-down';
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? COLORS.success : COLORS.error;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return 'receipt-outline';
      case 'payment':
        return 'card-outline';
      case 'delivery':
        return 'checkmark-circle-outline';
      case 'customer':
        return 'person-add-outline';
      default:
        return 'information-circle-outline';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'order':
        return COLORS.primary;
      case 'payment':
        return COLORS.success;
      case 'delivery':
        return COLORS.success;
      case 'customer':
        return COLORS.warning;
      default:
        return COLORS.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Analytics</Text>
        <TouchableOpacity>
          <Ionicons name="download-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {['day', 'week', 'month', 'year'].map((period) => (
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

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Key Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Ionicons name="cash-outline" size={24} color={COLORS.primary} />
                <Ionicons 
                  name={getTrendIcon(analytics.revenue.trend) as any} 
                  size={16} 
                  color={getTrendColor(analytics.revenue.trend)} 
                />
              </View>
              <Text style={styles.metricValue}>₹{analytics.revenue.total.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>Total Revenue</Text>
              <Text style={[styles.metricChange, { color: getTrendColor(analytics.revenue.trend) }]}>
                {analytics.revenue.change > 0 ? '+' : ''}{analytics.revenue.change}%
              </Text>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Ionicons name="receipt-outline" size={24} color={COLORS.primary} />
                <Ionicons 
                  name={getTrendIcon(analytics.orders.trend) as any} 
                  size={16} 
                  color={getTrendColor(analytics.orders.trend)} 
                />
              </View>
              <Text style={styles.metricValue}>{analytics.orders.total}</Text>
              <Text style={styles.metricLabel}>Total Orders</Text>
              <Text style={[styles.metricChange, { color: getTrendColor(analytics.orders.trend) }]}>
                {analytics.orders.change > 0 ? '+' : ''}{analytics.orders.change}%
              </Text>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Ionicons name="people-outline" size={24} color={COLORS.primary} />
                <Ionicons 
                  name={getTrendIcon(analytics.customers.trend) as any} 
                  size={16} 
                  color={getTrendColor(analytics.customers.trend)} 
                />
              </View>
              <Text style={styles.metricValue}>{analytics.customers.total}</Text>
              <Text style={styles.metricLabel}>New Customers</Text>
              <Text style={[styles.metricChange, { color: getTrendColor(analytics.customers.trend) }]}>
                {analytics.customers.change > 0 ? '+' : ''}{analytics.customers.change}%
              </Text>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Ionicons name="calculator-outline" size={24} color={COLORS.primary} />
                <Ionicons 
                  name={getTrendIcon(analytics.averageOrder.trend) as any} 
                  size={16} 
                  color={getTrendColor(analytics.averageOrder.trend)} 
                />
              </View>
              <Text style={styles.metricValue}>₹{analytics.averageOrder.total}</Text>
              <Text style={styles.metricLabel}>Avg Order Value</Text>
              <Text style={[styles.metricChange, { color: getTrendColor(analytics.averageOrder.trend) }]}>
                {analytics.averageOrder.change > 0 ? '+' : ''}{analytics.averageOrder.change}%
              </Text>
            </View>
          </View>
        </View>

        {/* Top Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Services</Text>
          <View style={styles.servicesContainer}>
            {topServices.map((service, index) => (
              <View key={service.name} style={styles.serviceCard}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceRank}>#{index + 1}</Text>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.servicePercentage}>{service.percentage}%</Text>
                </View>
                <View style={styles.serviceStats}>
                  <Text style={styles.serviceOrders}>{service.orders} orders</Text>
                  <Text style={styles.serviceRevenue}>₹{service.revenue}</Text>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${service.percentage}%` }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityContainer}>
            {recentActivity.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={[
                  styles.activityIcon, 
                  { backgroundColor: getActivityColor(activity.type) + '20' }
                ]}>
                  <Ionicons 
                    name={getActivityIcon(activity.type) as any} 
                    size={16} 
                    color={getActivityColor(activity.type)} 
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityMessage}>{activity.message}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  periodButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  selectedPeriodButton: {
    backgroundColor: COLORS.primary + '20',
  },
  periodText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  selectedPeriodText: {
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  servicesContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  serviceCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceRank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: 12,
  },
  serviceName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  servicePercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  serviceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  serviceOrders: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  serviceRevenue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.surface,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  activityContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
