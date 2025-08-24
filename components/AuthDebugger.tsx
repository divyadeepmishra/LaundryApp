import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { Text, View } from './Themed';
import { COLORS } from '../constants/Colors';

export default function AuthDebugger() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🔍 Auth Debugger</Text>
        <Text style={styles.status}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Auth Debugger</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Authentication Status</Text>
        <Text style={styles.status}>
          {isSignedIn ? '✅ Signed In' : '❌ Not Signed In'}
        </Text>
      </View>

      {isSignedIn && user && (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>User Information</Text>
            <Text style={styles.info}>ID: {user.id}</Text>
            <Text style={styles.info}>
              Email: {user.emailAddresses?.[0]?.emailAddress || 'No email'}
            </Text>
            <Text style={styles.info}>
              Name: {user.firstName} {user.lastName}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Role Information</Text>
            <Text style={styles.info}>
              Role: {user.publicMetadata?.role || 'No role set (defaults to customer)'}
            </Text>
            <Text style={styles.info}>
              Public Metadata: {JSON.stringify(user.publicMetadata, null, 2)}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Status</Text>
            <Text style={styles.info}>
              Created: {new Date(user.createdAt).toLocaleString()}
            </Text>
            <Text style={styles.info}>
              Last Sign In: {new Date(user.lastSignInAt || user.createdAt).toLocaleString()}
            </Text>
          </View>
        </>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Debug Info</Text>
        <Text style={styles.info}>
          Clerk Loaded: {isLoaded ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.info}>
          User Loaded: {user ? 'Yes' : 'No'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  info: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
});
