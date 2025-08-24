// app/(delivery)/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { COLORS } from '../../constants/Colors';

export default function DeliveryLayout() {
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
        headerShadowVisible: false, // For a cleaner look
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* We will create the order detail screen in the next step */}
      <Stack.Screen name="order/[id]" options={{ title: 'Task Details' }} />
    </Stack>
  );
}