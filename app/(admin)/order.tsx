// app/(admin)/orders.tsx
import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';

import { Text, View } from '../../components/Themed';
import { COLORS } from '../../constants/Colors';

type OrderStatus = 'Pending' | 'In Progress' | 'Out for Delivery' | 'Completed' | 'Cancelled';

interface Order {
  id: string;
  customerName: string;
  date: string;
  amount: number;
  status: OrderStatus;
  assignedTo?: string;
}

// Sample Data
const allOrders: Order[] = [
  { id: 'ORD-001', customerName: 'Rohan Sharma', date: '2025-08-23', amount: 240, status: 'Completed', assignedTo: 'Rajesh Kumar' },
  { id: 'ORD-002', customerName: 'Priya Singh', date: '2025-08-23', amount: 450, status: 'Out for Delivery', assignedTo: 'Suresh' },
  { id: 'ORD-003', customerName: 'Amit Verma', date: '2025-08-22', amount: 180, status: 'In Progress' },
  { id: 'ORD-004', customerName: 'Sunita Patil', date: '2025-08-22', amount: 310, status: 'Pending' },
  { id: 'ORD-005', customerName: 'Vikram Rathore', date: '2025-08-21', amount: 500, status: 'Completed', assignedTo: 'Rajesh Kumar' },
  { id: 'ORD-006', customerName: 'Anjali Desai', date: '2025-08-21', amount: 120, status: 'Cancelled' },
];

const FILTERS: OrderStatus[] = ['Pending', 'In Progress', 'Out for Delivery', 'Completed'];

export default function OrderManagementScreen() {
  const [activeFilter, setActiveFilter] = useState<OrderStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = useMemo(() => {
    return allOrders.filter(order => {
      const matchesFilter = activeFilter === 'All' || order.status === activeFilter;
      const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            order.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pending': return COLORS.warning;
      case 'In Progress': return COLORS.primary;
      case 'Out for Delivery': return COLORS.secondary;
      case 'Completed': return COLORS.success;
      case 'Cancelled': return COLORS.error;
      default: return COLORS.gray;
    }
  };

  const AdminOrderCard = ({ order }: { order: Order }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>#{order.id}</Text>
        <Text style={styles.orderDate}>{order.date}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.cardRow}>
        <Text style={styles.rowLabel}>Customer</Text>
        <Text style={styles.rowValue}>{order.customerName}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.rowLabel}>Delivery Person</Text>
        <Text style={styles.rowValue}>{order.assignedTo || 'Unassigned'}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.rowLabel}>Amount</Text>
        <Text style={styles.rowValue}>₹{order.amount}</Text>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(order.status) }]} />
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Manage Orders' }} />
      <StatusBar barStyle="dark-content" />
      
      {/* Search and Filter */}
      <View style={styles.controlsContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} />
          <TextInput
            placeholder="Search by Order ID or Customer"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.filterTab, activeFilter === 'All' && styles.activeFilterTab]}
            onPress={() => setActiveFilter('All')}
          >
            <Text style={[styles.filterText, activeFilter === 'All' && styles.activeFilterText]}>All</Text>
          </TouchableOpacity>
          {FILTERS.map(filter => (
            <TouchableOpacity 
              key={filter}
              style={[styles.filterTab, activeFilter === filter && styles.activeFilterTab]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Order List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredOrders.map(order => (
          <AdminOrderCard key={order.id} order={order} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  controlsContainer: {
    padding: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    marginLeft: 10,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: COLORS.surface,
  },
  activeFilterTab: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  activeFilterText: {
    color: COLORS.white,
  },
  scrollContent: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  orderDate: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  rowLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  cardFooter: {
    marginTop: 12,
    alignItems: 'flex-start',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
});