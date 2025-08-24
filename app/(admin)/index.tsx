// app/(admin)/index.tsx
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Text, View } from '../../components/Themed';
import { COLORS } from '../../constants/Colors';

const StatCard = ({ icon, title, value, color }: { icon: any, title: string, value: string, color: string }) => (
  <View style={styles.statCard}>
    <Ionicons name={icon} size={28} color={color} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const ActionButton = ({ icon, title, onPress }: { icon: any, title: string, onPress: () => void }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <Ionicons name={icon} size={32} color={COLORS.primary} />
    <Text style={styles.actionTitle}>{title}</Text>
  </TouchableOpacity>
);

export default function AdminDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Statistics Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Snapshot</Text>
          <View style={styles.statsGrid}>
            <StatCard icon="receipt-outline" title="New Orders" value="12" color={COLORS.primary} />
            <StatCard icon="cash-outline" title="Revenue" value="₹4,520" color={COLORS.success} />
            <StatCard icon="arrow-up-circle-outline" title="Pending Pickups" value="8" color={COLORS.warning} />
            <StatCard icon="hourglass-outline" title="In Progress" value="15" color={COLORS.textSecondary} />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Management</Text>
          <View style={styles.actionsGrid}>
            <ActionButton icon="file-tray-full-outline" title="Manage Orders" onPress={() => {  router.push('/(admin)/order') }} />
            <ActionButton icon="people-outline" title="Customers" onPress={() => {}} />
            <ActionButton icon="walk-outline" title="Delivery Staff" onPress={() => {}} />
            <ActionButton icon="settings-outline" title="Settings" onPress={() => {}} />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.activityText}>Order #ORD-002 delivered to Priya Singh.</Text>
            </View>
            <View style={styles.activityItem}>
              <Ionicons name="arrow-up-circle" size={20} color={COLORS.warning} />
              <Text style={styles.activityText}>Order #ORD-003 picked up from Amit Verma.</Text>
            </View>
             <View style={styles.activityItem}>
              <Ionicons name="add-circle" size={20} color={COLORS.primary} />
              <Text style={styles.activityText}>New order #ORD-004 received.</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: COLORS.background,
    width: '48%',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginVertical: 8,
  },
  statTitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: COLORS.background,
    width: '48%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 12,
  },
  activityCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  activityText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 12,
    flex: 1,
  },
});