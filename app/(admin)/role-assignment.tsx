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

export default function AdminRoleAssignmentScreen() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const assignRole = async (role: string) => {
    setLoading(true);
    try {
      // In a real app, you would call your backend API to update the user's role
      // For now, we'll just show an alert and redirect
      Alert.alert(
        'Role Assignment',
        `Role "${role}" assigned successfully! You will be redirected to the ${role} dashboard.`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Redirect based on role
              if (role === 'admin') {
                router.replace('/(admin)');
              } else if (role === 'delivery') {
                router.replace('/(delivery)');
              } else {
                router.replace('/(customer)');
              }
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to assign role. Please try again.');
    } finally {
      setLoading(false);
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
        <Text style={styles.title}>Choose Your Role</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <Ionicons name="person-circle-outline" size={80} color={COLORS.primary} />
          <Text style={styles.message}>Welcome to LaundryApp!</Text>
          <Text style={styles.subtitle}>
            Please choose your role to continue:
          </Text>

          <View style={styles.roleContainer}>
            <TouchableOpacity 
              style={styles.roleCard}
              onPress={() => assignRole('customer')}
              disabled={loading}
            >
              <Ionicons name="person-outline" size={48} color={COLORS.primary} />
              <Text style={styles.roleTitle}>Customer</Text>
              <Text style={styles.roleDescription}>
                Book laundry services, track orders, and manage your profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.roleCard}
              onPress={() => assignRole('admin')}
              disabled={loading}
            >
              <Ionicons name="settings-outline" size={48} color={COLORS.warning} />
              <Text style={styles.roleTitle}>Admin</Text>
              <Text style={styles.roleDescription}>
                Manage orders, customers, services, and view analytics
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.roleCard}
              onPress={() => assignRole('delivery')}
              disabled={loading}
            >
              <Ionicons name="car-outline" size={48} color={COLORS.success} />
              <Text style={styles.roleTitle}>Delivery Partner</Text>
              <Text style={styles.roleDescription}>
                Manage pickup and delivery tasks, track earnings
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <Ionicons name="information-circle-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.infoText}>
              This is a temporary role assignment page for testing. In production, 
              roles will be assigned by administrators.
            </Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  roleContainer: {
    width: '100%',
    gap: 16,
  },
  roleCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginTop: 32,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});
