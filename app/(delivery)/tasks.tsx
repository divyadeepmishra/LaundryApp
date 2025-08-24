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

export default function DeliveryTasksScreen() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('today');

  // Mock data - replace with actual API calls
  const tasks = {
    today: [
      {
        id: '1',
        type: 'pickup',
        customerName: 'John Doe',
        address: '123 Main St, Apartment 4B',
        time: '10:00 AM',
        items: 5,
        status: 'in_progress',
        phone: '+91 98765 43210',
      },
      {
        id: '2',
        type: 'delivery',
        customerName: 'Jane Smith',
        address: '456 Oak Ave, Unit 7',
        time: '11:30 AM',
        items: 3,
        status: 'pending',
        phone: '+91 98765 43211',
      },
      {
        id: '3',
        type: 'pickup',
        customerName: 'Mike Johnson',
        address: '789 Pine Rd, House 12',
        time: '2:00 PM',
        items: 8,
        status: 'pending',
        phone: '+91 98765 43212',
      },
    ],
    upcoming: [
      {
        id: '4',
        type: 'delivery',
        customerName: 'Sarah Wilson',
        address: '321 Elm St, Suite 5',
        time: '9:00 AM',
        items: 4,
        status: 'scheduled',
        phone: '+91 98765 43213',
        date: '2024-01-16',
      },
    ],
  };

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
      case 'scheduled':
        return COLORS.textSecondary;
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
      case 'scheduled':
        return 'Scheduled';
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

  const handleStartTask = (taskId: string) => {
    Alert.alert(
      'Start Task',
      'Are you sure you want to start this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start',
          onPress: () => {
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

  const handleCallCustomer = (phone: string, customerName: string) => {
    Alert.alert(
      'Call Customer',
      `Call ${customerName} at ${phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            // Here you would implement actual calling functionality
            Alert.alert('Calling', `Calling ${customerName}...`);
          },
        },
      ]
    );
  };

  const currentTasks = tasks[activeTab as keyof typeof tasks] || [];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>My Tasks</Text>
        <TouchableOpacity>
          <Ionicons name="refresh" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['today', 'upcoming'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {currentTasks.length > 0 ? (
          currentTasks.map((task) => (
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
                    {getStatusText(task.status)}
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
                    {task.date && ` • ${formatDate(task.date)}`}
                  </Text>
                  <Text style={styles.taskDetailText}>
                    <Ionicons name="shirt-outline" size={14} color={COLORS.textSecondary} />
                    {' '}{task.items} items
                  </Text>
                </View>
              </View>
              
              <View style={styles.taskActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleCallCustomer(task.phone, task.customerName)}
                >
                  <Ionicons name="call-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.actionButtonText}>Call</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => router.push(`/task/${task.id}`)}
                >
                  <Ionicons name="navigate-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.actionButtonText}>Navigate</Text>
                </TouchableOpacity>
                
                {task.status === 'pending' && (
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.primaryButton]}
                    onPress={() => handleStartTask(task.id)}
                  >
                    <Ionicons name="play-outline" size={16} color={COLORS.white} />
                    <Text style={styles.primaryButtonText}>Start</Text>
                  </TouchableOpacity>
                )}
                
                {task.status === 'in_progress' && (
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.successButton]}
                    onPress={() => handleCompleteTask(task.id)}
                  >
                    <Ionicons name="checkmark-outline" size={16} color={COLORS.white} />
                    <Text style={styles.successButtonText}>Complete</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="checkmark-circle-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>No {activeTab} tasks</Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'today' 
                ? 'All tasks for today are completed!'
                : 'No upcoming tasks scheduled'
              }
            </Text>
          </View>
        )}
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
  taskCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
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
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  successButton: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  successButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
