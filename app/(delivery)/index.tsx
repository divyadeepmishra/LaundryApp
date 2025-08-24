// app/(delivery)/index.tsx
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

export default function DeliveryDashboardScreen() {
  const { user } = useUser();
  const [isOnline, setIsOnline] = useState(true);

  // Mock data - replace with actual API calls
  const todayStats = {
    pickups: 8,
    deliveries: 12,
    completed: 15,
    earnings: 1200,
  };

  const currentTasks = [
    {
      id: '1',
      type: 'pickup',
      customerName: 'John Doe',
      address: '123 Main St, Apartment 4B',
      time: '10:00 AM',
      items: 5,
      status: 'in_progress',
    },
    {
      id: '2',
      type: 'delivery',
      customerName: 'Jane Smith',
      address: '456 Oak Ave, Unit 7',
      time: '11:30 AM',
      items: 3,
      status: 'pending',
    },
    {
      id: '3',
      type: 'pickup',
      customerName: 'Mike Johnson',
      address: '789 Pine Rd, House 12',
      time: '2:00 PM',
      items: 8,
      status: 'pending',
    },
  ];

  const getTaskTypeColor = (type: string) => {
    return type === 'pickup' ? COLORS.primary : COLORS.success;
  };

  const getTaskTypeIcon = (type: string) => {
    return type === 'pickup' ? 'arrow-down-circle' : 'arrow-up-circle';
  };

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

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    Alert.alert(
      isOnline ? 'Go Offline' : 'Go Online',
      `You are now ${isOnline ? 'offline' : 'online'}`,
      [{ text: 'OK' }]
    );
  };

  const handleStartTask = (taskId: string) => {
    Alert.alert(
      'Start Task',
      'Are you sure you want to start this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start',
          onPress: () => {
            // Update task status
            Alert.alert('Task Started', 'You can now proceed with the task.');
          },
        },
      ]
    );
  };

  const handleCompleteTask = (taskId: string) => {
    Alert.alert(
      'Complete Task',
      'Are you sure you want to mark this task as completed?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Complete',
          onPress: () => {
            Alert.alert('Task Completed', 'Great job! Task marked as completed.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.deliveryName}>{user?.firstName || 'Delivery Partner'}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.onlineButton, { backgroundColor: isOnline ? COLORS.success : COLORS.error }]}
          onPress={handleToggleOnline}
        >
          <View style={[styles.onlineIndicator, { backgroundColor: isOnline ? COLORS.white : COLORS.white }]} />
          <Text style={styles.onlineText}>{isOnline ? 'Online' : 'Offline'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Today's Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="arrow-down-circle" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>{todayStats.pickups}</Text>
            <Text style={styles.statLabel}>Pickups</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="arrow-up-circle" size={24} color={COLORS.success} />
            <Text style={styles.statValue}>{todayStats.deliveries}</Text>
            <Text style={styles.statLabel}>Deliveries</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
            <Text style={styles.statValue}>{todayStats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="cash" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>₹{todayStats.earnings}</Text>
            <Text style={styles.statLabel}>Earnings</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/map')}>
              <Ionicons name="map-outline" size={28} color={COLORS.primary} />
              <Text style={styles.actionText}>View Map</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/earnings')}>
              <Ionicons name="wallet-outline" size={28} color={COLORS.primary} />
              <Text style={styles.actionText}>Earnings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/schedule')}>
              <Ionicons name="calendar-outline" size={28} color={COLORS.primary} />
              <Text style={styles.actionText}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/support')}>
              <Ionicons name="help-circle-outline" size={28} color={COLORS.primary} />
              <Text style={styles.actionText}>Support</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <TouchableOpacity onPress={() => router.push('/tasks')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.tasksContainer}>
            {currentTasks.map((task) => (
              <View key={task.id} style={styles.taskCard}>
                <View style={styles.taskHeader}>
                  <View style={styles.taskTypeContainer}>
                    <Ionicons 
                      name={getTaskTypeIcon(task.type) as any} 
                      size={20} 
                      color={getTaskTypeColor(task.type)} 
                    />
                    <Text style={[styles.taskType, { color: getTaskTypeColor(task.type) }]}>
                      {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                    </Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(task.status) }]}>
                      {task.status === 'in_progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.taskInfo}>
                  <Text style={styles.customerName}>{task.customerName}</Text>
                  <Text style={styles.address}>{task.address}</Text>
                  <View style={styles.taskDetails}>
                    <Text style={styles.taskDetailText}>
                      <Ionicons name="time-outline" size={14} color={COLORS.textSecondary} />
                      {' '}{task.time}
                    </Text>
                    <Text style={styles.taskDetailText}>
                      <Ionicons name="shirt-outline" size={14} color={COLORS.textSecondary} />
                      {' '}{task.items} items
                    </Text>
                  </View>
                </View>
                
                <View style={styles.taskActions}>
                  {task.status === 'pending' && (
                    <TouchableOpacity 
                      style={styles.startButton}
                      onPress={() => handleStartTask(task.id)}
                    >
                      <Text style={styles.startButtonText}>Start Task</Text>
                    </TouchableOpacity>
                  )}
                  {task.status === 'in_progress' && (
                    <TouchableOpacity 
                      style={styles.completeButton}
                      onPress={() => handleCompleteTask(task.id)}
                    >
                      <Text style={styles.completeButtonText}>Complete</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity 
                    style={styles.detailsButton}
                    onPress={() => router.push(`/task/${task.id}`)}
                  >
                    <Text style={styles.detailsButtonText}>View Details</Text>
                  </TouchableOpacity>
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
  greeting: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  deliveryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  onlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  onlineText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  tasksContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  taskCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskType: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
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
  taskInfo: {
    marginBottom: 12,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  taskDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  taskDetailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  taskActions: {
    flexDirection: 'row',
    gap: 12,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  startButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  completeButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  detailsButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  detailsButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
});