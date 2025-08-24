// components/SocialButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/Colors';

type Props = { type: 'google' | 'apple'; onPress?: () => void };

export default function SocialButton({ type, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>
        Sign in with {type.charAt(0).toUpperCase() + type.slice(1)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    flex: 1,
    alignItems: 'center',
  },
  text: { color: COLORS.text, fontWeight: '600' },
});
