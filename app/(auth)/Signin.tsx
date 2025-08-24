// app/(auth)/Signin.tsx
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import Svg, { Path } from 'react-native-svg'; // Import for SVG icons
import { Text, View } from '../../components/Themed';
import { COLORS } from '../../constants/Colors';
import { useOAuthFlow } from '../../components/useOAuth';

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // OAuth hooks
  const { onSelectAuth: onGooglePress } = useOAuthFlow('oauth_google');
  const { onSelectAuth: onApplePress } = useOAuthFlow('oauth_apple');

  const onSignInPress = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const signInAttempt = await signIn.create({ identifier: emailAddress, password });
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        // Router will handle redirection based on user role
      } else {
        Alert.alert('Sign In Failed', 'Please check your credentials.');
      }
    } catch (err: any) {
      Alert.alert('Error', err.errors?.[0]?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ SVG Icons
  const GoogleIcon = () => (
    <Svg height={24} width={24} viewBox="0 0 48 48">
      <Path fill="#EA4335" d="M24 9.5c3.15 0 5.95 1.08 8.18 2.88l6.1-6.1C34.64 2.9 29.68 1 24 1 14.64 1 6.7 6.76 3.34 15.02l7.42 5.77C12.38 14.5 17.74 9.5 24 9.5z" />
      <Path fill="#4285F4" d="M46.5 24c0-1.64-.15-3.21-.44-4.74H24v9h12.7c-.56 2.91-2.25 5.37-4.78 7.05l7.42 5.77C43.84 37.02 46.5 30.97 46.5 24z" />
      <Path fill="#FBBC05" d="M10.76 28.25c-.5-1.46-.76-3.01-.76-4.65s.26-3.19.76-4.65l-7.42-5.77C1.15 16.19 0 19.95 0 23.6c0 3.65 1.15 7.41 3.34 10.42l7.42-5.77z" />
      <Path fill="#34A853" d="M24 47c6.48 0 11.92-2.14 15.9-5.83l-7.42-5.77c-2.06 1.38-4.7 2.2-8.48 2.2-6.26 0-11.62-5-13.24-11.29l-7.42 5.77C6.7 41.24 14.64 47 24 47z" />
    </Svg>
  );

  const AppleIcon = () => (
    <Svg height={24} width={24} viewBox="0 0 24 24" fill={COLORS.text}>
      <Path d="M16.5 1.5c-1.2.08-2.6.84-3.42 1.83-.74.9-1.34 2.22-1.1 3.52 1.3.1 2.62-.67 3.44-1.68.76-.94 1.32-2.28 1.08-3.67zM21 17.56c-.42.98-.62 1.42-1.16 2.28-.9 1.36-2.18 3.06-3.76 3.07-1.4.01-1.76-.91-3.66-.9-1.9.01-2.29.91-3.7.9-1.58-.01-2.79-1.55-3.7-2.91-2.53-3.79-2.79-8.24-1.23-10.6 1.1-1.68 2.86-2.68 4.5-2.68 1.68 0 2.74.91 4.13.91 1.35 0 2.17-.91 4.13-.91 1.4 0 2.9.77 4 2.09-3.5 1.94-2.93 7.01.45 8.75z" />
    </Svg>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
        <View style={styles.header}>
          <Ionicons name="water-outline" size={80} color={COLORS.primary} />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.formContainer}>
          {/* Social Logins */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={onGooglePress}>
              <View style={styles.socialButtonContent}>
                <GoogleIcon />
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={onApplePress}>
              <View style={styles.socialButtonContent}>
                <AppleIcon />
                <Text style={styles.socialButtonText}>Continue with Apple</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.dividerText}>OR</Text>

          {/* Email Form */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={22} color={COLORS.textSecondary} style={styles.icon} />
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email Address"
              placeholderTextColor={COLORS.textSecondary}
              onChangeText={setEmailAddress}
              style={styles.input}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={22} color={COLORS.textSecondary} style={styles.icon} />
            <TextInput
              value={password}
              placeholder="Password"
              placeholderTextColor={COLORS.textSecondary}
              secureTextEntry
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={onSignInPress} disabled={loading}>
            {loading ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.buttonText}>Sign In</Text>}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Link href="/(auth)/Signup" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  keyboardAvoidingView: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.text, marginTop: 20 },
  subtitle: { fontSize: 16, color: COLORS.textSecondary, marginTop: 8 },
  formContainer: { width: '100%' },
  socialContainer: { flexDirection: 'column', gap: 16, marginBottom: 20 }, // vertical stack
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  socialButtonContent: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  socialButtonText: { fontSize: 16, color: COLORS.text, fontWeight: '500', marginLeft: 4 },
  dividerText: { textAlign: 'center', color: COLORS.textLight, marginBottom: 20 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, height: 56, fontSize: 16, color: COLORS.text },
  button: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  buttonText: { color: COLORS.white, fontSize: 18, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  footerText: { fontSize: 14, color: COLORS.textSecondary },
  linkText: { fontSize: 14, color: COLORS.primary, fontWeight: '600' },
});
