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
import { router } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

import { Text, View } from '../../components/Themed';
import { COLORS } from '../../constants/Colors';

export default function AdminServicesScreen() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual API calls
  const services = [
    {
      id: '1',
      name: 'Wash & Fold',
      description: 'Professional washing and folding service for your everyday clothes.',
      price: 50,
      unit: 'per kg',
      isActive: true,
      totalOrders: 156,
      totalRevenue: 7800,
    },
    {
      id: '2',
      name: 'Dry Cleaning',
      description: 'Expert dry cleaning for delicate and formal wear.',
      price: 100,
      unit: 'per item',
      isActive: true,
      totalOrders: 89,
      totalRevenue: 8900,
    },
    {
      id: '3',
      name: 'Iron & Press',
      description: 'Professional ironing and pressing for crisp, wrinkle-free clothes.',
      price: 30,
      unit: 'per item',
      isActive: true,
      totalOrders: 67,
      totalRevenue: 2010,
    },
    {
      id: '4',
      name: 'Starch Service',
      description: 'Add starch to your clothes for extra crispness.',
      price: 20,
      unit: 'per item',
      isActive: false,
      totalOrders: 23,
      totalRevenue: 460,
    },
  ];

  const handleToggleService = (serviceId: string, currentStatus: boolean) => {
    Alert.alert(
      currentStatus ? 'Disable Service' : 'Enable Service',
      `Are you sure you want to ${currentStatus ? 'disable' : 'enable'} this service?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: currentStatus ? 'Disable' : 'Enable',
          style: currentStatus ? 'destructive' : 'default',
          onPress: () => {
            // Here you would call your API to update the service status
            Alert.alert('Success', `Service ${currentStatus ? 'disabled' : 'enabled'} successfully!`);
          },
        },
      ]
    );
  };

  const handleEditService = (serviceId: string) => {
    router.push(`/service/edit/${serviceId}`);
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Services</Text>
        <TouchableOpacity onPress={() => router.push('/service/new')}>
          <Ionicons name="add" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{services.length}</Text>
          <Text style={styles.statLabel}>Total Services</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {services.filter(s => s.isActive).length}
          </Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            ₹{services.reduce((sum, s) => sum + s.totalRevenue, 0).toLocaleString()}
          </Text>
          <Text style={styles.statLabel}>Total Revenue</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredServices.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>₹{service.price}</Text>
                  <Text style={styles.unit}>/{service.unit}</Text>
                </View>
              </View>
              <View style={styles.serviceStatus}>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: service.isActive ? COLORS.success + '20' : COLORS.textSecondary + '20' }
                ]}>
                  <Text style={[
                    styles.statusText, 
                    { color: service.isActive ? COLORS.success : COLORS.textSecondary }
                  ]}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.serviceStats}>
              <View style={styles.statItem}>
                <Ionicons name="receipt-outline" size={16} color={COLORS.textSecondary} />
                <Text style={styles.statItemText}>{service.totalOrders} orders</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="cash-outline" size={16} color={COLORS.textSecondary} />
                <Text style={styles.statItemText}>₹{service.totalRevenue}</Text>
              </View>
            </View>

            <View style={styles.serviceActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleEditService(service.id)}
              >
                <Ionicons name="create-outline" size={16} color={COLORS.primary} />
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleToggleService(service.id, service.isActive)}
              >
                <Ionicons 
                  name={service.isActive ? "pause-outline" : "play-outline"} 
                  size={16} 
                  color={service.isActive ? COLORS.warning : COLORS.success} 
                />
                <Text style={[
                  styles.actionButtonText, 
                  { color: service.isActive ? COLORS.warning : COLORS.success }
                ]}>
                  {service.isActive ? 'Disable' : 'Enable'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="analytics-outline" size={16} color={COLORS.primary} />
                <Text style={styles.actionButtonText}>Analytics</Text>
              </TouchableOpacity>
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  serviceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  serviceHeader: {
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
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  unit: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  serviceStatus: {
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
  serviceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItemText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  serviceActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
  },
  actionButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
});
