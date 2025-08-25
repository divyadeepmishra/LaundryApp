// app/(admin)/_layout.tsx
import React from 'react';
import { Stack, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@clerk/clerk-expo';

import { COLORS } from '../../constants/Colors';

export default function AdminLayout() {
  const { signOut } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Admin Dashboard',
          headerShown: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => signOut()}>
              <Ionicons name="log-out-outline" size={24} color={COLORS.error} style={{ marginRight: 16 }} />
            </TouchableOpacity>
          )
        }} 
      />
      {/* We will create these screens in the next steps */}
      <Stack.Screen name="orders" options={{ title: 'Manage Orders' }} />
      <Stack.Screen name="users" options={{ title: 'Manage Users' }} />
    </Stack>
  );
}