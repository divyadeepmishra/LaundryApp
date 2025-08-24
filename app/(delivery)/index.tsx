// app/(delivery)/index.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Text, View } from '../../components/Themed';
import { COLORS } from '../../constants/Colors';

interface Task {
  id: string;
  type: 'pickup' | 'delivery';
  customerName: string;
  address: string;
  timeSlot: string;
  status: 'pending' | 'completed';
}

// Sample data for delivery tasks
const tasks: Task[] = [
  { id: 'ORD-001', type: 'pickup', customerName: 'Rohan Sharma', address: '123, Sector 17, Chandigarh', timeSlot: '10 AM - 12 PM', status: 'pending' },
  { id: 'ORD-002', type: 'delivery', customerName: 'Priya Singh', address: '456, Phase 7, Mohali', timeSlot: '11 AM - 1 PM', status: 'pending' },
  { id: 'ORD-003', type: 'pickup', customerName: 'Amit Verma', address: '789, MDC, Panchkula', timeSlot: '2 PM - 4 PM', status: 'pending' },
];

export default function DeliveryHomeScreen() {
  const [activeTab, setActiveTab] = useState<'pickups' | 'deliveries'>('pickups');
  
  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'pickups') return task.type === 'pickup';
    return task.type === 'delivery';
  });

  const openMaps = (address: string) => {
    const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  }

  const TaskCard = ({ task }: { task: Task }) => {
    const isPickup = task.type === 'pickup';
    return (
      <TouchableOpacity 
        style={styles.taskCard} 
        onPress={() => router.push(`/order/${task.id}`)} // Navigation for next step
      >
        <View style={styles.cardHeader}>
          <View style={[styles.typeIndicator, { backgroundColor: isPickup ? COLORS.warning : COLORS.success }]} />
          <Ionicons name={isPickup ? 'arrow-up-circle' : 'arrow-down-circle'} size={24} color={isPickup ? COLORS.warning : COLORS.success} />
          <Text style={styles.orderId}>Order #{task.id}</Text>
          <Text style={styles.timeSlot}>{task.timeSlot}</Text>
        </View>

        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{task.customerName}</Text>
          <Text style={styles.address}>{task.address}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="call-outline" size={18} color={COLORS.text} />
            <Text style={styles.secondaryButtonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={() => openMaps(task.address)}>
            <Ionicons name="navigate-outline" size={18} color={COLORS.white} />
            <Text style={styles.primaryButtonText}>Navigate</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today's Tasks</Text>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'pickups' && styles.activeTab]}
          onPress={() => setActiveTab('pickups')}
        >
          <Text style={[styles.tabText, activeTab === 'pickups' && styles.activeTabText]}>Pickups</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'deliveries' && styles.activeTab]}
          onPress={() => setActiveTab('deliveries')}
        >
          <Text style={[styles.tabText, activeTab === 'deliveries' && styles.activeTabText]}>Deliveries</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => <TaskCard key={task.id} task={task} />)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="checkmark-done-circle-outline" size={80} color={COLORS.border} />
            <Text style={styles.emptyTitle}>All tasks completed!</Text>
            <Text style={styles.emptyText}>No pending {activeTab} for today.</Text>
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
    backgroundColor: COLORS.surface,
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
  scrollContent: {
    padding: 20,
  },
  taskCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 12,
    marginBottom: 12,
  },
  typeIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 8,
    flex: 1,
  },
  timeSlot: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  customerInfo: {
    marginBottom: 16,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  address: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 24,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
});